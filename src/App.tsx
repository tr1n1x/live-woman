/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Build version: 1.0.3 - Fixed assets and SVG
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
  Plus,
  Target,
  CarFront,
  Sparkles,
  Music
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';

// --- Asset Imports ---
import heroImg from './assets/hero.jpg';
import hero2Img from './assets/hero2.png';
import annaImg from './assets/anna.jpg';
import anna2Img from './assets/anna2.jpg';
import iraImg from './assets/ira.jpg';
import yanaImg from './assets/yana.jpg';
import visit1Img from './assets/visit1.jpg';
import visit2Img from './assets/visit2.jpg';
import visit3Img from './assets/visit3.jpg';
import golfImg from './assets/golf.jpg';
import stileImg from './assets/stile.jpg';
import juliyaImg from './assets/juliyaivanova.jpg';
import dishesImg from './assets/dishes.jpg';
import yachtImg from './assets/yacht.jpg';
import poolsImg from './assets/pools.jpg';
import detoxImg from './assets/detox.jpg';
import horsesImg from './assets/horses.jpg';
import womanImg from './assets/woman.jpg';
import gunsImg from './assets/guns.jpg';
import bmwImg from './assets/bmw.jpg';
import makeupImg from './assets/makeup.jpg';
import stripImg from './assets/strip.jpg';

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
    image: visit1Img,
    price: '3 100 ₽',
    category: 'Телесные практики',
    host: {
      name: 'Яна Маркина',
      role: 'тренер групповых программ',
      image: yanaImg,
      bio: 'Работает с телом через понимание его структуры и взаимосвязей. Её занятия — это внимательное движение без перегрузки, где тело постепенно раскрывается и начинает «отзываться». После практики остаётся ощущение лёгкости, собранности и внутреннего спокойствия'
    },
    capacityLabel: 'Всего 25 мест',
    program: [
      'Мягкая практика в тишине особняка',
      'Возвращение к ощущениям тела',
      'Расслабление и отпускание напряжения',
      'Небольшая фото- и видеосъемка на память'
    ]
  },
  {
    id: '2',
    title: 'Психологическая практика «Встреча с собой»',
    date: '27 мая',
    time: '12:00',
    duration: '3 часа',
    location: '16place (16place.ru)',
    description: 'Возможность остановиться и посмотреть на себя чуть глубже',
    longDescription: 'Мы будем работать с тем, что обычно остаётся фоном: чувства, реакции, внутренние состояния. Без спешки и без правильных ответов. Ты много делаешь, справляешься, но в какой-то момент перестаёшь понимать — а что я чувствую? Эта практика — возможность вернуться к себе и услышать то, что давно отложено «на потом».\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: visit2Img,
    price: '2 900 ₽',
    category: 'Психология',
    host: {
      name: 'Ирина Кобелева',
      role: 'дипломированный психолог',
      image: iraImg,
      bio: 'Работает в интегративном подходе, соединяя разные направления психотерапии. Создаёт пространство, в котором можно спокойно исследовать себя и находить свои ответы.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Мягкое погружение в практику',
      'Групповая работа с психологом',
      'Индивидуальные инсайты и ответы',
      'Фото- и видеосъемка на память'
    ]
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
    image: visit3Img,
    price: '5 500 ₽',
    category: 'SPA и ритуалы',
    host: {
      name: 'Анна Зверкова',
      role: 'мастер ритуалов и игропрактик',
      image: annaImg,
      bio: 'Помогаю женщинам восстановить связь со своей природной красотой через бережные ритуалы и глубокие практики.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'тёплая вода и мягкое погружение в состояние',
      'сауны и хамам с ароматами и вниманием к телу',
      'время без спешки и задач',
      'чай, лёгкое общение и практика с МАК-картами',
      'Фото- и видеосъемка ваших моментов релакса'
    ]
  },
  {
    id: '4',
    title: 'Гольф: аристократизм <br /> и фокус',
    date: '9 июня',
    time: '12:00',
    duration: '3 часа',
    location: 'Загородный клуб (уточняется)',
    description: 'Знакомство с самым элегантным видом спорта. Учимся попадать в цель без суеты и лишних движений.',
    longDescription: 'Гольф — это не просто спорт, это философия концентрации и внутренней тишины. \n\nВ атмосфере аристократизма и спокойствия мы сделаем первые шаги на безупречном газоне. \n\nЭто практика фокуса: когда каждое движение выверено, а лишнее напряжение уходит. \n\nПосле игры нас ждет бранч на террасе, где в кругу единомышленниц мы поделимся впечатлениями и просто насладимся загородным воздухом.',
    image: golfImg,
    price: 'Уточняется',
    category: 'Спорт и стиль',
    host: {
      name: 'Секретный гость',
      role: 'Мастер спорта',
      image: 'SECRET',
      bio: 'Вас ждет встреча с профессиональным тренером, который влюблен в гольф и знает, как передать эту страсть и научить основам игры с нуля.'
    },
    capacityLabel: 'Всего 12 мест',
    program: [
      'Основы техники и этикета игры в гольф',
      'Практика на поле под руководством профи',
      'Элегантный бранч на террасе',
      'Общение в атмосфере загородного релакса',
      'Профессиональная фото- и видеосъемка'
    ]
  },
  {
    id: '5',
    title: 'Формула дорогого <br /> образа',
    date: '16 июня',
    time: '12:00',
    duration: '3 часа',
    location: 'Студия стиля (уточняется)',
    description: 'Секреты стилистов и магия деталей. Учимся выглядеть безупречно без лишних усилий.',
    longDescription: 'Встреча-интенсив для тех, кто хочет управлять впечатлением о себе через одежду. \n\nМы разберем, как из простых базовых вещей собирать сложные, запоминающиеся образы, которые хочется рассматривать. \n\nЭто не просто про одежду — это про состояние уверенности, которое дает правильно подобранный образ.',
    image: stileImg,
    price: 'Уточняется',
    category: 'Стиль и имидж',
    host: {
      name: 'Юлия Иванова',
      role: 'Эксперт по визуальной коммуникации',
      image: juliyaImg,
      bio: 'Стилист с многолетним стажем, работающий с первыми лицами бизнеса. Мастер создания «дорогого» минимализма и капсул, которые подчеркивают статус. Юлия верит, что одежда — это кратчайший путь к самопознанию и способ заявить о себе миру без слов.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Разбор «типы фигуры + крой»: идеальная посадка',
      'Магия аксессуаров: как один акцент меняет всё',
      'Секреты визуально «дорогого» монохрома',
      'Твой личный акцент: создание уникального стиля',
      'Фото- и видеосъемка вашего нового образа'
    ]
  },
  {
    id: '6',
    title: 'Искусство этикета: <br /> красота в каждом жесте',
    date: '23 июня',
    time: '12:00',
    duration: '2 часа',
    location: 'Исторический ресторан (уточняется)',
    description: 'Встреча с искусствоведом в изысканном интерьере. Учимся превращать обычный ужин в акт любви к себе.',
    longDescription: 'Красота за столом — это не только о правильном положении вилки, но и об отношении к себе и окружающим. \n\nВ изысканной атмосфере мы разберем основы светского этикета, которые дают ту самую уверенность и легкость в любом обществе. \n\nВы узнаете секреты Pinterest-сервировки и как создавать магию из привычных вещей. \n\nЗавершим нашу встречу ужином с историей, где обсудим традиции гостеприимства и эстетики.',
    image: dishesImg,
    price: 'Уточняется',
    category: 'Этикет и эстетика',
    host: {
      name: 'Секретный гость',
      role: 'Искусствовед',
      image: 'SECRET',
      bio: 'Вас ждет встреча с экспертом, который влюблен в историю и знает всё о том, как эстетика меняет повседневную жизнь.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Секреты Pinterest-сервировки: как создавать красоту',
      'Светский этикет: уверенность и грация за столом',
      'Ужин с историей: обсуждение традиций и эстетики',
      'Практика в изысканном интерьере ресторана',
      'Эстетичная фото- и видеосъемка вечера'
    ]
  },
  {
    id: '7',
    title: 'Яхтинг под парусами: <br /> Ветер, Свобода и Баланс',
    date: '30 июня',
    time: '12:00',
    duration: '3 часа',
    location: 'Яхт-клуб (уточняется)',
    description: 'Выход в Финский залив под белоснежным парусом. Формат для тех, кто мечтает ощутить драйв и умиротворение.',
    longDescription: 'Выход в Финский залив под белоснежным парусом — это лучший способ почувствовать масштаб жизни. \n\nМы создали этот формат специально для тех, кто никогда не стоял у штурвала, но мечтает ощутить драйв и умиротворение открытой воды. \n\nЭто день, когда город остается далеко на берегу, а вы остаетесь наедине со своей внутренней стихией.',
    image: yachtImg,
    price: 'Уточняется',
    category: 'Приключения и релакс',
    host: {
      name: 'Секретный капитан',
      role: 'Опытный шкипер',
      image: 'SECRET',
      bio: 'Вас ждет прогулка под руководством профессионала, который влюблен в море и научит вас чувствовать ветер.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Основы яхтинга: как устроена парусная яхта',
      'Практика на воде: попробуй себя в роли штурмана',
      'Фотосессия в стиле «Yacht Style» на палубе',
      'Фуршет с игристым под плеск волн',
      'Видеосъемка вашего морского приключения'
    ]
  },
  {
    id: '8',
    title: 'Sun & Chill: <br /> Бассейн и гриль',
    date: '7 июля',
    time: '12:00',
    duration: '4 часа',
    location: 'Загородный клуб (уточняется)',
    description: 'Перезагрузка у воды: твой идеальный летний день. Забываем о дедлайнах и городском шуме.',
    longDescription: 'Забываем о дедлайнах и городском шуме. Мы отправляемся в одну из самых красивых локаций пригорода, чтобы провести день в стиле «Dolce Vita». \n\nСолнце, освежающая вода бассейна и аромат изысканного гриля — это наш способ сказать лету «да» и наполнить себя ресурсом. \n\nЭтот день — про легальный отдых, красивый загар и вкус к жизни в каждом кусочке и каждом вдохе.',
    image: poolsImg,
    price: 'Уточняется',
    category: 'Релакс и бранч',
    host: {
      name: 'Анна Зверкова',
      role: 'Основатель проекта «Живая Женщина»',
      image: annaImg,
      bio: 'Я помогаю каждой женщине найти свой баланс между внешним и внутренним. Наш бранч у бассейна — это возможность замедлиться, почувствовать вкус жизни и восстановить внутренний ресурс в безупречной атмосфере.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Pool Day: отдых у бассейна в окружении сосен',
      'Гриль-бранч от шефа: эстетичная подача и полезный рацион',
      'Летний нетворкинг и душевные разговоры',
      'Beauty-зона: советы по уходу и безопасному загару',
      'Атмосферная фото- и видеосъемка отдыха'
    ]
  },
  {
    id: '9',
    title: 'Ресурс: Как управлять <br /> своей энергией',
    date: '14 июля',
    time: '12:00',
    duration: '2 часа',
    location: 'Лекторий (уточняется)',
    description: 'Энергия изнутри: Твой код здоровья и сияния. Узнаем, как восполнение дефицитов возвращает драйв.',
    longDescription: 'Мы привыкли инвестировать время в проекты и близких, но часто забываем о главном источнике — своем физическом ресурсе. \n\nНа этой встрече мы разберем, как восполнение дефицитов и точечные настройки организма возвращают драйв, чистоту кожи и ту легкость, которая обычно бывает только в первый день отпуска. \n\nЭто стратегия управления своей биологией, чтобы ваша энергия всегда была на пике.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: detoxImg,
    price: 'Уточняется',
    category: 'Здоровье и биохакинг',
    host: {
      name: 'Секретный гость',
      role: 'Нутрициолог / Эксперт Bioage',
      image: 'SECRET',
      bio: 'Вас ждет встреча с экспертом в области функциональной медицины, который знает, как настроить ваш организм на максимум.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Чек-лист «Женский стандарт»: список необходимых анализов 35+',
      'Разбор «Anti-age & Biohacking»: привычки, которые крадут ресурс',
      'Лаборатория микроэлементов: витамины и минералы без дефицитов',
      'Легкий healthy-перекус: энергия без тяжести',
      'Эстетичная фото- и видеосъемка лектория'
    ]
  },
  {
    id: '10',
    title: 'Ипподром: <br /> Искусство выездки',
    date: '4 августа',
    time: '12:00',
    duration: '3 часа',
    location: 'Конноспортивный клуб (уточняется)',
    description: 'Выездка: танец силы и эстетики. Погрузитесь в мир самого элегантного вида спорта.',
    longDescription: 'Погрузитесь в мир самого элегантного вида конного спорта. Выездка — это не просто прогулка, это высший уровень взаимопонимания между человеком и лошадью, где каждое движение отточено до совершенства. \n\nМы приглашаем вас в профессиональный манеж, чтобы почувствовать благородство этого спорта и обрести королевскую осанку. Это день, который подарит вам ощущение собственной силы, спокойствия и абсолютной грации.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: horsesImg,
    price: 'Уточняется',
    category: 'Спорт и эстетика',
    host: {
      name: 'Секретный гость',
      role: 'Профессиональный тренер по выездке',
      image: 'SECRET',
      bio: 'Вас ждет встреча с мастером, который научит вас тонко чувствовать лошадь и контролировать каждое движение своего тела.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Знакомство с философией выездки: «балет на лошадях»',
      'Мастер-класс на манеже: азы управления и баланса',
      'Индивидуальная работа над величественной осанкой',
      'Tea-time в гостиной клуба с видом на поле',
      'Профессиональная фото- и видеосъемка с лошадьми'
    ]
  },
  {
    id: '11',
    title: 'Твоя скрытая опора: <br /> Практики здоровья',
    date: '11 августа',
    time: '12:00',
    duration: '2 часа',
    location: 'Студия (уточняется)',
    description: 'Внутренний центр: Магия и сила мышц тазового дна. Разговор без табу о женском здоровье.',
    longDescription: 'Существует фундамент женского здоровья и сексуальности, о котором не принято говорить громко, но именно он дарит нам уверенную походку, блеск в глазах и невероятную внутреннюю энергию. \n\nМы приглашаем вас на глубокую и бережную встречу с экспертом, где мы изучим анатомию своего удовольствия и научимся управлять своей главной опорой — мышцами тазового дна.\n\nЭта встреча — ваше личное признание в любви своему телу и самый короткий путь к состоянию тотальной чувственности.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: womanImg,
    price: 'Уточняется',
    category: 'Женское здоровье',
    host: {
      name: 'Секретный гость',
      role: 'Эксперт по женскому здоровью',
      image: 'SECRET',
      bio: 'Вас ждет встреча с профессионалом, который поможет вам по-новому почувствовать свое тело и обрести внутреннюю опору.'
    },
    capacityLabel: 'Всего 20 мест',
    program: [
      'Разговор без табу: гормональный фон и качество жизни',
      'Практическая лаборатория: освоение упражнений вумбилдинга',
      'Архитектура тела: как тазовое дно меняет осанку и походку',
      'Энергетический баланс: пробуждение спящих ресурсов',
      'Небольшая фото- и видеосъемка процесса'
    ]
  },
  {
    id: '12',
    title: 'Точка фокуса: <br /> Стрельба и сила',
    date: '18 августа',
    time: '12:00',
    duration: '2 часа',
    location: 'Стрелковый клуб (уточняется)',
    description: 'Амазонка в городе: Искусство точного выстрела. Практика предельной концентрации и адреналиновый детокс.',
    longDescription: 'Иногда, чтобы услышать себя, нужно нажать на курок и услышать выстрел. Мы отправляемся в профессиональный стрелковый клуб, чтобы сменить шелк на сталь и проверить свою способность сохранять ледяное спокойствие в моменте. \n\nЭто не просто стрельба — это практика предельной концентрации, где есть только ты, цель и твое дыхание. Это день, когда ты приручаешь свой страх и превращаешь его в абсолютную уверенность.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: gunsImg,
    price: 'Уточняется',
    category: 'Самопознание и драйв',
    host: {
      name: 'Секретный гость',
      role: 'Инструктор по стрельбе',
      image: 'SECRET',
      bio: 'Вас ждет инструктаж от профессионала, который научит не просто попадать в цель, но и чувствовать свою внутреннюю опору через оружие.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Инструктаж по владению боевым оружием',
      'Практика тотального фокуса и контроля дыхания',
      'Стрельба по мишеням: адреналиновый детокс',
      'Фотосессия в стиле «Action» с оружием',
      'Видеосъемка ваших точных попаданий'
    ]
  },
  {
    id: '15',
    title: 'Пилатес в особняке Трубецких-Нарышкиных',
    date: '25 августа',
    time: '12:00',
    duration: '2 часа',
    location: 'Особняк Трубецких-Нарышкиных',
    description: 'Практика, в которой нет внешнего шума — только ты и твоё тело (повтор)',
    longDescription: 'В старинном особняке, наполненном историей, мы создадим пространство тишины и внимания к себе.\n\nМягкие практики помогут расслабиться и отпустить накопленное напряжение.\n\nПостепенно возвращается ощущение себя — спокойное и живое.\n\n*В зале будет проходить небольшая фото- и видеосъемка.*',
    image: visit1Img,
    price: 'Уточняется',
    category: 'Телесные практики',
    host: {
      name: 'Яна Маркина',
      role: 'тренер групповых программ',
      image: yanaImg,
      bio: 'Работает с телом через понимание его структуры и взаимосвязей. Её занятия — это внимательное движение без перегрузки, где тело постепенно раскрывается и начинает «отзываться».'
    },
    capacityLabel: 'Всего 25 мест',
    program: [
      'Мягкая практика в тишине особняка',
      'Возвращение к ощущениям тела',
      'Расслабление и отпускание напряжения',
      'Небольшая фото- и видеосъемка на память'
    ]
  },
  {
    id: '16',
    title: 'Спа-ритуал <br /> в Palace Bridge',
    date: '8 сентября',
    time: '12:00',
    duration: '3 часа',
    location: 'Palace Bridge, Биржевой переулок, 2-4 (Санкт-Петербург)',
    description: 'Глубокая перезагрузка в атмосфере "тихой роскоши". Обретаем внутреннюю гармонию в сердце города.',
    longDescription: 'Осень — время возвращения к своему центру. Мы приглашаем вас в Palace Bridge, чтобы смыть городской шум и наполнить себя теплом. \n\nВ программе — бережный уход за телом, созерцание и практики, которые помогают услышать свой внутренний голос. Это не просто отдых, а ритуал обретения целостности.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: visit3Img,
    price: 'Уточняется',
    category: 'SPA и ритуалы',
    host: {
      name: 'Анна Зверкова',
      role: 'мастер ритуалов и игропрактик',
      image: annaImg,
      bio: 'Помогаю женщинам восстановить связь со своей природной красотой через бережные ритуалы и глубокие практики.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Тепловая терапия: магия саун и хаммама',
      'Погружение в тишину: медитативный отдых у воды',
      'Ароматный чай и душевный нетворкинг',
      'Практика настройки на ресурс через МАК-карты',
      'Эстетичная фото- и видеосъемка вашего релакса'
    ]
  },
  {
    id: '13',
    title: 'Drive & Control: <br /> Искусство скорости',
    date: '15 сентября',
    time: '12:00',
    duration: '3 часа',
    location: 'Автодром (уточняется)',
    description: 'На грани: Твой контроль над стихией и дорогой. Тренинг устойчивости на трассе и в жизни.',
    longDescription: 'Мы привыкли держать всё под контролем, но что, если земля уходит из-под колес? Мы отправляемся на автодром, чтобы научиться не бояться заносов, а управлять ими. \n\nЭто мощный тренинг устойчивости — и на трассе, и в жизни. Ты почувствуешь, как страх превращается в азарт, а неуверенность — в техничное мастерство. \n\nЭто день, когда ты перестаешь быть пассажиром обстоятельств и становишься пилотом своей судьбы.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: bmwImg,
    price: 'Уточняется',
    category: 'Драйв и мастерство',
    host: {
      name: 'Секретный гость',
      role: 'Профессиональный автопилот',
      image: 'SECRET',
      bio: 'Вас ждет мастер-класс от эксперта по экстремальному вождению, который научит вас чувствовать автомобиль и не терять контроль в любой ситуации.'
    },
    capacityLabel: 'Всего 10 мест',
    program: [
      'Магия заноса: физика движения и стабилизация',
      'Реакция и хладнокровие: экстренные маневры',
      'Адреналиновый коктейль: власть над скоростью',
      'Style & Speed: фотосессия на гоночном треке',
      'Профессиональная видеосъемка заездов'
    ]
  },
  {
    id: '14',
    title: 'Твое свежее сияние: <br /> Макияж уверенной женщины',
    date: '22 сентября',
    time: '12:00',
    duration: '2 часа',
    location: 'Бьюти-студия (уточняется)',
    description: 'Эффект «Sun-kissed»: Свежесть курорта и идеальный макияж за 15 минут. Камерный бьюти-девичник с топ-визажистом.',
    longDescription: 'Секрет по-настоящему дорогого образа кроется в идеальной, светящейся изнутри коже и легкости исполнения. \n\nМы приглашаем вас на камерный бьюти-девичник с топ-визажистом, где вы научитесь делать роскошный макияж всего за 15 минут. Это практический мастер-класс о том, как создать эффект «только что вернулась из отпуска» в разгар рабочих будней, подчеркнуть свою природную стать и добавить тот самый магнетический акцент во взгляд.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: makeupImg,
    price: 'Уточняется',
    category: 'Красота и уход',
    host: {
      name: 'Секретный гость',
      role: 'Топ-визажист',
      image: 'SECRET',
      bio: 'Вас ждет встреча с профессионалом, который работает с глянцем и знает всё о том, как подчеркнуть вашу природную эстетику за считанные минуты.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Тайминг роскоши: идеальный макияж за 15 минут',
      'Магия «Sun-kissed»: техника создания отдохнувшего тона',
      'Искусство акцента: дневной образ в уверенный вечерний',
      'Честный разбор косметички: аудит ваших бьюти-средств',
      'Сияющая фото- и видеосъемка ваших преображений'
    ]
  },
  {
    id: '17',
    title: 'Тайный язык тела: <br /> Стрип-пластика',
    date: '29 сентября',
    time: '12:00',
    duration: '2 часа',
    location: 'Премиум-студия танца (уточняется)',
    description: 'Грация и раскрепощение: Твой танец внутренней свободы. Снимаем мышечные зажимы и разговариваем на языке абсолютной грации.',
    longDescription: 'Мы привыкли держать лицо, держать спину ровно и соответствовать статусу. Но где во всем этом живет наша плавная, дикая и притягательная женственность? \n\nСтрип-пластика — это танец не для зрителя, это танец для себя. В полумраке премиальной студии мы будем учиться отпускать социальные рамки, снимать мышечные зажимы и разговаривать на языке абсолютной грации. \n\nЭто практика, после которой ваше тело зазвучит как дорогой музыкальный инструмент. Это день, когда вы разрешаете себе быть любой: дерзкой, нежной, страстной и бесконечно красивой.\n\n*На встрече будет проходить небольшая фото- и видеосъемка.*',
    image: stripImg,
    price: 'Уточняется',
    category: 'Танцы и чувственность',
    host: {
      name: 'Секретный гость',
      role: 'Мастер стрип-пластики',
      image: 'SECRET',
      bio: 'Вас ждет встреча с профессионалом, который поможет вам отпустить контроль и научит ваше тело двигаться в ритме абсолютной женственности.'
    },
    capacityLabel: 'Всего 15 мест',
    program: [
      'Погружение в пластику: мягкая разминка и текучие движения',
      'Снятие телесных блоков: работа со скованностью и зажимами',
      'Атмосфера полного принятия: гипнотические ритмы и свет',
      'Твое новое состояние: раскрепощение и магнетическая походка',
      'Эстетичная фото- и видеосъемка вашей грации'
    ]
  }
];

const GALLERY_IMAGES = [
  { url: visit1Img, title: 'Moment 1' },
  { url: visit2Img, title: 'Moment 2' },
  { url: visit3Img, title: 'Moment 3' },
  { url: visit1Img, title: 'Moment 4' },
  { url: visit2Img, title: 'Moment 5' },
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
          {/* <Link to="/gallery" className="hover:text-brand-pink transition-colors">Галерея</Link> */}
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
            {['О проекте', 'Встречи'].map((item, i) => (
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
          src={heroImg} 
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
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-brown font-semibold">Тишина. Тело. Женщина.</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4.8rem)] serif-light leading-[1.1] mb-10 text-brand-brown">
              Твое время. <br />
              Твое тело. <br />
              Твои правила.
            </h1>
            
            <p className="text-lg md:text-xl font-light text-brand-brown/70 mb-12 max-w-xl leading-relaxed">
              Пространство, где внешняя суета останавливается, уступая место твоей внутренней силе и красоте.
              <span className="block mt-6">Живые встречи и эстетика в Санкт-Петербурге.</span>
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
                  src={annaImg} 
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
                      <path d="M50 90C50 90 45 70 30 60C15 50 10 30 10 30C10 30 30 35 45 45C60 55 50 90 50 90Z" fillOpacity="0.2" />
                      <path d="M50 90C50 90 55 70 70 60C85 50 90 30 90 30C90 30 70 35 55 45C40 55 50 90 50 90Z" fillOpacity="0.2" />
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

        <div className="space-y-32">
          {[
            { month: 'Май', key: 'мая' },
            { month: 'Июнь', key: 'июня' },
            { month: 'Июль', key: 'июля' },
            { month: 'Август', key: 'августа' },
            { month: 'Сентябрь', key: 'сентября' },
          ].filter(monthGroup => 
            EVENTS.some(e => e.date.toLowerCase().includes(monthGroup.key))
          ).slice(0, 2).map((monthGroup) => {
            const monthEvents = EVENTS.filter(e => e.date.toLowerCase().includes(monthGroup.key));
            if (monthEvents.length === 0) return null;

            return (
              <div key={monthGroup.month} className="space-y-16">
                <div className="flex items-center gap-6">
                  <h3 className="text-2xl md:text-3xl serif-light text-brand-ink italic">{monthGroup.month}</h3>
                  <div className="flex-grow h-[1px] bg-brand-pink/10" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {monthEvents.map((event) => (
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
                          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase text-brand-ink shadow-sm border border-brand-pink/10">
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
            );
          })}
        </div>

        <div className="mt-28 text-center">
          <Link 
            to="/events" 
            className="inline-flex items-center gap-4 bg-brand-pink text-white px-12 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-brown transition-all shadow-2xl shadow-brand-pink/20 group"
          >
            Смотреть все встречи
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const IntroPowerSection = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      <img 
        src={hero2Img} 
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
          Внутри тебя скрыт огромный ресурс — энергия, которая может быть плавной, как вода, и дерзкой, как выстрел.<br /><br />
          За рабочими графиками, заботой о близких и бесконечными списками задач мы часто теряем контакт с этим источником, привыкая просто функционировать.<br /><br />
          Наши встречи — это повод поставить рутину на паузу. Чтобы не просто отдохнуть, а заново познакомиться с собой: настоящей, разной и бесконечно Живой.
        </p>
      </div>
    </section>
  );
};

const FormatsSection = () => {
  const formats = [
    { title: 'Отдых и Ресурс', icon: <Flower2 size={24} />, items: ['SPA-ритуалы', 'Медитации в тишине', 'Камерные бранчи'] },
    { title: 'Эстетика и Стиль', icon: <Sparkles size={20} />, items: ['Make-Up девичники', 'Имидж-коды', 'Фотосессии «Action»'] },
    { title: 'Тело и Грация', icon: <Music size={20} />, items: ['Пилатес в особняках', 'Женская йога', 'Стрип-пластика'] },
    { title: 'Драйв и Сила', icon: <Target size={20} />, items: ['Стрелковый клуб', 'Экстремальное вождение', 'Конный спорт'] },
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
    { src: visit1Img, alt: 'Moment 1', span: 'md:col-span-2 md:row-span-2' },
    { src: visit2Img, alt: 'Moment 2', span: 'md:col-span-1 md:row-span-1' },
    { src: visit3Img, alt: 'Moment 3', span: 'md:col-span-1 md:row-span-1' },
    { src: visit1Img, alt: 'Moment 4', span: 'md:col-span-1 md:row-span-2' },
    { src: visit2Img, alt: 'Moment 5', span: 'md:col-span-2 md:row-span-2' },
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
      <div className="max-w-7xl mx-auto overflow-hidden">
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
              <h1 className="text-3xl sm:text-5xl md:text-7xl serif-light text-brand-ink mb-12 leading-[1.1] break-words" dangerouslySetInnerHTML={{ __html: event.title }} />
              
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
                          className="flex items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 rounded-3xl bg-brand-pink/5 border border-brand-pink/5 group hover:bg-brand-pink/10 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink font-display italic text-lg shadow-sm shrink-0 mt-1 md:mt-0">
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
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-brand-pink/20 shadow-2xl bg-brand-milky flex items-center justify-center">
                    {event.host.image === 'SECRET' ? (
                      <div className="w-full h-full bg-brand-pink/5 flex items-center justify-center p-8 text-brand-pink/30">
                        <WomanSilhouette className="w-full h-full" />
                      </div>
                    ) : (
                      <img 
                        src={event.host.image} 
                        alt={event.host.name} 
                        className="w-full h-full object-cover object-top scale-110" 
                        referrerPolicy="no-referrer"
                      />
                    )}
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
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                   <div className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-brown font-bold text-center sm:text-left">Стоимость участия</div>
                   <div className="text-2xl sm:text-3xl serif-light text-brand-ink">{event.price}</div>
                </div>
                {event.price === 'Уточняется' || !event.price.includes('₽') ? (
                  <Link 
                    to={`/checkout/${event.id}`}
                    className="w-full border border-brand-pink text-brand-pink py-5 rounded-full font-bold text-lg hover:bg-brand-pink hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Чат предзаписи
                  </Link>
                ) : (
                  <Link 
                    to={`/checkout/${event.id}`}
                    className="w-full bg-brand-pink text-white py-5 rounded-full font-bold text-lg hover:bg-brand-brown transition-colors shadow-xl shadow-brand-brown/20 flex items-center justify-center"
                  >
                    Купить билет
                  </Link>
                )}
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
              {/* <li><Link to="/gallery">Фотогалерея</Link></li> */}
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
          <div className="flex flex-col gap-1 text-[9px] uppercase tracking-[0.3em] text-brand-brown/30 font-medium">
            <p>ИП Зверкова Анна Андреевна</p>
            <p>ИНН 710306810329 | ОГРНИП 317784700046787</p>
          </div>
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
                src={anna2Img} 
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

        <div className="space-y-32">
          {[
            { month: 'Май', key: 'мая' },
            { month: 'Июнь', key: 'июня' },
            { month: 'Июль', key: 'июля' },
            { month: 'Август', key: 'августа' },
            { month: 'Сентябрь', key: 'сентября' },
          ].map((monthGroup) => {
            const monthEvents = EVENTS.filter(e => e.date.toLowerCase().includes(monthGroup.key));
            if (monthEvents.length === 0) return null;

            return (
              <div key={monthGroup.month} className="space-y-16">
                <div className="flex items-center gap-6">
                  <h3 className="text-2xl md:text-4xl serif-light text-brand-ink italic">{monthGroup.month}</h3>
                  <div className="flex-grow h-[1px] bg-brand-pink/10" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {monthEvents.map((event) => (
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
                          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase text-brand-ink shadow-sm border border-brand-pink/10">
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
              </div>
            );
          })}
        </div>

        {/* SEO Text Block */}
        <div className="mt-40 pt-20 border-t border-brand-pink/10 max-w-4xl">
          <h2 className="text-2xl serif-light text-brand-ink mb-8">О проекте «Живая Женщина» в Санкт-Петербурге</h2>
          <div className="text-brand-brown/60 text-sm leading-relaxed space-y-6 font-light">
            <p>
              Проект «Живая Женщина» — это премиальное пространство в Санкт-Петербурге, где каждая встреча становится событием, меняющим масштаб вашей личности. Мы объединяем осознанных женщин для совместных практик, интеллектуальных лекториев и незабываемых впечатлений в самых атмосферных локациях города.
            </p>
            <p>
              Наша афиша мероприятий охватывает все грани современной женщины: от мягких практик пилатеса в исторических особняках до драйвовых выездов на автодром или в стрелковый тир. Мы приглашаем топовых экспертов в области биохакинга, нутрициологии, визажа и психологии, чтобы вы могли инвестировать время в свой главный ресурс — в себя.
            </p>
            <p>
              В нашем календаре вы найдете как классические SPA-ритуалы и женские бранчи, так и эксклюзивные форматы: школу верховой езды, мастер-классы по созданию «дорогого» образа и практики пробуждения чувственности через танец. Присоединяйтесь к нашему закрытому сообществу единомышленниц в СПб, чтобы обрести королевскую осанку, внутреннюю опору и то самое сияние, которое притягивает взгляды.
            </p>
            <p>
              Каждый девичник «Живая Женщина» — это эстетическое удовольствие, бережная работа с состоянием и возможность выйти за рамки привычной рутины. Мы верим, что истинная сила женщины — в её многогранности, и помогаем раскрыть каждую из них через качественный отдых, новые знания и искреннее общение.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      const cleanTitle = event.title.replace(/<br\s*\/?>/gi, ' ');
      const isPreorder = event.price === 'Уточняется' || !event.price.includes('₽');
      const priceValue = isPreorder ? 0 : (parseInt(event.price.replace(/[^\d]/g, '')) || 0);
      const amountKopeks = priceValue * 100;
      const orderId = `LW-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

      const response = await fetch('/api/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: amountKopeks,
          description: `Билет: ${cleanTitle}`.substring(0, 140),
          eventTitle: cleanTitle,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerTelegram: formData.telegram,
          eventId: event.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isPreorder) {
          // Редирект на страницу успеха для предзаписи
          navigate('/success?preorder=true');
        } else if (data.paymentUrl) {
          // Редирект на страницу оплаты Т-Банка
          window.location.href = data.paymentUrl;
        }
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
              <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-8 border-b border-brand-pink/10">
                <div className="w-full sm:w-24 h-48 sm:h-32 rounded-2xl overflow-hidden shadow-md">
                  <img src={event.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <div className="text-[10px] uppercase tracking-widest text-brand-pink font-bold mb-2 text-center sm:text-left">{event.category}</div>
                  <h3 className="text-xl serif-light text-brand-ink mb-2 text-center sm:text-left" dangerouslySetInnerHTML={{ __html: event.title }} />
                  <div className="text-sm text-brand-brown/60 text-center sm:text-left">{event.date} в {event.time}</div>
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
                    <span>{event.price === 'Уточняется' || !event.price.includes('₽') ? 'Отправить заявку' : 'Оплатить участие'}</span>
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
  const [searchParams] = React.useSearchParams();
  const orderId = searchParams.get('orderId');
  const isPreorder = searchParams.get('preorder') === 'true';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-40 px-6 flex items-center justify-center text-center"
    >
      <SEO title={isPreorder ? "Заявка принята" : "До встречи!"} />
      <div className="max-w-2xl px-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-12 shadow-inner"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Heart size={40} className="text-green-500 fill-green-500" />
          </motion.div>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl serif-light text-brand-ink mb-8">
          {isPreorder ? 'Заявка принята!' : 'Билет забронирован!'}
        </h1>
        <p className="text-lg md:text-xl text-brand-brown/70 serif-light leading-relaxed mb-12">
          {isPreorder 
            ? 'Мы получили ваш запрос. Как только откроется запись и определится стоимость, мы свяжемся с вами в Telegram.'
            : 'Ваша оплата прошла успешно. В ближайшее время в Telegram вам придет подтверждение и детали встречи.'}
        </p>
        
        <div className="space-y-6 flex flex-col items-center">
          {orderId && (
            <p className="text-xs text-brand-brown/40 mb-4 uppercase tracking-widest font-bold">
              Номер заказа: #{orderId}
            </p>
          )}

          {isPreorder && (
            <a 
              href="https://t.me/AnnaZverkovaWeb" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-pink text-white px-12 py-4 rounded-full hover:bg-brand-brown transition-all shadow-lg w-full max-w-xs"
            >
              Написать нам в TG
            </a>
          )}

          <Link 
            to="/" 
            className={`inline-block px-12 py-4 rounded-full transition-all w-full max-w-xs ${isPreorder ? 'border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white' : 'bg-brand-brown text-white hover:bg-brand-ink shadow-lg'}`}
          >
            На главную
          </Link>
          <Link 
            to="/events" 
            className={`inline-block px-12 py-4 rounded-full transition-all w-full max-w-xs border ${isPreorder ? 'border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white' : 'border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white'}`}
          >
            К календарю встреч
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FailurePage = () => {
  const [searchParams] = React.useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-40 px-6 flex items-center justify-center text-center"
    >
      <SEO title="Ошибка оплаты" />
      <div className="max-w-2xl px-8">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-12">
          <X size={40} className="text-red-500" />
        </div>
        
        <h1 className="text-3xl md:text-5xl serif-light text-brand-ink mb-8">Оплата не прошла</h1>
        <p className="text-lg md:text-xl text-brand-brown/70 serif-light leading-relaxed mb-12">
          К сожалению, транзакция была отклонена или произошла ошибка. Если деньги списаны, свяжитесь с нами в Telegram.
        </p>
        
        {orderId && (
          <p className="text-xs text-brand-brown/40 mb-12 uppercase tracking-widest font-bold">
            Номер заказа: #{orderId}
          </p>
        )}
        
        <div className="space-y-6 flex flex-col items-center">
          <Link 
            to="/events" 
            className="inline-block bg-brand-pink text-white px-12 py-4 rounded-full hover:bg-brand-brown transition-all shadow-lg w-full max-w-xs"
          >
            Попробовать еще раз
          </Link>
          <a 
            href="https://t.me/AnnaZverkovaWeb" 
            target="_blank"
            className="inline-block border border-brand-brown text-brand-brown px-12 py-4 rounded-full hover:bg-brand-brown hover:text-white transition-all w-full max-w-xs"
          >
            Написать в поддержку
          </a>
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
              <p>ИНН: 710306810329</p>
              <p>ОГРНИП: 317784700046787</p>
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
              Тебе не нужно становиться лучше. <br className="hidden md:block" /> Достаточно просто <span className="italic">остановиться</span>.
            </h2>
            <div className="w-16 h-[1px] bg-brand-pink/20 mx-auto mb-12" />
            <p className="text-xl md:text-2xl text-brand-brown/70 serif-light italic leading-relaxed mb-20 max-w-3xl mx-auto">
              Иногда всё, что нам нужно — это время для себя, в котором нет расписания. 
              И в этом состоянии свободы снова рождается энергия, смелость желать и вкус к каждому моменту.
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
                  Наш Telegram-канал
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
            {/* <Route path="/gallery" element={<GalleryPage />} /> */}
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/fail" element={<FailurePage />} />
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
