import { mkdir, writeFile } from 'node:fs/promises';

const root = new URL('../public/', import.meta.url);
const arrow = '<span aria-hidden="true">↗</span>';
const label = text => `<p class="eyebrow">${text}</p>`;
const button = (text, href='#contact', light=false) => `<a class="button${light?' button-light':''}" href="${href}">${text}${arrow}</a>`;
const textLink = (text, href) => `<a class="text-link" href="${href}">${text}${arrow}</a>`;
const portrait = (p, cls='', eager=false) => `<img class="${cls}" src="${p}assets/dinar-about-photo.jpeg" width="1024" height="1536" alt="Динар Динмухаметов" ${eager?'fetchpriority="high"':'loading="lazy"'}>`;
const concept = (p, kind, cls='', eager=false) => `<figure class="concept ${cls}"><img src="${p}assets/${kind}-concept.webp" width="1536" height="1024" alt="Визуальная концепция: ${kind==='box'?'бордовая коробка с внутренним ложементом':'настольный дисплей с упаковками товара'}. Не выполненный заказ." ${eager?'fetchpriority="high"':'loading="lazy"'}><figcaption>Визуальная концепция · не выполненный проект</figcaption></figure>`;
const person = p => `<a class="person" href="${p}about/">${portrait(p)}<span><b>Динар Динмухаметов</b><small>Лично веду ваш заказ</small></span>${arrow}</a>`;

const process = `<section class="section process" id="process">
  <div class="section-heading">${label('Как я работаю')}<h2>От первого разговора<br>до готового тиража.</h2></div>
  <div class="steps">
    ${[
      ['Разбираемся','Что за товар, где будет использоваться изделие и какой результат нужен.'],
      ['Выбираем','Подбираю производство. Обсуждаем конструкцию, смету и условия.'],
      ['Проверяем','Сверяем образец с задачей. Фиксируем правки и согласуем результат.'],
      ['Производим','Контролирую согласованные параметры и этапы. Держу вас в курсе.']
    ].map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}
  </div>
</section>`;

const terms = `<section class="section terms">
  <div>${label('Прозрачные условия')}<h2>Понятно, за что<br>вы платите.</h2></div>
  <div class="terms-copy"><p class="body-large">Работаю с подрядными производствами. Вы видите предложения и согласуете условия. Моё вознаграждение обсуждаем отдельно.</p>
  <p>Разработка, образец и тираж рассчитываются отдельно. Стоимость и состав работ согласуем до начала каждого этапа.</p>
  <p class="muted">Цена и срок зависят от изделия, материалов, отделки, количества и доставки.</p></div>
</section>`;

function contact(p) { return `<section class="contact-band" id="contact"><div class="container contact-inner">
  <div class="contact-title">${label('Начнём с разговора')}<h2>Расскажите,<br>что вы <em>задумали.</em></h2>
  <p>Пришлите фотографию, эскиз или пару слов о задаче.<br>Первое обсуждение заказа — бесплатно.</p>
  ${button('Написать в Telegram','https://t.me/mrdinar',true)}</div>
  <div class="contact-aside">${portrait(p,'contact-portrait')}<p>Динар Динмухаметов<br><span>Ваш собеседник на всём пути</span></p>
  <div class="direct-links"><a href="tel:+79958815095">+7 (995) 881-50-95 ${arrow}</a><a href="mailto:db@dinardb.ru">db@dinardb.ru ${arrow}</a><a href="https://max.ru/u/f9LHodD0cOKdKxpZWRTf6opqWFE4_FBbFln83YGEvx6yfmukrq7u5bdn0Wg">Написать в MAX ${arrow}</a></div></div>
  <p class="contact-note">Макеты и файлы можно приложить в выбранном мессенджере.</p>
</div></section>`; }

const home = `<div class="container">
<section class="hero home-hero">
  <div class="hero-copy">${label('Динар Динмухаметов · лично веду ваш заказ')}
    <h1>POS-материалы<br>и упаковка.<br><em>От образца<br>до тиража.</em></h1>
    <p class="hero-description">Разберусь в задаче, подберу производство<br class="desktop-break"> и проконтролирую выпуск. От первого<br class="desktop-break"> разговора до готового изделия.</p>
    <div class="actions">${button('Обсудить изготовление')}${textLink('Как я работаю','#process')}</div>
    <p class="micro">Можно начать с фотографии, эскиза или описания</p>
  </div>
  <div class="hero-visual">${portrait('./','hero-portrait',true)}
    <div class="portrait-caption"><b>Динар Динмухаметов</b><span>24+ года в производственных проектах</span></div>
    ${concept('./','box','hero-object',true)}
  </div>
</section>
<section class="intro section">
  ${label('Человек, которому можно поручить производство')}
  <div><h2 class="statement">У вас — идея.<br>У меня — опыт, чтобы<br><em>довести её до изделия.</em></h2>
  <div class="intro-bottom"><p>Нужно изготовить коробку, дисплей или стойку, но непонятно, кому поручить заказ? Я уточню требования, организую образец и лично проконтролирую выполнение.</p>${textLink('Познакомиться ближе','./about/')}</div></div>
</section>
<section class="section products" id="products">
  <div class="section-heading">${label('Что нужно изготовить')}<h2>В центре внимания —<br><em>ваш продукт.</em></h2></div>
  <div class="product-grid">
    <article class="product-card"><a class="product-image" href="./korobki-s-lozhementom/" aria-label="Коробки с ложементом: подробнее">${concept('./','box')}</a><div class="product-copy"><h3><a href="./korobki-s-lozhementom/">Коробки с ложементом ${arrow}</a></h3><p>Для продукта, набора или образцов. Важно не только упаковать, но и точно разместить всё внутри.</p></div></article>
    <article class="product-card"><a class="product-image" href="./shouboksy-displei/" aria-label="Шоубоксы и дисплеи: подробнее">${concept('./','display')}</a><div class="product-copy"><h3><a href="./shouboksy-displei/">Шоубоксы и дисплеи ${arrow}</a></h3><p>Для полки, прилавка или кассы. Товар на виду, конструкция устойчива, выкладку удобно пополнять.</p></div></article>
  </div>
  <div class="other-product"><span>Другое изделие — например, картонная стойка?</span>${textLink('Обсудим задачу','#contact')}</div>
</section>
</div>
<section class="personal-band"><div class="container personal-inner">
  <div class="personal-photo">${portrait('./')}<span>Лично в процессе.</span></div>
  <div class="personal-copy">${label('Опыт — в каждом решении')}<h2>Вы говорите<br>со мной.<br><em>Я решаю<br>с производством.</em></h2><p>Сравниваю варианты, задаю вопросы подрядчикам и организую образец. Вы определяете приоритеты и согласуете смету, образец и условия тиража.</p>
    <div class="experience"><div><strong>24+</strong><span>года в рекламно-<br>производственных проектах</span></div><div><strong>4 года</strong><span>закупочной работы<br>в InnerWorkings</span></div></div>
    ${textLink('Мой опыт и подход','./about/')}
  </div>
</div></section>
<div class="container">
<section class="section situations"><div>${label('Начните с того, что есть')}<h2>Готовое ТЗ?<br><em>Необязательно.</em></h2><p>Помогу понять, какой следующий шаг нужен именно вашей задаче.</p></div><div class="situation-list">
  ${[['Есть идея, но нет ТЗ','Помогу перевести замысел в понятные требования к изделию.'],['Есть образец','Разберём конструкцию и то, что нужно сохранить или изменить.'],['Нужен новый тираж','Уточним параметры, проверим материалы и условия изготовления.'],['Есть расчёт, но есть сомнения','Можно отдельно разобрать смету и производственное решение.']].map(([t,p])=>`<details><summary>${t}<span aria-hidden="true">+</span></summary><p>${p}</p></details>`).join('')}
</div></section>
${process}${terms}
<section class="consultation"><div>${label('Отдельная услуга')}<h2>Второй взгляд<br>на готовую смету.</h2></div><div><p>Уже есть подрядчик или конструкция? Разберу производственное решение, отмечу риски и вопросы, которые стоит задать до запуска.</p><p class="muted">Это отдельная платная работа. Формат, стоимость и результат согласуем заранее.</p>${textLink('Обсудить проверку','#contact')}</div></section>
</div>`;

function product(kind) {
  const isBox=kind==='box';
  const name=isBox?'Коробки с ложементом':'Шоубоксы и дисплеи';
  const checks=isBox?[
    ['Посадка товара','Предмет держится на месте и удобно извлекается.'],
    ['Защита и внешний вид','Материалы подходят задаче, отделка и печать соответствуют согласованному образцу.'],
    ['Сборка и перевозка','Проверяем комплектацию, закрывание и условия транспортировки.']
  ]:[
    ['Размещение товара','Товар виден на полке, прилавке или кассе; его удобно брать и пополнять.'],
    ['Нагрузка и устойчивость','Проверяем конструкцию с фактическим товаром и согласованной нагрузкой.'],
    ['Сборка','Оцениваем, насколько понятно собрать дисплей и подготовить его к выкладке.']
  ];
  return `<div class="container"><p class="breadcrumb"><a href="../">Главная</a><span> / </span>${name}</p>
  <section class="hero product-hero"><div class="hero-copy">${label(isBox?'Упаковка под задачу':'Товар в точке продажи')}
    <h1>${isBox?'Коробки<br>с ложементом.<br><em>Под ваш продукт.</em>':'Шоубоксы<br>и дисплеи.<br><em>Под ваш товар.</em>'}</h1>
    <p class="hero-description">${isBox?'Помогу подобрать конструкцию и производство, проверить посадку товара на образце и организовать выпуск тиража.':'Для полки, прилавка или кассы. Помогу продумать выкладку, организовать образец и проконтролировать изготовление.'}</p>
    <div class="actions">${button(isBox?'Обсудить коробку':'Обсудить дисплей')}</div>${person('../')}
  </div><div class="product-hero-visual">${concept('../',kind,'',true)}<div class="photo-tag">${isBox?'Хорошо выглядит.<br>Точно подходит.':'Товар на виду.<br>Всё на своём месте.'}</div></div></section>
  <section class="section product-intro"><div>${label('Продумано до тиража')}<h2>${isBox?'Всё начинается<br><em>с вашего продукта.</em>':'Удобно покупателю.<br><em>Понятно продавцу.</em>'}</h2></div>
  <div><p class="body-large">${isBox?'Ложемент — внутренний элемент, который размещает и фиксирует товар. Его материал и форму выбираем под конкретный продукт, а не по одной фотографии.':'Шоубокс — коробка, в которой товар выставляют для продажи. Дисплей помогает организовать выкладку. Подходящий формат зависит от товара и места размещения.'}</p><p>Сначала проверяем на образце, как изделие работает в жизни. Только после согласования переходим к тиражу.</p></div></section>
  </div>
  <section class="sample-band"><div class="container sample-inner"><div>${label('Зачем нужен образец')}<h2>Красиво —<br><em>и по делу.</em></h2><p>За внешним видом — решения, которые важно проверить до производства.</p>${textLink('Обсудить вашу задачу','#contact')}</div><div class="checks">${checks.map(([t,p])=>`<article><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>
  <div class="container"><section class="section product-start"><div>${label('Начальные вводные')}<h2>Расскажите о товаре.<br>Детали уточним <em>вместе.</em></h2></div><div><p>${isBox?'Для начала достаточно описания продукта или фотографии. Затем уточним размеры, вес и хрупкость, состав набора, пожелания к печати и отделке.':'Начать можно с фотографии товара и места выкладки. Затем уточним размеры, вес, число единиц, ограничения полки или кассы и требования торговой сети.'}</p><p>Если уже известны примерное количество и желаемый срок — расскажите о них. Если нет, обсудим варианты.</p></div></section>
  ${process}${terms}
  <div class="related"><span>${isBox?'Нужна выкладка товара?':'Нужна упаковка для набора?'}</span>${textLink(isBox?'Шоубоксы и дисплеи':'Коробки с ложементом',isBox?'../shouboksy-displei/':'../korobki-s-lozhementom/')}</div></div>`;
}

const about=`<div class="container"><section class="hero about-hero"><div class="hero-copy">${label('Динар Динмухаметов')}<h1>Знаю<br>производство.<br><em>Понимаю<br>вашу задачу.</em></h1><p class="hero-description">Более 24 лет в рекламно-производственных проектах: от обсуждения изделия до образца и контроля изготовления.</p><div class="actions">${button('Обсудить задачу')}</div></div><div class="about-photo">${portrait('../','',true)}<span>Лично. От разговора до тиража.</span></div></section>
<section class="section about-story">${label('Практический опыт')}<div><h2>Понимать материал.<br><em>Задавать точные вопросы.</em></h2><p class="body-large">Четыре года работал в закупках InnerWorkings: тендеры, сравнение подрядчиков, переговоры, отчётность и контроль производства.</p><p>В моём опыте — картон, полиграфия, упаковка, пластик и металл. Это помогает обсуждать задачу и с заказчиком, и с производственной площадкой на понятном языке.</p><p class="muted">Это мой профессиональный опыт, в том числе в работе по найму. Он не представлен как портфолио заказов dinar.moscow.</p></div></section></div>
<section class="belief-band"><div class="container">${label('Мой подход')}<h2>Важен красивый замысел.<br>И то, как изделие будет<br><em>собрано, упаковано<br>и использовано.</em></h2></div></section>
<div class="container"><section class="section about-principles"><article><h3>Один собеседник на всём пути</h3><p>Я лично разбираюсь в задаче и координирую работу подрядных производств. Условия, образец и изменения обсуждаю с вами до следующего этапа.</p></article><article><h3>Прозрачность вместо обещаний</h3><p>Показываю предложения исполнителей. Отдельно согласуем мою работу и критерии контроля. Возможность изготовления проверяем под конкретные требования.</p></article></section>${process}${terms}</div>`;

const pages=[
  ['', 'POS-материалы и упаковка — Динар Динмухаметов','Лично организую изготовление упаковки и POS-материалов: подбор производства, образец и контроль тиража.',home],
  ['korobki-s-lozhementom','Коробки с ложементом под ваш продукт — Динар','Подбор конструкции и производства, проверка посадки товара на образце и организация выпуска коробок с ложементом.',product('box')],
  ['shouboksy-displei','Шоубоксы и дисплеи под ваш товар — Динар','Организация изготовления шоубоксов и дисплеев для полки, прилавка и кассы. Проверка выкладки, нагрузки и сборки.',product('display')],
  ['about','Динар Динмухаметов — опыт и подход','Более 24 лет в рекламно-производственных проектах. Личное ведение заказа, подбор подрядчиков и контроль изготовления.',about]
];
for(const [slug,title,description,body] of pages){
  const p=slug?'../':'./';
  const nav=[['korobki-s-lozhementom','Коробки'],['shouboksy-displei','Дисплеи'],['about','Обо мне']].map(([s,t])=>`<a href="${p}${s}/"${s===slug?' aria-current="page"':''}>${t}</a>`).join('');
  const html=`<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="theme-color" content="#f7f5ef">
<title>${title}</title><meta name="description" content="${description}">
<link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${p}assets/fonts/manrope-variable.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="${p}assets/style.css"><script src="${p}assets/site.js" defer></script>
</head><body class="${slug||'home'}">
<a class="skip" href="#main">К содержанию</a>
<header class="header container"><a class="brand" href="${p}" aria-label="Динар — главная">Динар<span>.</span><small>Динмухаметов</small></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="navigation" hidden>Меню <span aria-hidden="true">+</span></button>
<nav id="navigation" aria-label="Основная навигация">${nav}<a class="nav-contact" href="#contact">Обсудить задачу ${arrow}</a></nav></header>
<main id="main">${body}${contact(p)}</main>
<footer class="footer container"><a class="brand" href="${p}">Динар<span>.</span></a><p>POS-материалы и упаковка.<br>Личное ведение заказа.</p><p>© 2026 Динар Динмухаметов<br><span>Preview v02</span></p></footer>
</body></html>`;
  await mkdir(new URL(slug?slug+'/':'./',root),{recursive:true});
  await writeFile(new URL((slug?slug+'/':'')+'index.html',root),html);
}
console.log('v02: 4 страницы созданы в public/');
