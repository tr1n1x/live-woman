import express from 'express';import crypto from 'crypto';import dotenv from 'dotenv';import path from 'path';import { fileURLToPath } from 'url';import { createServer as createViteServer } from 'vite';dotenv.config();const __filename = fileURLToPath(import.meta.url);const __dirname = path.dirname(__filename);async function startServer() {  const app = express();  app.use(express.json());  app.use(express.urlencoded({ extended: true }));  const PORT = 3000;  const TBANK_TERMINAL_KEY = process.env.TBANK_TERMINAL_KEY || 'dummy_terminal';  const TBANK_PASSWORD = process.env.TBANK_PASSWORD || 'dummy_password';  const SITE_URL = process.env.SITE_URL || 'https://live-woman-energy.ru';  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;  const TELEGRAM_CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map(id => id.trim()).filter(Boolean);  // Отдельные чаты для конкретных мероприятий (если нужно вынести в отдельный чат)  const EVENT_CHAT_MAP: Record<string, string[]> = {    '6': (process.env.TELEGRAM_CHAT_ID_ETIQUETTE || '').split(',').map(id => id.trim()).filter(Boolean), // Мастер-класс по сервировке    '7': (process.env.TELEGRAM_CHAT_ID_YACHT || '').split(',').map(id => id.trim()).filter(Boolean),     // Яхтинг  };  // Яркие заголовки для уведомлений по мероприятиям  const EVENT_HEADERS: Record<string, string> = {    '1': '🧘‍♀️ ПИЛАТЕС в особняке',    '2': '🧠 ПСИХОЛОГИЧЕСКАЯ практика',    '3': '🛀 СПА-РИТУАЛ Palace Bridge',    '4': '⛳ ГОЛЬФ',    '6': '🍽️ МАСТЕР-КЛАСС сервировка 16 июня',    '7': '⛵ ЯХТИНГ 30 июня | LUXURY',    '8': '🌊 Sun & Chill Бассейн',    '10': '👏 ИППОДРОМ Выездка',    '11': '🌸 ЖЕНСКОЕ ЗДОРОВЬЕ',    '12': '🎯 СТРЕЛЬБА Адреналин',    '13': '🚗 АВТОДРОМ',    '14': '💃 СТРИП-ПЛАСТИКА',    '15': '🧘‍♀️ ПИЛАТЕС август',  };  const getEventHeader = (eventId?: string, eventTitle?: string, isPaid = true): string => {    if (eventId && EVENT_HEADERS[eventId]) {      return isPaid        ? `💳 НОВАЯ ЗАЯВКА | ${EVENT_HEADERS[eventId]}`        : `📝 ПРЕДЗАПИСЬ | ${EVENT_HEADERS[eventId]}`;    }    return isPaid ? '💳 НОВАЯ ЗАЯВКА НА БИЛЕТ' : '📝 ПРЕДЗАПИСЬ';  };  const sendTelegramToChats = async (chatIds: string[], message: string) => {    if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) return;    await Promise.all(      chatIds.map(chatId =>        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {          method: 'POST',          headers: { 'Content-Type': 'application/json' },          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),        }).catch(err => console.error('Telegram send error:', err))      )    );  };  const sendTelegramMessage = async (message: string, eventId?: string) => {    if (!TELEGRAM_BOT_TOKEN) {      console.warn('⚠️ Telegram credentials missing. Skipping notification.');      return;    }    // Общий чат (все мероприятия)    await sendTelegramToChats(TELEGRAM_CHAT_IDS, message);    // Отдельный чат мероприятия (если задан)    if (eventId && EVENT_CHAT_MAP[eventId]?.length > 0) {      await sendTelegramToChats(EVENT_CHAT_MAP[eventId], message);    }  };  function generateToken(params: Record<string, any>): string {    const flatParams: Record<string, string> = {};    for (const [key, value] of Object.entries(params)) {      if (typeof value !== 'object' && value !== null && value !== undefined) {        flatParams[key] = String(value);      }    }    flatParams['Password'] = TBANK_PASSWORD;    const concatenated = Object.keys(flatParams)      .sort()      .map(key => flatParams[key])      .join('');    return crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');  }  // ─── API Routes ──────────────────────────────────────────────────    app.get('/api/test-telegram', async (req, res) => {    try {      const message = `🔔 <b>Тестовое сообщение</b>\n\nЭто проверка уведомлений от Живой Женщины.`;      await sendTelegramMessage(message);      return res.json({ success: true, message: 'Test message sent' });    } catch (error) {      return res.status(500).json({ error: String(error) });    }  });  app.post('/api/payment/init', async (req, res) => {    try {      const { orderId, amount, description, customerName, customerPhone, customerTelegram, eventTitle, eventId } = req.body;      if (!orderId || !amount || !description) {        return res.status(400).json({ error: 'Missing required fields' });      }      if (amount <= 0 || !eventTitle || eventTitle.includes('Уточняется')) {        // Это ПРЕДЗАПИСЬ (без оплаты)
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

