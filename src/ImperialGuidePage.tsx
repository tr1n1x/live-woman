import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Download, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import hero from './assets/imperial-guide-hero-clean.png';
import dayOne from './assets/imperial-guide-day-1.png';
import dayTwo from './assets/imperial-guide-day-2.png';
import './imperial-guide.css';

export function ImperialGuidePage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const buy = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/guide/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (!response.ok || !data.paymentUrl) throw new Error(data.error || 'Не удалось открыть оплату');
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось открыть оплату. Попробуйте ещё раз.');
      setSubmitting(false);
    }
  };

  return (
    <main className="imperial-guide">
      <Helmet>
        <title>Императорский Петербург — готовый маршрут на 48 часов</title>
        <meta name="description" content="Готовый маршрут по императорскому Петербургу: Яндекс Карты, бронирования, контакты и красивые ракурсы. Открыть и пойти." />
      </Helmet>

      <section className="imperial-hero">
        <img src={hero} alt="Императорский Петербург" className="imperial-hero__image" />
        <div className="imperial-hero__title">
          <p className="imperial-hero__eyebrow">Авторский гид Анны Зверковой</p>
          <h1>Императорский<br /><em>Петербург</em></h1>
          <p className="imperial-hero__script">48 часов со мной</p>
        </div>
        <div className="imperial-hero__content">
          <p className="imperial-lead">Маршруты на карте, бронирования, контакты, красивые ракурсы</p>
          <button className="imperial-button" onClick={() => setCheckoutOpen(true)}>
            Купить гайд за 290 ₽ <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="imperial-intro">
        <p className="imperial-script">Я о вас позаботилась</p>
        <h2>Открываете гайд —<br />и просто идёте</h2>
        <p>Всё уже собрано за вас. Не нужно переключаться между десятками вкладок, искать контакты и заново выстраивать маршрут.</p>
      </section>

      <section className="imperial-includes">
        <div className="imperial-includes__visual">
          <img src={dayOne} alt="Первый день маршрута — Старые деньги и красивая жизнь" />
          <img src={dayTwo} alt="Второй день маршрута — Петербургская Ривьера" />
        </div>
        <div className="imperial-includes__copy">
          <p className="imperial-kicker">Внутри гайда</p>
          <h2>Маршрут, который<br /><em>уже собран</em></h2>
          <ul>
            <li><Check size={18} /> готовые маршруты на два дня</li>
            <li><Check size={18} /> ссылки на точки в Яндекс Картах</li>
            <li><Check size={18} /> контакты для бронирования</li>
            <li><Check size={18} /> порядок прогулки шаг за шагом</li>
            <li><Check size={18} /> точки и красивые ракурсы для фотографий</li>
          </ul>
        </div>
      </section>

      <section className="imperial-steps">
        <p className="imperial-kicker">Как это работает</p>
        <h2>Три простых шага</h2>
        <div className="imperial-steps__grid">
          <article><span>01</span><h3>Оплачиваете</h3><p>Безопасная платёжная страница Т‑Банка.</p></article>
          <article><span>02</span><h3>Скачиваете</h3><p>После оплаты сайт откроет персональную страницу с файлом.</p></article>
          <article><span>03</span><h3>Идёте</h3><p>Сохраните маршрут в Яндекс Картах — он работает и офлайн.</p></article>
        </div>
      </section>

      <section className="imperial-final">
        <button className="imperial-button imperial-button--dark" onClick={() => setCheckoutOpen(true)}>
          Купить гайд <ArrowRight size={18} />
        </button>
      </section>

      <footer className="imperial-footer">
        <span>Живая Женщина</span>
        <span>Санкт-Петербург</span>
      </footer>

      {checkoutOpen && (
        <div className="imperial-modal" onMouseDown={(e) => e.target === e.currentTarget && setCheckoutOpen(false)}>
          <div className="imperial-modal__card" role="dialog" aria-modal="true" aria-label="Покупка гайда">
            <button className="imperial-modal__close" onClick={() => setCheckoutOpen(false)} aria-label="Закрыть"><X /></button>
            <p className="imperial-kicker">Императорский Петербург</p>
            <h2>Получить гайд</h2>
            <p className="imperial-modal__text">После оплаты вы сразу сможете скачать PDF на сайте.</p>
            <form onSubmit={buy}>
              <label>Ваше имя<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться?" /></label>
              <label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Для восстановления доступа" /></label>
              {error && <div className="imperial-error">{error}</div>}
              <button className="imperial-button imperial-button--dark" disabled={submitting}>
                {submitting ? 'Открываем оплату…' : 'Перейти к оплате · 290 ₽'}
              </button>
              <small>Нажимая кнопку, вы соглашаетесь с <Link to="/offer">офертой</Link> и <Link to="/privacy">политикой конфиденциальности</Link>.</small>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export function ImperialGuideDownloadPage() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId') || '';
  const access = params.get('access') || '';
  const [status, setStatus] = useState<'checking' | 'paid' | 'waiting' | 'error'>('checking');

  useEffect(() => {
    let timer: number | undefined;
    let attempts = 0;
    const check = async () => {
      try {
        const response = await fetch(`/api/guide/order/${encodeURIComponent(orderId)}?access=${encodeURIComponent(access)}`);
        const data = await response.json();
        if (!response.ok) return setStatus('error');
        if (data.paid) return setStatus('paid');
        setStatus('waiting');
        if (++attempts < 20) timer = window.setTimeout(check, 2000);
      } catch { setStatus('error'); }
    };
    check();
    return () => timer && window.clearTimeout(timer);
  }, [orderId, access]);

  const downloadUrl = `/api/guide/download/${encodeURIComponent(orderId)}?access=${encodeURIComponent(access)}`;
  return (
    <main className="imperial-download">
      <Helmet><title>Ваш гайд — Императорский Петербург</title></Helmet>
      <div className="imperial-download__card">
        <p className="imperial-script">Спасибо</p>
        {status === 'paid' ? <>
          <h1>Гайд готов</h1>
          <p>Сохраните его на телефон — и Петербург уже у вас в руках.</p>
          <a className="imperial-button imperial-button--dark" href={downloadUrl}><Download size={18} /> Скачать PDF-гайд</a>
        </> : status === 'error' ? <>
          <h1>Не нашли заказ</h1><p>Проверьте, что открыли именно ту ссылку, на которую вас вернул банк.</p>
        </> : <>
          <h1>Проверяем оплату</h1><p>Обычно это занимает несколько секунд. Не закрывайте страницу.</p><div className="imperial-loader" />
        </>}
        <a className="imperial-support" href="https://t.me/AnnaZverkovaWeb" target="_blank" rel="noreferrer">Нужна помощь? Напишите нам</a>
      </div>
    </main>
  );
}
