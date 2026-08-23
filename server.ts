import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const TBANK_TERMINAL_KEY = process.env.TBANK_TERMINAL_KEY || 'dummy_terminal';
  const TBANK_PASSWORD = process.env.TBANK_PASSWORD || 'dummy_password';
  const SITE_URL = process.env.SITE_URL || 'https://live-woman-energy.ru';
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map(id => id.trim()).filter(Boolean);
  const GUIDE_PRICE = 39000;
  const GUIDE_OWNER_EMAIL = process.env.GUIDE_OWNER_EMAIL || 'anna@tenceldream.ru';
  const GUIDE_FILE = path.join(process.cwd(), 'private', 'imperatorskiy-peterburg-guide.pdf');
  const GUIDE_ORDERS_FILE = path.join(process.cwd(), 'data', 'guide-orders.json');

  type GuideOrder = {
    orderId: string;
    accessToken: string;
    name: string;
    email: string;
    amount: number;
    status: string;
    paymentId?: string;
    createdAt: string;
    paidAt?: string;
  };

  let guideOrderWrite = Promise.resolve();
  const readGuideOrders = async (): Promise<Record<string, GuideOrder>> => {
    try {
      return JSON.parse(await fs.readFile(GUIDE_ORDERS_FILE, 'utf8'));
    } catch (error: any) {
      if (error?.code === 'ENOENT') return {};
      throw error;
    }
  };
  const updateGuideOrders = async (change: (orders: Record<string, GuideOrder>) => void) => {
    guideOrderWrite = guideOrderWrite.then(async () => {
      const orders = await readGuideOrders();
      change(orders);
      await fs.mkdir(path.dirname(GUIDE_ORDERS_FILE), { recursive: true });
      const temporary = `${GUIDE_ORDERS_FILE}.tmp`;
      await fs.writeFile(temporary, JSON.stringify(orders, null, 2), 'utf8');
      await fs.rename(temporary, GUIDE_ORDERS_FILE);
    });
    return guideOrderWrite;
  };

  const mailTransport = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: (process.env.SMTP_SECURE || 'true') === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    : null;

  const emailOwner = async (subject: string, text: string) => {
    if (!mailTransport) {
      console.warn('SMTP credentials missing. Owner email was not sent.');
      return;
    }
    await mailTransport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: GUIDE_OWNER_EMAIL,
      subject,
      text,
    }).catch(error => console.error('Owner email send error:', error));
  };

  // Отдельные чаты для конкретных мероприятий (если нужно вынести в отдельный чат)
  const EVENT_CHAT_MAP: Record<string, string[]> = {
    '6': (process.env.TELEGRAM_CHAT_ID_ETIQUETTE || '').split(',').map(id => id.trim()).filter(Boolean), // Мастер-класс по сервировке
    '7': (process.env.TELEGRAM_CHAT_ID_YACHT || '').split(',').map(id => id.trim()).filter(Boolean),     // Яхтинг
  };

  // Яркие заголовки для уведомлений по мероприятиям
  const EVENT_HEADERS: Record<string, string> = {
    '1': '🧘‍♀️ ПИЛАТЕС в особняке',
    '2': '🧠 ПСИХОЛОГИЧЕСКАЯ практика',
    '3': '🛀 СПА-РИТУАЛ Palace Bridge',
    '4': '⛳ ГОЛЬФ',
    '6': '🍽️ МАСТЕР-КЛАСС сервировка 16 июня',
    '7': '⛵ ЯХТИНГ 30 июня | LUXURY',
    '8': '🌊 Sun & Chill Бассейн',
    '10': '👏 ИППОДРОМ Выездка',
    '11': '🌸 ЖЕНСКОЕ ЗДОРОВЬЕ',
    '12': '🎯 СТРЕЛЬБА Адреналин',
    '13': '🚗 АВТОДРОМ',
    '14': '💃 СТРИП-ПЛАСТИКА',
    '15': '🧘‍♀️ ПИЛАТЕС август',
  };

  const getEventHeader = (eventId?: string, eventTitle?: string, isPaid = true): string => {
    if (eventId && EVENT_HEADERS[eventId]) {
      return isPaid
        ? `💳 НОВАЯ ЗАЯВКА | ${EVENT_HEADERS[eventId]}`
        : `📝 ПРЕДЗАПИСЬ | ${EVENT_HEADERS[eventId]}`;
    }
    return isPaid ? '💳 НОВАЯ ЗАЯВКА НА БИЛЕТ' : '📝 ПРЕДЗАПИСЬ';
  };

  const sendTelegramToChats = async (chatIds: string[], message: string) => {
    if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) return;
    await Promise.all(
      chatIds.map(chatId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
        }).catch(err => console.error('Telegram send error:', err))
      )
    );
  };

  const sendTelegramMessage = async (message: string, eventId?: string) => {
    if (!TELEGRAM_BOT_TOKEN) {
      console.warn('⚠️ Telegram credentials missing. Skipping notification.');
      return;
    }
    // Общий чат (все мероприятия)
    await sendTelegramToChats(TELEGRAM_CHAT_IDS, message);
    // Отдельный чат мероприятия (если задан)
    if (eventId && EVENT_CHAT_MAP[eventId]?.length > 0) {
      await sendTelegramToChats(EVENT_CHAT_MAP[eventId], message);
    }
  };

  function generateToken(params: Record<string, any>): string {
    const flatParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value !== 'object' && value !== null && value !== undefined) {
        flatParams[key] = String(value);
      }
    }
    flatParams['Password'] = TBANK_PASSWORD;
    const concatenated = Object.keys(flatParams)
      .sort()
      .map(key => flatParams[key])
      .join('');
    return crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');
  }

  // ─── API Routes ──────────────────────────────────────────────────

  app.get('/api/test-telegram', async (req, res) => {
    try {
      const message = `🔔 <b>Тестовое сообщение</b>\n\nЭто проверка уведомлений от Живой Женщины.`;
      await sendTelegramMessage(message);
      return res.json({ success: true, message: 'Test message sent' });
    } catch (error) {
      return res.status(500).json({ error: String(error) });
    }
  });

  app.post('/api/payment/init', async (req, res) => {
    try {
      const { orderId, amount, description, customerName, customerPhone, customerTelegram, eventTitle, eventId } = req.body;

      if (!orderId || !amount || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (amount <= 0 || !eventTitle || eventTitle.includes('Уточняется')) {
        // Это ПРЕДЗАПИСЬ (без оплаты)
        const header = getEventHeader(eventId, eventTitle, false);

        const preorderMessage = [
          `<b>${header}</b>`,
          `━━━━━━━━━━━━━━━━━━`,
          `🎫 <b>Событие:</b> ${eventTitle || description}`,
          `👤 <b>Имя:</b> ${customerName || 'Не указано'}`,
          `📞 <b>Телефон:</b> <code>${customerPhone || 'Не указано'}</code>`,
          `✈️ <b>Telegram:</b> ${customerTelegram ? '@' + customerTelegram.replace('@', '') : 'Не указан'}`,
          `🆔 <b>Заказ:</b> #${orderId}`,
          `━━━━━━━━━━━━━━━━━━`,
          `✨ Заявка в чат предзаписи.`
        ].join('\n');

        await sendTelegramMessage(preorderMessage, eventId);
        return res.json({ success: true, isPreorder: true });
      }

      // 1. Отправляем ПЕРВОЕ сообщение в Telegram (Данные пользователя)
      const initMessage = [
        `<b>${getEventHeader(eventId, eventTitle, true)}</b>`,
        `━━━━━━━━━━━━━━━━━━`,
        `🎫 <b>Событие:</b> ${eventTitle || description}`,
        `👤 <b>Имя:</b> ${customerName || 'Не указано'}`,
        `📞 <b>Телефон:</b> <code>${customerPhone || 'Не указано'}</code>`,
        `✈️ <b>Telegram:</b> ${customerTelegram ? '@' + customerTelegram.replace('@', '') : 'Не указан'}`,
        `💰 <b>Сумма:</b> ${(amount / 100).toLocaleString('ru-RU')} ₽`,
        `🆔 <b>Заказ:</b> #${orderId}`,
        `━━━━━━━━━━━━━━━━━━`,
        `🕒 Ожидаем оплату...`
      ].join('\n');

      await sendTelegramMessage(initMessage, eventId);

      const initParams: Record<string, any> = {
        TerminalKey: TBANK_TERMINAL_KEY,
        Amount: amount,
        OrderId: orderId,
        Description: description.substring(0, 140),
        PayType: 'O',
        Language: 'ru',
        SuccessURL: `${SITE_URL}/success?orderId=${orderId}`,
        FailURL: `${SITE_URL}/fail?orderId=${orderId}`,
        NotificationURL: `${SITE_URL}/api/payment/notify`,
        DATA: {
          Phone: customerPhone,
          CustomerName: customerName,
          CustomerTelegram: customerTelegram,
        },
      };

      initParams.Token = generateToken(initParams);

      const response = await fetch('https://securepay.tinkoff.ru/v2/Init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initParams),
      });

      const data = await response.json();

      if (data.Success) {
        return res.json({
          success: true,
          paymentUrl: data.PaymentURL,
          paymentId: data.PaymentId,
        });
      } else {
        return res.status(400).json({ error: data.Message || 'Init failed' });
      }
    } catch (error) {
      console.error('❌ Server error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/guide/payment/init', async (req, res) => {
    try {
      const name = String(req.body.name || '').trim().slice(0, 100);
      const email = String(req.body.email || '').trim().toLowerCase().slice(0, 200);
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Укажите имя и корректный email' });
      }

      const orderId = `GUIDE-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const accessToken = crypto.randomBytes(24).toString('hex');
      await updateGuideOrders(orders => {
        orders[orderId] = { orderId, accessToken, name, email, amount: GUIDE_PRICE, status: 'NEW', createdAt: new Date().toISOString() };
      });

      const successUrl = `${SITE_URL}/imperatorskiy-peterburg/download?orderId=${encodeURIComponent(orderId)}&access=${accessToken}`;
      const initParams: Record<string, any> = {
        TerminalKey: TBANK_TERMINAL_KEY,
        Amount: GUIDE_PRICE,
        OrderId: orderId,
        Description: 'PDF-гайд «Императорский Петербург»',
        PayType: 'O',
        Language: 'ru',
        SuccessURL: successUrl,
        FailURL: `${SITE_URL}/imperatorskiy-peterburg?payment=failed`,
        NotificationURL: `${SITE_URL}/api/payment/notify`,
        DATA: { CustomerName: name, Email: email },
      };
      initParams.Token = generateToken(initParams);

      const response = await fetch('https://securepay.tinkoff.ru/v2/Init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initParams),
      });
      const data = await response.json();
      if (!data.Success) {
        await updateGuideOrders(orders => { if (orders[orderId]) orders[orderId].status = 'INIT_FAILED'; });
        return res.status(400).json({ error: data.Message || 'Не удалось создать платёж' });
      }

      await updateGuideOrders(orders => {
        if (orders[orderId]) {
          orders[orderId].status = 'PENDING';
          orders[orderId].paymentId = String(data.PaymentId || '');
        }
      });
      await emailOwner('Новый заказ гайда «Императорский Петербург»', `Имя: ${name}\nEmail: ${email}\nЗаказ: ${orderId}\nСумма: 390 ₽\nСтатус: ожидает оплаты`);
      return res.json({ success: true, paymentUrl: data.PaymentURL });
    } catch (error) {
      console.error('Guide payment init error:', error);
      return res.status(500).json({ error: 'Не удалось создать платёж. Попробуйте ещё раз.' });
    }
  });

  app.get('/api/guide/order/:orderId', async (req, res) => {
    const orders = await readGuideOrders();
    const order = orders[req.params.orderId];
    if (!order || !req.query.access || !crypto.timingSafeEqual(Buffer.from(order.accessToken), Buffer.from(String(req.query.access).padEnd(order.accessToken.length).slice(0, order.accessToken.length)))) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({ paid: order.status === 'CONFIRMED' });
  });

  app.get('/api/guide/download/:orderId', async (req, res) => {
    const orders = await readGuideOrders();
    const order = orders[req.params.orderId];
    const access = String(req.query.access || '');
    if (!order || access.length !== order.accessToken.length || !crypto.timingSafeEqual(Buffer.from(order.accessToken), Buffer.from(access)) || order.status !== 'CONFIRMED') {
      return res.status(403).send('Ссылка недействительна или оплата ещё не подтверждена');
    }
    try {
      await fs.access(GUIDE_FILE);
      return res.download(GUIDE_FILE, 'Imperatorskiy-Peterburg-guide.pdf');
    } catch {
      return res.status(503).send('Файл временно недоступен. Напишите нам в поддержку.');
    }
  });

  app.post('/api/payment/notify', async (req, res) => {
    try {
      const notification = req.body;
      const { Token: receivedToken, ...paramsWithoutToken } = notification;
      const expectedToken = generateToken(paramsWithoutToken);

      if (receivedToken !== expectedToken) {
        return res.send('INVALID TOKEN');
      }

      const orderId = notification.OrderId;
      const amountRub = (notification.Amount / 100).toLocaleString('ru-RU');
      const status = notification.Status;

      if (String(orderId || '').startsWith('GUIDE-')) {
        const orders = await readGuideOrders();
        const guideOrder = orders[orderId];
        if (guideOrder) {
          await updateGuideOrders(current => {
            if (!current[orderId]) return;
            current[orderId].status = status;
            current[orderId].paymentId = String(notification.PaymentId || current[orderId].paymentId || '');
            if (status === 'CONFIRMED') current[orderId].paidAt = new Date().toISOString();
          });
          if (status === 'CONFIRMED' && guideOrder.status !== 'CONFIRMED') {
            await emailOwner('Гайд оплачен — 390 ₽', `Имя: ${guideOrder.name}\nEmail: ${guideOrder.email}\nЗаказ: ${orderId}\nПлатёж: ${notification.PaymentId}\nСтатус: оплачен, скачивание открыто`);
          }
        }
      }

      let message = '';

      if (status === 'CONFIRMED' || status === 'AUTHORIZED') {
        message = [
          `✅ <b>Оплата УСПЕШНА</b>`,
          `━━━━━━━━━━━━━━━━━━`,
          `📌 <b>Заказ:</b> #${orderId}`,
          `💰 <b>Сумма:</b> ${amountRub} ₽`,
          `📋 <b>ID платежа:</b> ${notification.PaymentId}`,
          `✨ Пользователь получил подтверждение.`
        ].join('\n');
      } else if (status === 'REJECTED' || status === 'CANCELED' || status === 'DEADLINE_EXPIRED') {
        message = [
          `❌ <b>Оплата НЕ ПРОШЛА</b>`,
          `━━━━━━━━━━━━━━━━━━`,
          `📌 <b>Заказ:</b> #${orderId}`,
          `💰 <b>Сумма:</b> ${amountRub} ₽`,
          `⚠️ <b>Статус:</b> ${status}`,
          `🔴 Платеж отклонен или истекло время.`
        ].join('\n');
      }

      if (message) {
        await sendTelegramMessage(message, notification.OrderId?.split('-')[1]);
        // Примечание: eventId в notify берём из OrderId формата LW-{timestamp}-{random}
      }

      return res.send('OK');
    } catch (error) {
      console.error('❌ Webhook error:', error);
      return res.send('OK');
    }
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // ─── Vite integration ───────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
