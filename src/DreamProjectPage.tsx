import { motion } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import annaPortrait from './assets/anna-light.png';
import annaJourney from './assets/anna2.jpg';
import dreamHeroParis from './assets/dream-hero-paris.png';
import workbookDayThree from './assets/workbook/day-3.png';
import workbookProject from './assets/workbook/project-table.png';
import workbookScenario from './assets/workbook/scenario-minimum.png';
import workbookWeek from './assets/workbook/price-week.png';

const facts = ['13–17 сентября', 'Ежедневно в 12:00 МСК', '5 прямых эфиров', 'Рабочая тетрадь', 'Записи встреч'];
const steps = ['Выбрать', 'Уточнить', 'Спроектировать', 'Посчитать', 'Собрать в план'];

const faqs = [
  ['Можно смотреть запись эфира?', 'Да. Запись каждой встречи сохраняется и входит в материалы интенсива.'],
  ['Сколько длится встреча?', 'Каждый прямой эфир длится около 30 минут. После эфира вы переходите к заданию дня в своём темпе.'],
  ['Какие мечты подходят для работы?', 'Формат подходит для путешествия, дома, обучения, переезда, бизнеса, собственного проекта и других больших желаний.'],
  ['Как пользоваться промтами?', 'Каждый день вы получаете готовый текст промта и применяете его к своей мечте в выбранном сервисе ИИ.'],
  ['Какой тариф ИИ подходит?', 'В интенсив входят версии промтов для платных и бесплатных тарифов ИИ. Вы выбираете привычный формат.'],
  ['Чем отличаются два формата участия?', 'В формате «С сопровождением» к материалам добавляется до 60 минут личной работы Анны с вашей мечтой, расчётами и структурой проекта.'],
];

const Button = ({ children, href = '#tariffs', light = false }: { children: ReactNode; href?: string; light?: boolean }) => {
  const isExternal = href.startsWith('http');
  return <a className={`dream-button ${light ? 'dream-button--light' : ''}`} href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>{children}<span>↗</span></a>;
};

function NotebookMockup() {
  return (
    <div className="workbook-pages" aria-label="Реальные страницы рабочей тетради «Мечта как проект»">
      <img src={workbookDayThree} alt="Страница тетради: Любая мечта начинается с Excel" />
      <img src={workbookProject} alt="Страница тетради: Проект моей мечты" />
      <img src={workbookScenario} alt="Страница тетради: сценарий Минимум" />
      <img src={workbookWeek} alt="Страница тетради: Цена недели" />
    </div>
  );
}

export default function DreamProjectPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <main className="dream-page">
      <Helmet>
        <title>Мечта как проект — интенсив Анны Зверковой</title>
        <meta name="description" content="5 дней, чтобы превратить большое желание в понятный пошаговый план." />
      </Helmet>

      <section className="dream-hero">
        <img src={dreamHeroParis} alt="Светлая парижская комната с открытым окном и видом на Эйфелеву башню" className="dream-hero__image" />
        <div className="dream-hero__wash" />
        <div className="dream-shell dream-hero__content">
          <p className="dream-kicker">5-дневный онлайн-интенсив Анны Зверковой</p>
          <h1>Мечта <em>как проект</em></h1>
          <p className="dream-hero__lead">5 дней, чтобы превратить большое «хочу»<br/>в понятный пошаговый план.</p>
          <div className="dream-hero__facts">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
        </div>
        <p className="dream-manifesto">Мечтать широко. &nbsp; Считать точно. &nbsp; Двигаться по шагам.</p>
      </section>

      <section className="dream-section dream-intro dream-shell">
        <p className="dream-index">01 — Идея</p>
        <div className="dream-intro__grid">
          <h2>У каждого большого<br/>«хочу» может<br/><em>появиться план</em></h2>
          <div className="dream-intro__copy"><p>Когда-нибудь поеду.<br/>Когда-нибудь перееду.<br/>Когда-нибудь создам своё.<br/>Когда-нибудь куплю.<br/>Когда-нибудь решусь.</p><p>За пять дней мечта получает форму, цифры, варианты и последовательность действий.</p></div>
        </div>
        <div className="dream-quote">Из «я хочу»<span>в</span>«я понимаю, что делать дальше»</div>
      </section>

      <section className="dream-author">
        <div className="dream-shell">
          <p className="dream-index">02 — Анна</p>
          <div className="dream-author__grid">
            <div className="dream-author__portrait"><img src={annaPortrait} alt="Анна Зверкова"/><span>Анна Зверкова</span></div>
            <div className="dream-author__story">
              <h2>Я всегда<br/><em>много хотела</em></h2>
              <p className="dream-author__opening">В детстве папа шутил, что однажды подарит мне губозакаточную машинку.</p>
              <p>Мне всегда хотелось большего: других стран, путешествий, своего дела, ярких впечатлений, новых проектов, красивой жизни.</p>
              <div className="dream-author__milestones"><span>38 лет</span><span>Свадьба<br/>в Новой Зеландии</span><span>Двое детей<br/>родились в Мексике</span><span>Собственный<br/>бренд</span></div>
              <p>Каждое большое событие своей жизни я привыкла воспринимать как проект. Сначала появляется большое «хочу». А затем включается предприниматель: что именно, когда, сколько, какие варианты, какая последовательность, что делать первым?</p>
              <div className="dream-equation"><strong>Широта мыслей<br/>и мечт</strong><b>+</b><strong>Холодный расчёт<br/>предпринимателя</strong></div>
              <p>Именно из этого соединения появился интенсив «Мечта как проект».</p>
              <p className="dream-signature">Анна Зверкова</p><small>предприниматель · основатель Tencel Dream<br/>автор проекта «Живая женщина»</small>
            </div>
          </div>
          <img className="dream-author__journey" src={annaJourney} alt="Анна в путешествии среди большого открытого пространства"/>
        </div>
      </section>

      <section className="dream-section dream-process dream-shell">
        <p className="dream-index">03 — Как проходит интенсив</p>
        <div className="dream-heading-row"><h2>Пять дней.<br/><em>Одна мечта.</em></h2><div><p className="dream-schedule"><strong>13–17 сентября</strong><span>Каждый день · 12:00 МСК</span></p><p>Каждый день — прямой эфир около 30 минут, одна тема и один следующий этап. Запись встречи сохраняется.</p></div></div>
        <div className="dream-format-grid">
          {[['01','Прямой эфир','Анна объясняет тему дня и даёт задание.'],['02','Рабочая тетрадь','Мысли, решения, цифры и итоговые выводы собираются в одном месте.'],['03','Задание дня','Каждый день открывает следующий этап движения.'],['04','Промт для ИИ','Готовый промт помогает применить тему к вашей мечте.']].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="dream-ai-note"><p>В интенсиве есть версии промтов</p><strong>для платных</strong><i>и</i><strong>для бесплатных тарифов ИИ</strong></div>
        <div className="dream-steps">{steps.map((step, i) => <div key={step}><span>0{i+1}</span><p>{step}</p></div>)}</div>
      </section>

      <section className="dream-result">
        <div className="dream-shell dream-result__grid"><div><p className="dream-index">04 — Результат</p><h2>Мечта собрана<br/><em>в красивый проект</em></h2></div><ul>{['Одна выбранная мечта','Ясное понимание желаемого','Три сценария: Минимум, Норма, Премиум','Точная стоимость трёх сценариев','Понятная структура движения','Следующий конкретный шаг'].map(x=><li key={x}>{x}</li>)}</ul></div>
        <div className="dream-result__line">Из «я хочу» <span>→</span> в «я понимаю, что делать дальше»</div>
      </section>

      <section className="dream-section dream-workbook dream-shell">
        <div className="dream-workbook__copy"><p className="dream-index">05 — Рабочая тетрадь</p><h2>Вся ваша мечта —<br/><em>в одном месте</em></h2><p>На протяжении пяти дней вы работаете в тетради «Мечта как проект». В ней постепенно собираются ваши мысли, решения, расчёты и итоговая структура.</p></div>
        <NotebookMockup />
      </section>

      <section className="dream-ai">
        <div className="dream-shell dream-ai__grid"><div><p className="dream-index">06 — Искусственный интеллект</p><h2>ИИ помогает собрать<br/><em>вашу индивидуальную картину</em></h2></div><div><p>Каждый день участница получает готовый промт. Он помогает структурировать мысли, искать варианты, сравнивать, считать и собирать информацию.</p><div className="dream-ai__badge"><span>Ваш привычный ИИ</span><strong>Платный тариф</strong><b>или</b><strong>Бесплатный тариф</strong></div></div></div>
      </section>

      <section id="tariffs" className="dream-section dream-tariffs dream-shell">
        <p className="dream-index">07 — Форматы участия</p><h2>Выберите свой<br/><em>способ движения</em></h2>
        <div className="dream-tariff-grid">
          <article className="dream-price-row"><div className="dream-price-row__title"><div><p className="dream-tariff__label">Самостоятельно</p><p className="dream-tariff__places">10 мест</p></div><h3>5 000 ₽</h3></div><div className="dream-price-row__body"><ul>{['5 прямых эфиров','Записи всех встреч','Рабочая тетрадь','Задания каждого дня','Готовые промты для ИИ','Версии для платных и бесплатных тарифов ИИ','Материалы интенсива'].map(x=><li key={x}>{x}</li>)}</ul><Button href="/mechta-kak-proekt-tarif-solo">Выбрать</Button></div></article>
          <article className="dream-price-row dream-price-row--accent"><div className="dream-price-row__title"><div><p className="dream-tariff__label">С сопровождением</p><p className="dream-tariff__places">5 мест</p></div><h3>10 000 ₽</h3></div><div className="dream-price-row__body"><div><p>Всё из формата «Самостоятельно»</p><ul>{['Личный разбор мечты с Анной','Помощь с расчётами и Excel','Структура проекта','Поиск вариантов реализации','До 60 минут личной работы Анны'].map(x=><li key={x}>{x}</li>)}</ul></div><Button href="/mechta-kak-proekt-tarif-vip">Хочу с Анной</Button></div></article>
        </div>
        <div className="dream-cohort"><h3>Первый поток —<br/><em>15 участниц</em></h3><div><p><strong>10 мест</strong><br/>самостоятельная работа</p><p><strong>5 мест</strong><br/>личное сопровождение Анны</p><p>Во втором формате Анна лично подключается к каждой мечте и выделяет время на индивидуальную работу.</p></div></div>
      </section>

      <section className="dream-section dream-stories dream-shell">
        <p className="dream-index">08 — Пять женских маршрутов</p>
        <div className="dream-stories__heading"><h2>Почему мечта<br/><em>становится тише</em></h2><p>Пять женщин. Пять разных жизненных причин.</p></div>
        <article className="dream-story-featured">
          <div><span>01 / Моя история</span><h3>Париж в сентябре.<br/><em>Четыре дня для себя</em></h3></div>
          <blockquote>«После семейного отпуска мне требовалась ещё неделя, чтобы восстановиться. Сейчас я собираю Париж по своей методике — как глоток воздуха после десяти лет брака, двух детей и двух собак».</blockquote>
          <p>Мне достаточно четырёх дней для вдохновения — дней, когда я сама выбираю, куда хочу пойти.</p>
        </article>
        <div className="dream-story-grid">
          <article className="dream-story-real"><span>02 / Женская история</span><h3>Чужой сценарий звучит громче</h3><blockquote>«Я умею мечтать. Но окружающие возвращают меня на землю».</blockquote><small>Своя мечта рядом — и всё же появляются сомнения: может, жить как все?</small></article>
          <article className="dream-story-real"><span>03 / Женская история</span><h3>Желание сразу становится задачей</h3><blockquote>«У меня цели. Я сразу раскладываю всё: раз, два, три, четыре».</blockquote><small>Система помогает достигать и одновременно сужает масштаб желания.</small></article>
          <article className="dream-story-real"><span>04 / Женская история</span><h3>Работа заняла всю картину жизни</h3><blockquote>«Я достигала. Теперь хочу жить».</blockquote><small>Возвращается вопрос: чего я хочу для себя — кроме работы и планов?</small></article>
          <article className="dream-story-real"><span>05 / Женская история</span><h3>Желаемое всегда требовало борьбы</h3><blockquote>«Между чужими ожиданиями и движением им назло есть третий вариант — мой собственный выбор».</blockquote><small>Мечта становится своим маршрутом, а не очередной проверкой на прочность.</small></article>
        </div>
      </section>

      <section className="dream-section dream-faq dream-shell"><p className="dream-index">09 — Вопросы</p><div className="dream-faq__grid"><h2>Всё важное<br/><em>перед стартом</em></h2><div>{faqs.map(([q,a],i)=><article className={openFaq===i?'is-open':''} key={q}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}><span>{q}</span><ChevronDown size={18}/></button><div><p>{a}</p></div></article>)}</div></div></section>

      <section id="join" className="dream-final"><div className="dream-shell"><p className="dream-kicker">Мечта как проект</p><h2>Выберите одну мечту<br/>и дайте ей <em>5 дней внимания</em></h2><p>За это время у неё появятся форма, цифры,<br/>варианты и следующий шаг.</p><strong>от 5 000 ₽</strong><Button light href="https://t.me/AnnaZverkovaWeb">Присоединиться</Button><div className="dream-final__motto">Мечтать широко. Считать точно. Двигаться по шагам.</div></div></section>
    </main>
  );
}

export function DreamJoinPage({ plan }: { plan: 'solo' | 'vip' }) {
  const navigate = useNavigate();
  const support = plan === 'vip';
  const title = support ? 'С сопровождением' : 'Самостоятельно';
  const price = support ? '10 000 ₽' : '5 000 ₽';
  const telegram = support ? 'https://t.me/+S6zALjcy5Q01NzMy' : 'https://t.me/+EjaGuBbzCl5mYzU6';
  const close = () => navigate('/dream-project#tariffs');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className={`dream-page dream-join-page ${support ? 'dream-join-page--vip' : ''}`} onClick={close}>
      <Helmet><title>{support ? 'Мечта как проект — тариф VIP' : 'Мечта как проект — тариф Соло'}</title></Helmet>
      <div className="dream-join-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="dream-plan-title">
        <button className="dream-join-close" type="button" onClick={close} aria-label="Закрыть и вернуться к тарифам"><X size={20}/></button>
        <p className="dream-kicker">Мечта как проект · выбранный формат</p>
        <h1 id="dream-plan-title">{title}</h1>
        <div className="dream-join-price">{price}</div>
        <p className="dream-join-schedule"><strong>13–17 сентября</strong><span>Прямые эфиры ежедневно в 12:00 МСК</span></p>
        <div className="dream-join-line" />
        <h2>Присоединяйтесь<br/><em>к группе интенсива</em></h2>
        <p>Добавляйтесь в группу интенсива в Telegram. Ссылка на оплату придёт вам в сообщении.</p>
        <Button href={telegram}>Присоединиться</Button>
        <Link className="dream-join-back" to="/dream-project#tariffs">← Вернуться к форматам</Link>
      </div>
    </main>
  );
}
