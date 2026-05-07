import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 3001;
const TBANK_TERMINAL_KEY = process.env.TBANK_TERMINAL_KEY!;
const TBANK_PASSWORD = process.env.TBANK_PASSWORD!;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map(id => id.trim()).filter(Boolean);

// ─── Генерация Token для Т-Банк API ───────────────────────────────
// Алгоритм: собрать пары ключ:значение (без вложенных объектов),
// добавить Password, отсортировать по ключу, конкатенировать значения,
// применить SHA-256
function generateToken(params: Record<string, any>): string {
  // Берём только примитивные значения (не объекты/массивы)
  const flatParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'object' && value !== null && value !== undefined) {
      flatParams[key] = String(value);
    }
  }

  // Добавляем Password
  flatParams['Password'] = TBANK_PASSWORD;

  // Сортируем по ключу и конкатенируем значения
  const concatenated = Object.keys(flatParams)
    .sort()
    .map(key => flatParams[key])
    .join('');

  // SHA-256
  return crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');
}

// ─── POST /api/payment/init ───────────────────────────────────────
// Принимает данные заказа от фронтенда, вызывает Т-Банк Init API,
// возвращает PaymentURL для редиректа
app.post('/api/payment/init', async (req, res) => {
  try {
    const { orderId, amount, description, customerName, customerPhone, customerTelegram, eventId } = req.body;

    if (!orderId || !amount || !description) {
      return res.status(400).json({ error: 'Missing required fields: orderId, amount, description' });
    }

    const initParams: Record<string, any> = {
      TerminalKey: TBANK_TERMINAL_KEY,
      Amount: amount, // в копейках
      OrderId: orderId,
      Description: description.substring(0, 140), // макс 140 символов
      PayType: 'O', // одностадийная оплата
      Language: 'ru',
      SuccessURL: `${SITE_URL}/success?orderId=${orderId}`,
      FailURL: `${SITE_URL}/checkout/${eventId}?error=payment_failed`,
      NotificationURL: `${SITE_URL}/api/payment/notify`,
      DATA: {
        Phone: customerPhone,
        CustomerName: customerName,
        CustomerTelegram: customerTelegram,
      },
    };

    // Генерируем подпись
    initParams.Token = generateToken(initParams);

    console.log('🔄 Calling T-Bank Init API...');
    console.log('  OrderId:', orderId);
    console.log('  Amount:', amount, 'копеек');

    const response = await fetch('https://securepay.tinkoff.ru/v2/Init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initParams),
    });

    const data = await response.json();

    if (data.Success) {
      console.log('✅ Payment initialized. PaymentURL:', data.PaymentURL);
      return res.json({
        success: true,
        paymentUrl: data.PaymentURL,
        paymentId: data.PaymentId,
      });
    } else {
      console.error('❌ T-Bank Init error:', data.Message, data.Details);
      return res.status(400).json({
        error: data.Message || 'Payment initialization failed',
        details: data.Details,
        errorCode: data.ErrorCode,
      });
    }
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── POST /api/payment/notify ─────────────────────────────────────
// Webhook от Т-Банка — приходит после успешной/неуспешной оплаты
app.post('/api/payment/notify', async (req, res) => {
  try {
    const notification = req.body;
    console.log('📬 T-Bank webhook received:', JSON.stringify(notification, null, 2));

    // Проверяем подпись (Token)
    const { Token: receivedToken, ...paramsWithoutToken } = notification;
    const expectedToken = generateToken(paramsWithoutToken);

    if (receivedToken !== expectedToken) {
      console.error('❌ Invalid webhook token!');
      return res.send('INVALID TOKEN');
    }

    // Обрабатываем только успешные платежи
    if (notification.Status === 'CONFIRMED' || notification.Status === 'AUTHORIZED') {
      console.log('✅ Payment successful! OrderId:', notification.OrderId);

      // Отправляем уведомление в Telegram
      const amountRub = (notification.Amount / 100).toLocaleString('ru-RU');
      const message = [
        `💳 <b>Оплата получена!</b>`,
        ``,
        `📌 <b>Заказ:</b> #${notification.OrderId}`,
        `💰 <b>Сумма:</b> ${amountRub} ₽`,
        `🏦 <b>Способ оплаты:</b> ${notification.CardId ? 'Карта' : 'СБП/T-Pay'}`,
        `📋 <b>ID платежа:</b> ${notification.PaymentId}`,
        ``,
        `✅ Статус: ${notification.Status}`,
      ].join('\n');

      // Отправляем всем получателям
      await Promise.all(
        TELEGRAM_CHAT_IDS.map(chatId =>
          fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML',
            }),
          }).catch(err => console.error('Telegram send error:', err))
        )
      );
    }

    // Т-Банк ожидает ответ "OK"
    return res.send('OK');
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return res.send('OK'); // Всё равно отвечаем OK, чтобы Т-Банк не повторял
  }
});

// ─── Health check ─────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Payment server running on http://localhost:${PORT}`);
  console.log(`   Terminal: ${TBANK_TERMINAL_KEY}`);
  console.log(`   Site URL: ${SITE_URL}`);
  console.log(`   Telegram recipients: ${TELEGRAM_CHAT_IDS.length}\n`);
});
