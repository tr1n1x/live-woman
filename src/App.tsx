/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight,
  Heart,
  Flower2,
  Wind,
  Send,
  Plus
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';

// --- Types ---

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  price: string;
  category: string;
  host: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  program?: string[];
  capacityLabel?: string;
}

// --- Mock Data ---

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Пилатес в особняке Трубецких-Нарышкиных',
    date: '21 мая',
    time: '12:00',
    duration: '2 часа',
    location: 'Особняк Трубецких-Нарышкиных',
    description: 'Практика, в которой нет внешнего шума — только ты и твоё тело',
    longDescription: 'В старинном особняке, наполненном историей, мы создадим пространство тишины и внимания к себе.\n\nБез музыки — чтобы почувствовать, как откликается тело.\n\nМягкие практики помогут расслабиться и отпустить накопленное напряжение.\n\nПостепенно возвращается ощущение себя — спокойное и живое.\n\nИ именно это состояние ты унесёшь с собой.\n\n*В зале будет проходить небольшая фото- и видеосъемка.*',
    image: '/visit1.jpg',
    price: '3 100 ₽',
    category: 'Телесные практики',
    host: {
      name: 'Яна Маркина',
      role: 'тренер групповых программ',
      image: '/yana.jpg',
      bio: 'Работает с телом через понимание его структуры и взаимосвязей. Её занятия — это внимательное движение без перегрузки, где тело постепенно раскрывается и начинает «отзываться». После практики остаётся ощущение лёгкости, собранности и внутреннего спокойствия'
    },
    capacityLabel: 'Всего 25 мест'
  },
  {
    id: '2',
    title: 'Психологическая практика «Встреча с собой»',
    date: '27 мая',
    time: '12:00',
    duration: '3 часа',
    location: '16place (16place.ru)',
    description: 'Возможность остановиться и посмотреть на себя чуть глубже',
    longDescription: 'Мы будем работать с тем, что обычно остаётся фоном: чувства, реакции, внутренние состояния. Без спешки и без правильных ответов. Ты много делаешь, справляешься, но в какой-то момент перестаёшь понимать — а что я чувствую? Эта практика — возможность вернуться к себе и услышать то, что давно отложено «на потом».',
    image: '/visit2.jpg',
    price: '2 900 ₽',
    category: 'Психология',
    host: {
      name: 'Ирина Кобелева',
      role: 'дипломированный психолог',
      image: '/ira.jpg',
      bio: 'Работает в интегративном подходе, соединяя разные направления психотерапии. Создаёт пространство, в котором можно спокойно исследовать себя и находить свои ответы.'
    },
    capacityLabel: 'Всего 15 мест'
  },
  {
    id: '3',
    title: 'Спа-ритуал <br /> в Palace Bridge',
    date: '2 июня',
    time: '12:00',
    duration: '3 часа',
    location: 'Palace Bridge, Биржевой переулок, 2-4 (Санкт-Петербург)',
    description: 'Позвольте себе роскошь замедления: теплая вода, ароматы масел и тотальное расслабление каждой клеточки тела.',
    longDescription: 'Я буду рядом и аккуратно проведу тебя через это состояние. Это время без спешки и задач, созданное для тех, кто давно не останавливался и хочет снова почувствовать себя.',
    image: '/visit3.jpg',
    price: '5 500 ₽',
    category: 'SPA и ритуалы',
    host: {
      name: 'Анна Зверкова',
      role: 'мастер ритуалов и игропрактик',
      image: '/anna.jpg',
      bio: 'Помогаю женщинам восстановить связь со своей природной красотой через бережные ритуалы и глубокие практики.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'тёплая вода и мягкое погружение в состояние',
      'сауны и хамам с ароматами и вниманием к телу',
      'время без спешки и задач',
      'чай, лёгкое общение и практика с МАК-картами'
    ]
  }
];

const GALLERY_IMAGES = [
  { url: '/visit1.jpg', title: 'Moment 1' },
  { url: '/visit2.jpg', title: 'Moment 2' },
  { url: '/visit3.jpg', title: 'Moment 3' },
  { url: '/visit1.jpg', title: 'Moment 4' },
  { url: '/visit2.jpg', title: 'Moment 5' },
];

// --- Components ---

const SEO = ({ title, description, keywords }: { title?: string, description?: string, keywords?: string }) => (
  <Helmet>
    <title>{title ? `${title} | Живая Женщина` : 'Живая Женщина — Пространство тишины и возвращения к себе'}</title>
    <meta name="description" content={description || "Женские встречи и телесные практики в Санкт-Петербурге. Пространство для тех, кто ищет тишину, паузу и путь к себе."} />
    {keywords && <meta name="keywords" content={keywords} />}
  </Helmet>
);

const WomanSilhouette = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className={className}>
    <path d="M50 22c-4.5 0-8 3.5-8 8s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8z" />
    <path d="M30 78c3-18 10-28 20-28s17 10 20 28" />
    <path d="M50 38c-12 0-22 12-22 30" />
    <path d="M50 38c12 0 22 12 22 30" />
  </svg>
);

const BrandLogo = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`flex items-center gap-3 font-display italic text-brand-brown tracking-wider whitespace-nowrap font-medium ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <WomanSilhouette className="w-8 h-8 text-brand-pink/40" />
    <span>Живая Женщина</span>
  </motion.div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500 ${isScrolled ? 'glass py-4 border-none' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <BrandLogo className="text-2xl md:text-3xl" />
        </Link>
        
        <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.2em] font-medium text-brand-brown">
          <Link to="/about" className="hover:text-brand-pink transition-colors">О проекте</Link>
          <Link to="/gallery" className="hover:text-brand-pink transition-colors">Галерея</Link>
          <Link to="/events" className="hover:text-brand-pink transition-colors">Встречи</Link>
          <Link to="/events" className="bg-brand-pink text-white px-8 py-3 rounded-full hover:bg-brand-brown transition-colors shadow-lg shadow-brand-brown/10">
            Хочу на встречу
          </Link>
        </div>

        <button 
          className="md:hidden text-brand-brown p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-brand-milky z-40 p-12 flex flex-col justify-center gap-12 text-center md:hidden"
          >
            <button className="absolute top-8 right-8 text-brand-brown" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {['О проекте', 'Галерея', 'Встречи'].map((item, i) => (
              <motion.div key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item === 'О проекте' ? (
                  <Link 
                    to="/about" 
                    className="text-4xl serif-light text-brand-ink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ) : item === 'Галерея' ? (
                  <Link 
                    to="/gallery" 
                    className="text-4xl serif-light text-brand-ink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ) : (
                  <Link 
                    to="/events"
                    className="text-4xl serif-light text-brand-ink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Header = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden bg-brand-milky">
      {/* Background Image With Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="Живая Женщина" 
          className="w-full h-full object-cover object-[75%] md:object-right opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-milky via-brand-milky/20 to-brand-milky/40 md:bg-gradient-to-r md:from-brand-milky md:via-brand-milky/60 md:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-brand-brown/30" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-brown font-semibold uppercase">Тишина. Тело. Женщина</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4.8rem)] serif-light leading-[1.1] mb-10 text-brand-brown">
              Пространство, <br />
              где ты снова становишься <span className="italic">собой</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-display text-brand-brown/70 mb-12 max-w-lg leading-relaxed italic">
              Живые встречи в Санкт-Петербурге: <br />
              внимание к себе без спешки
            </p>
            
            <div className="flex flex-wrap gap-8 items-center">
              <Link to="/events" className="group relative bg-brand-pink text-white pl-10 pr-14 py-5 rounded-full font-medium overflow-hidden transition-all hover:pr-10">
                <span className="relative z-10">Хочу на встречу</span>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 group-hover:translate-x-12 transition-transform duration-300">
                  <ArrowRight size={20} />
                </div>
                <div className="absolute inset-0 bg-brand-brown scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Ornaments */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-[600px] h-[600px] border border-brand-pink/10 rounded-full flex items-center justify-center -z-10"
      >
        <div className="w-[400px] h-[400px] border border-brand-pink/5 rounded-full" />
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:pr-20 flex flex-col justify-between h-full"
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[4rem] relative z-10 shadow-2xl shadow-brand-brown/5 max-w-[80%] mx-auto lg:mx-0">
                <img 
                  src="/anna.jpg" 
                  alt="Анна Зверкова" 
                  className="w-full h-full object-cover object-top contrast-[0.9] brightness-[1.02] saturate-[0.95]"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Artistic Frame */}
              <div className="absolute -top-12 -left-12 w-full h-full border border-brand-pink/20 rounded-[4rem] -z-10 hidden md:block max-w-[80%]" />
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-2 md:-bottom-10 md:right-0 z-20 w-[220px] md:w-[280px]"
              >
                <div className="glass p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-brand-pink/5 relative overflow-hidden group">
                  {/* Decorative Olive Leaf Shadow */}
                  <div className="absolute -top-4 -right-4 text-brand-gold/10 rotate-12 transition-transform group-hover:rotate-45 duration-1000">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="md:w-[120px] md:h-[120px]">
                      <path d="M50 90C50 90 45 70 30 60C15 50 10 30 10 30C10 30 30 35 45 45C60 55 50 90 50 90Z opacity-20" />
                      <path d="M50 90C50 90 55 70 70 60C85 50 90 30 90 30C90 30 70 35 55 45C40 55 50 90 50 90Z opacity-20" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm md:text-base serif-light text-brand-ink leading-relaxed mb-1 md:mb-2">
                      Анна Зверкова
                    </p>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-brand-brown/60 font-medium">
                      Основатель проекта <br/> «Живая Женщина»
                    </p>
                  </div>
                  
                  {/* Subtle Olive Branch SVG */}
                  <svg className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-brand-gold/30 w-12 h-12 md:w-16 md:h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 80C40 70 60 40 80 20" strokeLinecap="round" />
                    <ellipse cx="65" cy="35" rx="8" ry="3" transform="rotate(-45 65 35)" />
                    <ellipse cx="50" cy="50" rx="7" ry="2.5" transform="rotate(-30 50 50)" />
                    <ellipse cx="35" cy="65" rx="6" ry="2" transform="rotate(-15 35 65)" />
                    <ellipse cx="75" cy="25" rx="5" ry="2" transform="rotate(-50 75 25)" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 lg:mt-0 max-w-[80%] mx-auto lg:mx-0 flex flex-col justify-end"
            >
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-brown text-brand-brown rounded-full text-sm font-medium hover:bg-brand-brown hover:text-white transition-all duration-300 group max-w-max"
              >
                Подробнее об истории создания
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-6">Философия проекта</span>
              <h2 className="text-4xl md:text-5xl serif-light leading-snug text-brand-ink">
                Тебе тоже иногда хочется просто выдохнуть и побыть <span className="italic">собой</span>?
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-brand-brown/80 leading-relaxed font-light whitespace-pre-line">
              <p>
                Не быть сильной.{"\n"}
                Не держать всё под контролем.{"\n"}
                Не думать, что ещё нужно успеть.{"\n"}
                А просто остановиться.{"\n"}
                Почувствовать себя.{"\n"}
                И вспомнить, какая ты — вне ролей мамы, жены, «той, которая справляется».
              </p>
              <p>
                Я хорошо знаю это состояние.{"\n"}
                Когда день за днём ты живёшь в заботе о других —{"\n"}
                и постепенно отодвигаешь себя на потом.
              </p>
              <p>
                Проект «Живая женщина» родился из этого опыта.{"\n"}
                Это встречи, где не нужно быть удобной, правильной или собранной.{"\n"}
                Где можно выдохнуть, расслабиться и вернуться к себе —{"\n"}
                через разговор, тишину и простое человеческое присутствие.
              </p>
              <p>
                Иногда этого достаточно, чтобы внутри снова появилось: желание, энергия и ощущение жизни.
              </p>
              <p className="text-brand-pink font-medium">
                Где тебе не нужно становиться лучше. Достаточно остановиться и услышать себя.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EventCalendar = () => {
  return (
    <section id="calendar" className="py-40 px-6 bg-brand-pink/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-6">Календарь</span>
            <h2 className="text-5xl md:text-6xl serif-light text-brand-ink">Предстоящие встречи</h2>
          </div>
          <p className="max-w-md text-brand-brown/60 text-sm italic font-light leading-relaxed">
            Каждая встреча раскрывает любовь к себе с разной стороны. В каждой есть сила и польза по отдельности, и вместе это целая программа возвращения к себе. Мягко.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {EVENTS.map((event) => (
            <motion.div 
              key={event.id}
              whileHover={{ y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group"
            >
              <Link to={`/event/${event.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] mb-8 shadow-xl shadow-brand-brown/5">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 glass px-5 py-2 rounded-full text-xs tracking-widest uppercase text-brand-ink">
                    {event.date}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="space-y-4 px-4">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-brand-brown/60">
                    <span className="text-brand-pink">•</span>
                    {event.category}
                  </div>
                  <h3 className="text-2xl serif-light group-hover:text-brand-pink transition-colors" dangerouslySetInnerHTML={{ __html: event.title }} />
                  <p className="text-base text-brand-brown/50 line-clamp-2 leading-relaxed">{event.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-brand-pink/10">
                    <span className="text-lg font-medium text-brand-ink whitespace-nowrap">{event.price}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown group-hover:underline transition-all">Подробнее</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntroPowerSection = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      <img 
        src="/hero2.jpg" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />
      {/* Extremely subtle blur for text contrast without hiding the photo details */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-display italic leading-tight mb-12 text-brand-brown">
          Многогранность твоей силы
        </h2>
        <div className="w-24 h-[1px] bg-brand-pink mx-auto mb-12" />
        <p className="max-w-3xl mx-auto text-brand-brown/70 leading-relaxed font-light italic text-xl md:text-2xl drop-shadow-sm">
          В каждой из нас пульсирует мощная сила жизни и энергия, способная созидать миры.<br /><br />
          За заботой о детях и бесконечными делами мы часто забываем об этом источнике.<br /><br />
          Наши встречи — это пространство, где можно замедлиться и снова вспомнить о своей истинной природе.
        </p>
      </div>
    </section>
  );
};

const FormatsSection = () => {
  const formats = [
    { title: 'Психология и любовь', icon: <Heart size={20} />, items: ['Самоценность', 'Сексология', 'Отношения'] },
    { title: 'Стиль и красота', icon: <Star size={20} />, items: ['Визаж', 'Имидж-коды', 'Нутрициология'] },
    { title: 'Телесная осознанность', icon: <Wind size={20} />, items: ['Мягкая йога', 'Пилатес', 'Танцы'] },
    { title: 'Ритуалы заботы', icon: <Flower2 size={24} />, items: ['SPA-дни', 'Медитации', 'Баня'] },
  ];

  return (
    <section id="types" className="py-40 px-6 bg-brand-milky">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formats.map((format, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: "rgba(201, 167, 160, 0.05)" }}
              className="p-12 border border-brand-pink/10 transition-all group relative overflow-hidden bg-white"
            >
              <div className="text-brand-pink mb-8 transition-transform group-hover:scale-125 duration-500">
                {format.icon}
              </div>
              <h4 className="text-xl serif-light mb-8">{format.title}</h4>
              <ul className="space-y-4">
                {format.items.map(item => (
                  <li key={item} className="text-xs uppercase tracking-widest text-brand-brown/60 flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-gold rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const photos = [
    { src: '/visit1.jpg', alt: 'Moment 1', span: 'md:col-span-2 md:row-span-2' },
    { src: '/visit2.jpg', alt: 'Moment 2', span: 'md:col-span-1 md:row-span-1' },
    { src: '/visit3.jpg', alt: 'Moment 3', span: 'md:col-span-1 md:row-span-1' },
    { src: '/visit1.jpg', alt: 'Moment 4', span: 'md:col-span-1 md:row-span-2' },
    { src: '/visit2.jpg', alt: 'Moment 5', span: 'md:col-span-2 md:row-span-2' },
  ];

  return (
    <section id="gallery" className="py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl serif-light mb-8 italic text-brand-brown">Мгновения единства</h2>
          <div className="w-24 h-[1px] bg-brand-pink mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-brand-brown/60 leading-relaxed font-light italic">
            Тепло наших встреч, запечатленное в кадрах. Каждая деталь создана для вашего вдохновения и покоя.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={`relative overflow-hidden rounded-[3rem] shadow-xl group ${photo.span}`}
            >
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EventDetail = () => {
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === id);

  if (!event) return <div>Событие не найдено</div>;
  const eventTitleClean = event.title.replace(/<br\s*\/?>/gi, '');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-40 px-6"
    >
      <SEO 
        title={eventTitleClean} 
        description={event.description} 
        keywords={`${event.category}, ${eventTitleClean}, женские встречи спб, практики для женщин`}
      />
      <div className="max-w-7xl mx-auto">
        <Link to="/events" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-pink font-bold mb-12 hover:ml-2 transition-all">
          <ChevronRight className="rotate-180" size={12} />
          Вернуться к календарю
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] uppercase tracking-widest text-brand-pink font-bold">{event.category}</span>
                <span className="w-8 h-[1px] bg-brand-pink/20" />
                <span className="text-[10px] uppercase tracking-widest text-brand-brown/60 italic">{event.date} / {event.time}</span>
              </div>
              <h1 className="text-5xl md:text-7xl serif-light text-brand-ink mb-12 leading-[1.1]" dangerouslySetInnerHTML={{ __html: event.title }} />
              
              <div className="glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] space-y-8 md:space-y-10 border-brand-pink/10 shadow-2xl shadow-brand-brown/5 mb-16">
                <div className="flex items-start gap-4 md:gap-6">
                  <Calendar className="text-brand-pink shrink-0" size={24} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-brown font-bold mb-2">Дата и время</h4>
                    <p className="serif-light text-lg md:text-xl text-brand-ink">{event.date}, в {event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-6">
                  <MapPin className="text-brand-pink shrink-0" size={24} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-brown font-bold mb-2">Место встречи</h4>
                    <p className="serif-light text-lg md:text-xl text-brand-ink">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-6">
                  <Clock className="text-brand-pink shrink-0" size={24} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-brown font-bold mb-2">Длительность</h4>
                    <p className="serif-light text-lg md:text-xl text-brand-ink">{event.duration}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 text-lg text-brand-brown/80 leading-relaxed font-light whitespace-pre-line">
                <p>{event.longDescription}</p>
                
                {event.program && (
                  <div className="pt-12">
                    <h4 className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-8">Программа встречи</h4>
                    <div className="grid gap-4">
                      {event.program.map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-6 p-6 rounded-3xl bg-brand-pink/5 border border-brand-pink/5 group hover:bg-brand-pink/10 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink font-display italic text-lg shadow-sm shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-brand-brown font-light italic">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-8 border-l-2 border-brand-pink/30 bg-brand-pink/5 italic serif-light">
                  Мы создали этот опыт, чтобы вы могли полностью отключиться от внешнего шума. Телефон лучше оставить в сумке — мы позаботимся о ваших впечатлениях.
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-16">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="aspect-[3/4] md:aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-brand-pink/10"
            >
              <h4 className="text-[10px] uppercase tracking-widest text-brand-brown font-bold mb-8 text-center">Ведущая встречи</h4>
              <div className="flex flex-col items-center mb-10">
                <div className="relative mb-6">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-brand-pink/20 shadow-2xl bg-brand-milky">
                    <img 
                      src={event.host.image} 
                      alt={event.host.name} 
                      className="w-full h-full object-cover object-top scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-md">
                    <Heart size={14} className="text-brand-pink fill-brand-pink" />
                  </div>
                </div>
                <div className="text-center">
                  <h5 className="text-3xl font-display italic text-brand-ink mb-1">{event.host.name}</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-pink">{event.host.role}</p>
                </div>
              </div>
              <p className="text-brand-brown/70 italic serif-light text-base leading-relaxed mb-8">
                {event.host.bio}
              </p>
              <div className="pt-8 border-t border-brand-pink/10">
                <div className="flex justify-between items-center mb-8">
                   <div className="text-sm uppercase tracking-widest text-brand-brown font-bold">Стоимость участия</div>
                   <div className="text-3xl serif-light text-brand-ink whitespace-nowrap">{event.price}</div>
                </div>
                <Link 
                  to={`/checkout/${event.id}`}
                  className="w-full bg-brand-pink text-white py-5 rounded-full font-bold text-lg hover:bg-brand-brown transition-colors shadow-xl shadow-brand-brown/20 flex items-center justify-center"
                >
                  Купить билет
                </Link>
                {event.capacityLabel && (
                  <p className="text-center text-[10px] text-brand-brown/40 uppercase tracking-widest mt-6">
                    {event.capacityLabel}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-brand-pink/10 bg-brand-milky">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="max-w-sm space-y-8">
          <Link to="/" className="block">
             <BrandLogo className="text-3xl mb-4" />
          </Link>
          <p className="text-brand-brown/60 text-sm leading-relaxed italic font-light">
            Пространство тихой роскоши и возвращения к своей истинной природе. Санкт-Петербург. 
          </p>
          <div className="flex gap-6">
            <a href="https://t.me/AnnaZverkovaWeb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-pink/20 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-white transition-all group">
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 flex-grow">
          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-brand-pink">Меню</h5>
            <ul className="space-y-4 text-sm text-brand-brown/80 font-light">
              <li><Link to="/about">О проекте</Link></li>
              <li><Link to="/gallery">Фотогалерея</Link></li>
              <li><Link to="/events">Календарь</Link></li>
              <li><a href="/#types">Форматы</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-brand-pink">Инфо</h5>
            <ul className="space-y-4 text-sm text-brand-brown/80 font-light">
              <li><Link to="/offer">Оферта</Link></li>
              <li><Link to="/privacy">Конфиденциальность</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-6">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-brand-pink">Наш Telegram</h5>
            <div className="bg-brand-pink/5 p-8 rounded-[2rem] border border-brand-pink/10">
              <p className="text-sm italic font-light text-brand-brown/80 leading-relaxed mb-6">
                Подпишитесь, чтобы узнавать о новых встречах первыми.
              </p>
              <a 
                href="https://t.me/AnnaZverkovaWeb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-pink font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
              >
                Подписаться <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-brand-pink/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-[0.3em] text-brand-brown/40">© 2026 Живая Женщина. Дизайн с душой.</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-brand-brown/30 font-medium">ИП Зверкова Анна Андреевна</p>
        </div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-brand-brown/40">Спб, ул. Итальянская, 12</p>
      </div>
    </footer>
  );
};

const AboutPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-60"
    >
      <SEO 
        title="О проекте" 
        description="Узнайте больше об истории создания проекта Живая Женщина и его основательнице Анне Зверковой." 
      />
      {/* Hero Section */}
      <section className="px-6 mb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-8">История создания</span>
              <h1 className="text-5xl md:text-7xl serif-light leading-tight text-brand-ink mb-12">
                Как родилось <br />
                пространство <span className="italic">тишины</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-brown/70 serif-light italic leading-relaxed max-w-lg mb-12">
                «Живая женщина» родилась из моего личного запроса — на тишину, паузу и возвращение к себе.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group shadow-2xl shadow-brand-brown/10"
            >
              <img 
                src="/anna2.jpg" 
                alt="Пространство" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-pink/5 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="px-6 mb-60 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-pink/10 -z-10" />
        
        <div className="max-w-4xl mx-auto bg-brand-milky px-6 py-16 md:p-32 rounded-[3.5rem] md:rounded-[4rem] shadow-sm border border-brand-pink/5 relative z-10">
          <div className="prose prose-base md:prose-xl prose-stone mx-auto text-left">
            <p className="serif-light text-xl md:text-3xl text-brand-ink leading-relaxed mb-12 italic">
              Имея сына школьника, годовалую малышку, 2-х собак джек расселов, мужа и собственную компанию по производству постельного белья из эвкалипта, я стала забывать о себе.
            </p>
            <p className="text-base md:text-xl text-brand-brown/80 font-light leading-relaxed mb-12">
              Какую еду я люблю? Какие фильмы хочу смотреть я? Что для меня отдых и удовольствие сейчас — а не то, что было в 20 лет?
            </p>
            <p className="text-base md:text-xl text-brand-brown/80 font-light leading-relaxed mb-12">
              После вторых родов пришлось выстроить дисциплину и график дома. Быт, дети, муж, сотрудники и клиенты. Если я вылетала или заболевала, всё ломалось. Я стала думать: как увеличить мою энергию, желание жить, развиваться в радости?
            </p>
            
            <div className="my-16 md:my-24 flex justify-center">
              <WomanSilhouette className="w-12 h-12 md:w-16 md:h-16 text-brand-pink/50" />
            </div>

            <h3 className="text-2xl md:text-4xl serif-light text-brand-ink mb-10 italic">Моё время</h3>
            <p className="text-base md:text-xl text-brand-brown/80 font-light leading-relaxed mb-12">
              И я стала сбегать из дома. Сначала на 30 минут, затем на час. Когда дочке исполнился год, я первый раз заснула в отеле одна, без всех. Какой же это был кайф. После этого я внесла время на себя одну в своё еженедельное расписание.
            </p>
            <p className="text-base md:text-xl text-brand-brown/80 font-medium leading-relaxed mb-12 italic text-brand-pink">
              Счастливая, наполненная мама — счастливы все в семье. <br /> Теперь 2 часа в неделю — моё законное время, когда я наполняюсь.
            </p>
            <p className="text-lg md:text-2xl text-brand-ink serif-light italic leading-relaxed">
              Приглашаю вас разделить мою радость. Где тебе не нужно становиться лучше. Достаточно остановиться и услышать себя.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 mb-60">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Остановка', 
                text: 'Мы не бежим за результатом. Мы находим ресурс в самом процессе замедления.' 
              },
              { 
                title: 'Честность', 
                text: 'В тишине невозможно обмануть себя. Мы создаем условия для этого важного разговора.' 
              },
              { 
                title: 'Эстетика', 
                text: 'Красота — это тоже терапия. Особняки, запахи и свет лечат душу.' 
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass p-12 rounded-[3.5rem] border-brand-pink/10 hover:shadow-xl transition-shadow"
              >
                <h4 className="text-2xl serif-light italic text-brand-ink mb-6">{value.title}</h4>
                <p className="text-brand-brown/60 font-light leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-40 bg-brand-brown text-white/90 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-3xl md:text-5xl serif-light italic leading-tight mb-12">
            «Главная цель — чтобы каждая женщина унесла с собой состояние покоя, которое останется с ней надолго».
          </blockquote>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
        </div>
      </section>
    </motion.div>
  );
};

const GalleryPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-40 px-6"
    >
      <SEO 
        title="Фотогалерея" 
        description="Посмотрите фотографии наших атмосферных встреч, практик и девичников в Санкт-Петербурге." 
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-4">Атмосфера</span>
          <h1 className="text-4xl md:text-6xl serif-light text-brand-ink">Наша Фотогалерея</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {/* Upload Placeholder for owner */}
          <div className="aspect-square rounded-[2rem] border-2 border-dashed border-brand-pink/20 flex flex-col items-center justify-center text-brand-brown/40 hover:bg-brand-pink/5 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-brand-pink" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Добавить фото</span>
          </div>

          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-[2rem] overflow-hidden shadow-xl shadow-brand-brown/5 group"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-40 pt-20 border-t border-brand-pink/10 max-w-2xl">
          <p className="text-brand-brown/60 italic font-light leading-relaxed">
            Здесь мы сохраняем моменты тишины, искренних улыбок и глубоких осознаний. Каждое фото — это маленькая история о возвращении к себе.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-40 px-6"
    >
      <SEO 
        title="Календарь встреч" 
        description="Анонсы предстоящих женских встреч, практик и девичников в Санкт-Петербурге. Выберите время для себя." 
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-pink font-bold block mb-4">Наши встречи</span>
          <h1 className="text-4xl md:text-6xl serif-light text-brand-ink">Выбери время для себя</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {EVENTS.map((event) => (
            <motion.div 
              key={event.id}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/event/${event.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] mb-8 shadow-xl shadow-brand-brown/5">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 glass px-5 py-2 rounded-full text-xs tracking-widest uppercase text-brand-ink">
                    {event.date}
                  </div>
                </div>
                <div className="space-y-4 px-4">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-brand-brown/60">
                    <span className="text-brand-pink">•</span>
                    {event.category}
                  </div>
                  <h3 className="text-2xl serif-light group-hover:text-brand-pink transition-colors" dangerouslySetInnerHTML={{ __html: event.title }} />
                  <p className="text-base text-brand-brown/50 line-clamp-2 leading-relaxed">{event.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-brand-pink/10 text-brand-ink font-medium">
                    <span className="whitespace-nowrap">{event.price}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-all text-brand-pink" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SEO Text Block */}
        <div className="mt-40 pt-20 border-t border-brand-pink/10 max-w-4xl">
          <h2 className="text-2xl serif-light text-brand-ink mb-8">О встречах проекта «Живая Женщина» в Санкт-Петербурге</h2>
          <div className="text-brand-brown/60 text-sm leading-relaxed space-y-6 font-light">
            <p>
              Проект «Живая Женщина» — это уникальное пространство в Санкт-Петербурге, объединяющее осознанных женщин для совместных практик, психологических встреч и телесного развития. Наши мероприятия проходят в исторических особняках и атмосферных студиях города, создавая идеальные условия для глубокого погружения в свое состояние.
            </p>
            <p>
              Мы предлагаем занятия пилатесом, женской йогой, психологические тренинги и арт-терапию. Каждая встреча — это шаг к обретению внутренней гармонии, уверенности и радости жизни. Присоединяйтесь к нашему женскому клубу, чтобы найти единомышленниц и время для самой важной встречи — встречи с собой.
            </p>
            <p>
              Наши девичники в СПб — это не просто отдых, а бережная работа с состоянием. Мы верим, что в каждой женщине скрыт источник неисчерпаемой энергии, и помогаем его раскрыть через тишину, движение и искреннее общение.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CheckoutPage = () => {
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === id);
  const [formData, setFormData] = useState({ name: '', phone: '', telegram: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentError('');

    try {
      const cleanTitle = event.title.replace(/<br\s*\/?>/gi, '');
      const priceValue = parseInt(event.price.replace(/[^\d]/g, '')) || 0;
      const amountKopeks = priceValue * 100; // Т-Банк принимает в копейках
      const orderId = `LW-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      const response = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: amountKopeks,
          description: `Билет: ${cleanTitle}`.substring(0, 140),
          customerName: formData.name,
          customerPhone: formData.phone,
          customerTelegram: formData.telegram,
          eventId: event.id,
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Редирект на страницу оплаты Т-Банка
        window.location.href = data.paymentUrl;
      } else {
        setPaymentError(data.error || 'Ошибка при создании платежа. Попробуйте ещё раз.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Не удалось подключиться к платёжной системе. Проверьте интернет.');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-40 px-6 min-h-screen bg-brand-milky/30"
    >
      <SEO title="Оформление участия" />
      <div className="max-w-5xl mx-auto">
        <Link to={`/event/${event.id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-pink font-bold mb-12 hover:ml-2 transition-all">
          <ChevronRight className="rotate-180" size={12} />
          Вернуться к описанию встречи
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Order Summary */}
          <div className="order-1 lg:order-1 space-y-8">
            <div className="glass p-8 md:p-12 rounded-[3rem] border-brand-pink/10 shadow-xl shadow-brand-brown/5">
              <h1 className="text-3xl serif-light text-brand-ink mb-8">Ваше участие</h1>
              <div className="flex gap-6 mb-8 pb-8 border-b border-brand-pink/10">
                <div className="w-24 h-32 rounded-2xl overflow-hidden shadow-md">
                  <img src={event.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-brand-pink font-bold mb-2">{event.category}</div>
                  <h3 className="text-xl serif-light text-brand-ink mb-2" dangerouslySetInnerHTML={{ __html: event.title }} />
                  <div className="text-sm text-brand-brown/60">{event.date} в {event.time}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-brand-brown/60">
                  <span>Участие (1 чел.)</span>
                  <span className="whitespace-nowrap">{event.price}</span>
                </div>
                <div className="pt-4 border-t border-brand-pink/10 flex justify-between items-center text-xl text-brand-ink">
                  <span className="serif-light">Итого к оплате</span>
                  <span className="font-medium whitespace-nowrap">{event.price}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-brand-brown/40 text-center px-8 hidden lg:block">
              Нажимая кнопку «Оплатить», вы соглашаетесь с условиями <Link to="/offer" className="underline">Публичной оферты</Link> и <Link to="/privacy" className="underline">Политикой конфиденциальности</Link>.
            </p>
          </div>

          {/* Form */}
          <div className="order-2 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 mb-3 ml-4">Ваше имя</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Как к вам обращаться?"
                    className="w-full bg-white border border-brand-pink/10 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 mb-3 ml-4">Телефон</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white border border-brand-pink/10 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-all"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown/60 mb-3 ml-4">Ваш Telegram</label>
                  <input 
                    required
                    type="text" 
                    placeholder="@username"
                    className="w-full bg-white border border-brand-pink/10 rounded-full px-8 py-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-all"
                    value={formData.telegram}
                    onChange={e => setFormData({...formData, telegram: e.target.value})}
                  />
                </div>
              </div>

              {paymentError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                  {paymentError}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-pink text-white py-5 rounded-full font-medium shadow-xl shadow-brand-pink/20 hover:bg-brand-brown transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <span>Оплатить участие</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-xs text-brand-brown/40 text-center px-8 lg:hidden">
                Нажимая кнопку «Оплатить», вы соглашаетесь с условиями <Link to="/offer" className="underline">Публичной оферты</Link> и <Link to="/privacy" className="underline">Политикой конфиденциальности</Link>.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-xs text-brand-brown/30">
                <div className="flex gap-1 italic">
                  <Heart size={10} className="fill-current" />
                  <span>Безопасная оплата</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-current" />
                <span>Защита данных</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SuccessPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-40 px-6 flex items-center justify-center text-center"
    >
      <SEO title="До встречи!" />
      <div className="max-w-2xl px-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-24 h-24 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-12"
        >
          <Heart size={40} className="text-brand-pink fill-brand-pink" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl serif-light text-brand-ink mb-8">Место забронировано</h1>
        <p className="text-xl text-brand-brown/70 serif-light leading-relaxed mb-12">
          Благодарю за доверие. В ближайшее время в Telegram вам придет подтверждение и детали встречи.
        </p>
        
        <div className="space-y-6 flex flex-col items-center">
          <Link 
            to="/" 
            className="inline-block bg-brand-brown text-white px-12 py-4 rounded-full hover:bg-brand-ink transition-all shadow-lg w-full max-w-xs"
          >
            На главную
          </Link>
          <Link 
            to="/events" 
            className="inline-block border border-brand-pink text-brand-pink px-12 py-4 rounded-full hover:bg-brand-pink hover:text-white transition-all w-full max-w-xs"
          >
            К календарю встреч
          </Link>
          <div className="block pt-8 text-sm text-brand-brown/40 italic font-light">
            Это будет прекрасное время для тебя.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PrivacyPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-40 px-6"
    >
      <div className="max-w-4xl mx-auto prose prose-stone prose-sm md:prose-base bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-brand-pink/5">
        <h1 className="text-3xl md:text-4xl serif-light text-brand-ink mb-12">Политика конфиденциальности</h1>
        
        <div className="space-y-8 text-brand-brown/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">1. Общие положения</h2>
            <p>1.1. Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые проектом «Живая Женщина» (далее — Оператор).</p>
            <p>1.2. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">2. Персональные данные, которые мы обрабатываем</h2>
            <p>2.1. Фамилия, имя, отчество;</p>
            <p>2.2. Номер телефона;</p>
            <p>2.3. Адрес электронной почты;</p>
            <p>2.4. Ссылка на профиль в социальных сетях (по желанию Заказчика);</p>
            <p>2.5. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">3. Цели обработки персональных данных</h2>
            <p>3.1. Информирование Пользователя посредством отправки электронных писем или сообщений в мессенджерах;</p>
            <p>3.2. Заключение, исполнение и прекращение гражданско-правовых договоров;</p>
            <p>3.3. Предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте;</p>
            <p>3.4. Уточнение деталей бронирования на мероприятия проекта.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">4. Правовые основания обработки</h2>
            <p>4.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы на сайте или при личном общении.</p>
            <p>4.2. Осуществляя действия по заполнению форм, Пользователь выражает свое согласие с данной Политикой.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">5. Порядок сбора, хранения, передачи и других видов обработки</h2>
            <p>5.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
            <p>5.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">6. Срок обработки</h2>
            <p>6.1. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление через Telegram.</p>
          </section>

          <section className="pt-12 border-t border-brand-pink/10">
            <h2 className="text-xl font-medium text-brand-ink mb-4">7. Заключительные положения</h2>
            <p>7.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору.</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const OfferPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-40 px-6"
    >
      <div className="max-w-4xl mx-auto prose prose-stone prose-sm md:prose-base bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-brand-pink/5">
        <h1 className="text-3xl md:text-4xl serif-light text-brand-ink mb-12">Публичная оферта на оказание услуг</h1>
        
        <div className="space-y-8 text-brand-brown/80 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">1. Общие положения</h2>
            <p>1.1. Настоящий документ является публичной офертой (далее — «Оферта») проекта «Живая Женщина» (далее — «Исполнитель») и содержит все существенные условия договора по оказанию услуг по организации и проведению досуговых мероприятий, психологических консультаций и телесных практик.</p>
            <p>1.2. В соответствии с пунктом 2 статьи 437 Гражданского Кодекса Российской Федерации (ГК РФ), в случае принятия изложенных ниже условий и оплаты услуг, лицо, производящее акцепт данной Оферты, становится Заказчиком.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">2. Предмет Оферты</h2>
            <p>2.1. Исполнитель обязуется оказать услуги по организации проведения мероприятий (встреч), а Заказчик обязуется оплатить эти услуги в соответствии с условиями настоящей Оферты.</p>
            <p>2.2. Полный перечень мероприятий, их стоимость, даты и место проведения указаны на официальном сайте проекта.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">3. Акцепт Оферты и заключение договора</h2>
            <p>3.1. Акцептом настоящей Оферты является полная или частичная (в случае предусмотренной предоплаты) оплата услуг Заказчиком.</p>
            <p>3.2. Осуществляя оплату, Заказчик подтверждает, что он ознакомлен и согласен со всеми условиями настоящей Оферты, а также правилами участия в мероприятиях.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">4. Условия оказания услуг</h2>
            <p>4.1. Исполнитель имеет право привлекать третьих лиц (приглашенных экспертов, хостов) для оказания услуг.</p>
            <p>4.2. Заказчик обязуется соблюдать правила поведения на мероприятиях, уважительно относиться к другим участникам и организаторам.</p>
            <p>4.3. На мероприятиях может проводиться фото- и видеосъемка. Осуществляя акцепт Оферты, Заказчик дает согласие на использование своего изображения в маркетинговых материалах проекта.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">5. Порядок оплаты и возврата денежных средств</h2>
            <p>5.1. Стоимость услуг указана в рублях РФ и не облагается НДС в связи с применением специального налогового режима.</p>
            <p>5.2. При отказе Заказчика от услуги менее чем за 48 часов до начала мероприятия, денежные средства могут быть удержаны в размере фактических затрат Исполнителя на организацию (аренда, материалы и т.д.).</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-brand-ink mb-4">6. Ответственность сторон</h2>
            <p>6.1. За неисполнение или ненадлежащее исполнение обязательств по настоящей Оферте Стороны несут ответственность в соответствии с действующим законодательством РФ.</p>
            <p>6.2. Исполнитель не несет ответственности за состояние здоровья Заказчика во время практик, если Заказчик не уведомил о противопоказаниях.</p>
          </section>

          <section className="pt-12 border-t border-brand-pink/10">
            <h2 className="text-xl font-medium text-brand-ink mb-4">7. Реквизиты Исполнителя</h2>
            <div className="text-sm space-y-2 text-brand-brown/70 italic">
              <p>Исполнитель: ИП Зверкова Анна Андреевна</p>
              <p>ИНН: ________________ (указать ваш ИНН)</p>
              <p>ОГРНИП: _______________ (указать ваш ОГРНИП)</p>
              <p>Служба поддержки: @AnnaZverkovaWeb</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO />
      <Header />
      <AboutSection />
      <EventCalendar />
      <IntroPowerSection />
      <FormatsSection />
      
      {/* Final CTA */}
      <section className="py-60 px-6 relative overflow-hidden text-center bg-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-brand-pink/0 to-brand-pink/30" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-4xl md:text-6xl serif-light mb-12 text-brand-ink leading-tight">
              Тебе не нужно становиться лучше. <br className="hidden md:block" /> Достаточно <span className="italic">остановиться</span>.
            </h2>
            <div className="w-16 h-[1px] bg-brand-pink/20 mx-auto mb-12" />
            <p className="text-xl md:text-2xl text-brand-brown/70 serif-light italic leading-relaxed mb-20 max-w-3xl mx-auto">
              Иногда всё, что нам нужно — это немного тишины, внимания и времени для себя. 
              И в этом состоянии начинает возвращаться энергия, желания и вкус к жизни.
            </p>
            
            <a 
              href="https://t.me/AnnaZverkovaWeb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex flex-col items-center gap-4 focus:outline-none"
              >
                <div className="px-16 py-7 bg-brand-pink text-white rounded-full font-bold text-lg hover:bg-brand-brown transition-all shadow-2xl shadow-brand-pink/20 uppercase tracking-[0.2em] relative z-10">
                  Подписаться на наш телеграм
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-pink font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  Больше вдохновения и анонсов
                </span>
              </motion.button>
            </a>
          </motion.div>
        </div>
        
        {/* Soft atmospheric glows */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-pink/5 blur-[100px] rounded-full" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-pink/5 blur-[100px] rounded-full" />
      </section>
    </motion.div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-brand-pink selection:text-white">
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/offer" element={<OfferPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
          <Footer />
          
          {/* Floating Telegram Button */}
          <motion.a
            href="https://t.me/AnnaZverkovaWeb"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Наш Telegram-канал"
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-brand-pink text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:bg-brand-brown"
          >
            <Send size={24} />
          </motion.a>
        </div>
      </Router>
    </HelmetProvider>
  );
}
