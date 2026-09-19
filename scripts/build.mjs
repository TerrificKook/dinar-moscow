import { mkdir, writeFile } from 'node:fs/promises';
import { products, articles } from './content.mjs';

const root = new URL('../public/', import.meta.url);
const arrow = '<span aria-hidden="true">↗</span>';
const label = text => `<p class="eyebrow">${text}</p>`;
const button = (text, href='#contact', light=false) => `<a class="button${light?' button-light':''}" href="${href}">${text}${arrow}</a>`;
const textLink = (text, href) => `<a class="text-link" href="${href}">${text}${arrow}</a>`;
const portrait = (p, cls='', eager=false) => `<img class="${cls}" src="${p}assets/dinar-about-photo.jpeg" width="1024" height="1536" alt="Динар Динмухаметов" ${eager?'fetchpriority="high"':'loading="lazy"'}>`;
const imageNames = { 'white-boxes':'Белые коробки: крышка-дно, складная с клапаном и с окном', 'white-insert':'Белая жёсткая коробка с картонным ложементом под набор', 'white-displays':'Белый лоток SRP и многоуровневый прикассовый дисплей', 'white-stands':'Белые картонные стойки: высокая напольная и низкая широкая' };
const concept = (p, kind, cls='', eager=false) => `<figure class="concept ${cls}"><img src="${p}assets/${kind}.webp" width="1536" height="1024" alt="${imageNames[kind]}. Сгенерированная иллюстрация конструкции." ${eager?'fetchpriority="high"':'loading="lazy"'}><figcaption>${cls.includes('hero-object')?'Беляк · иллюстрация':'Иллюстрация конструкции · не фото выполненного заказа'}</figcaption></figure>`;
const person = p => `<a class="person" href="${p}about/">${portrait(p)}<span><b>Динар Динмухаметов</b><small>Лично веду ваш заказ</small></span>${arrow}</a>`;
const card = (p, item) => `<article class="product-card"><a class="product-image" href="${p}${item.slug}/" aria-label="${item.name}: подробнее">${concept(p,item.image)}</a><div class="product-copy"><h3><a href="${p}${item.slug}/">${item.name} ${arrow}</a></h3><p>${item.short}</p></div></article>`;
const reading = (p, ids, heading='Разобраться до заказа') => `<section class="section reading"><div class="section-heading">${label('Полезное об упаковке')}<h2>${heading}</h2></div><div class="reading-list">${ids.map(id=>{const a=articles.find(a=>a.slug===id);return `<a class="reading-link" href="${p}articles/${a.slug}/"><span class="reading-category">${a.category}</span><h3>${a.title}</h3>${arrow}</a>`}).join('')}</div>${textLink('Все материалы',`${p}articles/`)}</section>`;

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
  <p>Пришлите фото товара, размеры и примерное количество.<br>Первое обсуждение заказа — бесплатно.</p>
  ${button('Написать в Telegram','https://t.me/mrdinar',true)}</div>
  <div class="contact-aside"><p>Динар Динмухаметов<br><span>Ваш собеседник на всём пути</span></p>
  <div class="direct-links"><a href="https://t.me/mrdinar">Telegram @mrdinar ${arrow}</a><a href="tel:+79057011177">+7 (905) 701-11-77 ${arrow}</a><a href="mailto:db@dinardb.ru">db@dinardb.ru ${arrow}</a><a href="https://max.ru/u/f9LHodD0cOKdKxpZWRTf6opqWFE4_FBbFln83YGEvx6yfmukrq7u5bdn0Wg">Написать в MAX ${arrow}</a></div></div>
  <p class="contact-note">Работаю с юридическими лицами. Макеты и файлы можно приложить в выбранном мессенджере.</p>
</div></section>`; }

const home = `<div class="container">
<section class="hero home-hero">
  <div class="hero-copy">${label('Динар Динмухаметов · лично веду ваш заказ')}
    <h1>Коробки<br>и дисплеи<br><em>под ваш товар.</em></h1>
    <p class="hero-description">Разработка конструкции, образец и тираж для компаний. Разберусь в задаче, подберу производство и лично проконтролирую изготовление.</p>
    <div class="actions">${button('Обсудить изготовление')}${textLink('Как я работаю','#process')}</div>
    <p class="micro">На заказ · по вашим размерам · работа с юрлицами</p>
  </div>
  <div class="hero-visual">${portrait('./','hero-portrait',true)}
    <div class="portrait-caption"><b>Динар Динмухаметов</b><span>В рекламном производстве с 2001 года</span></div>
    ${concept('./','white-insert','hero-object',true)}
  </div>
</section>
<section class="intro section">
  ${label('Человек, которому можно поручить производство')}
  <div><h2 class="statement">У вас — идея.<br>У меня — опыт, чтобы<br><em>довести её до изделия.</em></h2>
  <div class="intro-bottom"><p>Нужно изготовить коробку, дисплей или стойку, но непонятно, кому поручить заказ? Я уточню требования, организую образец и лично проконтролирую выполнение.</p>${textLink('Познакомиться ближе','./about/')}</div></div>
</section>
<section class="section products" id="products">
  <div class="section-heading">${label('Что нужно изготовить')}<h2>В центре внимания —<br><em>ваш продукт.</em></h2></div>
  <div class="product-grid">${[products[0],products[3],products[1],products[2]].map(item=>card('./',item)).join('')}</div>
  <p class="gallery-note">Белые образцы помогают увидеть конструкцию без брендинга. Это сгенерированные иллюстрации, не портфолио. Для вашего заказа разработаем и согласуем физический образец.</p>
  <div class="run-note"><h3>Нужны 500 или 1000 коробок?</h3><p>Обсудим оба тиража, материал и комплектацию. Это примеры количества для расчёта — возможность изготовления и условия зависят от изделия.</p>${textLink('Из чего складывается цена','./articles/tirazh-500-1000/')}</div>
</section>
</div>
<section class="personal-band"><div class="container personal-inner">
  <div class="personal-photo">${portrait('./')}<span>Лично в процессе.</span></div>
  <div class="personal-copy">${label('Опыт — в каждом решении')}<h2>Вы говорите<br>со мной.<br><em>Я решаю<br>с производством.</em></h2><p>Сравниваю варианты, задаю вопросы подрядчикам и организую образец. Вы определяете приоритеты и согласуете смету, образец и условия тиража.</p>
    <div class="experience"><div><strong>С 2001</strong><span>в рекламных агентствах<br>и производственных компаниях</span></div></div>
    ${textLink('Мой опыт и подход','./about/')}
  </div>
</div></section>
<div class="container">
<section class="section situations"><div>${label('Начните с того, что есть')}<h2>Готовое ТЗ?<br><em>Необязательно.</em></h2><p>Помогу понять, какой следующий шаг нужен именно вашей задаче.</p></div><div class="situation-list">
  ${[['Есть идея, но нет ТЗ','Помогу перевести замысел в понятные требования к изделию.'],['Есть образец','Разберём конструкцию и то, что нужно сохранить или изменить.'],['Нужен новый тираж','Уточним параметры, проверим материалы и условия изготовления.'],['Есть расчёт, но есть сомнения','Можно отдельно разобрать смету и производственное решение.']].map(([t,p])=>`<details><summary>${t}<span aria-hidden="true">+</span></summary><p>${p}</p></details>`).join('')}
</div></section>
${process}${reading('./',['pripak-shouboks-srp','kak-vybrat-karton','belyak-i-obrazec'])}${terms}
<section class="consultation"><div>${label('Отдельная услуга')}<h2>Второй взгляд<br>на готовую смету.</h2></div><div><p>Уже есть подрядчик или конструкция? Разберу производственное решение, отмечу риски и вопросы, которые стоит задать до запуска.</p><p class="muted">Это отдельная платная работа. Формат, стоимость и результат согласуем заранее.</p>${textLink('Обсудить проверку','#contact')}</div></section>
</div>`;

function product(item) {
  return `<div class="container"><p class="breadcrumb"><a href="../">Главная</a><span>/</span>${item.name}</p>
  <section class="hero product-hero"><div class="hero-copy">${label(item.eyebrow)}<h1>${item.heading}</h1><p class="hero-description">${item.lead}</p><div class="actions">${button(item.cta)}</div>${person('../')}</div><div class="product-hero-visual">${concept('../',item.image,'',true)}<p class="image-note">Формат для обсуждения.<br>Конструкцию разработаем под ваш товар.</p></div></section>
  <section class="section product-intro"><div>${label('Продумано до тиража')}<h2>${item.intro}</h2></div><div><p class="body-large">${item.explanation}</p><p>${item.note}</p></div></section>
  <section class="section variants"><div class="section-heading">${label('Варианты под задачу')}<h2>Как это может<br><em>быть устроено.</em></h2></div><div class="variant-grid">${item.options.map(([t,p])=>`<article><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></section></div>
  <section class="sample-band"><div class="container sample-inner"><div>${label('Физический образец')}<h2>Проверяем<br><em>до производства.</em></h2><p>До тиража согласуем конструкцию и то, как будем оценивать результат.</p>${textLink('Что проверяет беляк','../articles/belyak-i-obrazec/')}</div><div class="checks">${item.checks.map(([t,p])=>`<article><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>
  <div class="container"><section class="section product-start"><div>${label('Для первого обсуждения')}<h2>Начните<br><em>с вашего товара.</em></h2></div><div><p>${item.brief}</p><p>Готовое техническое задание необязательно. Я помогу уточнить параметры и предложу следующий шаг.</p>${button(item.cta)}</div></section>${process}${terms}${reading('../',item.guides)}<div class="related-products"><p class="eyebrow">Другие задачи</p>${products.filter(p=>p.slug!==item.slug).map(p=>textLink(p.name,`../${p.slug}/`)).join('')}</div></div>`;
}

const journal = `<div class="container"><section class="journal-hero"><div>${label('Полезное об упаковке')}<h1>Понять детали.<br><em>Заказать уверенно.</em></h1><p class="hero-description">Конструкции, материалы и подготовка тиража — простыми словами. Чтобы выбрать подходящий формат и задать производству правильные вопросы.</p></div>${concept('../','white-boxes','journal-cover',true)}</section><section class="journal-grid" aria-label="Статьи">${articles.map(a=>`<article class="journal-card"><p class="eyebrow">${a.category}</p><h2><a href="./${a.slug}/">${a.title} ${arrow}</a></h2><p>${a.summary}</p>${textLink('Читать материал',`./${a.slug}/`)}</article>`).join('')}</section></div>`;

function article(a) {
  const related=articles.filter(item=>item.slug!==a.slug).slice(0,2);
  const service=products.find(p=>p.slug===a.service);
  return `<div class="container"><p class="breadcrumb"><a href="../../">Главная</a><span>/</span><a href="../">Полезное</a><span>/</span>${a.category}</p><header class="article-heading">${label(a.category)}<h1>${a.title}</h1><p class="article-lead">${a.summary}</p><p class="article-meta">Динар Динмухаметов · <time datetime="2026-09-19">19 сентября 2026</time></p></header>${concept('../../',a.image,'article-image',true)}<div class="article-layout"><aside class="article-toc"><details class="toc-details" open><summary>В этом материале</summary><nav aria-label="Содержание статьи">${a.sections.map(([id,t])=>`<a href="#${id}">${t}</a>`).join('')}</nav></details>${textLink('Обсудить мой заказ','#contact')}</aside><article class="article-body">${a.sections.map(([id,t,body])=>`<section id="${id}"><h2>${t}</h2>${body}</section>`).join('')}<div class="article-offer"><p class="eyebrow">От информации — к изделию</p><h2>${service.name} под вашу задачу</h2><p>Помогу с конструкцией, образцом и организацией тиража для вашей компании.</p>${button('Подробнее об изготовлении',`../../${service.slug}/`)}</div></article></div><section class="reading section"><div class="section-heading">${label('Читайте дальше')}<h2>Ещё по теме</h2></div><div class="reading-list">${related.map(r=>`<a class="reading-link" href="../${r.slug}/"><span class="reading-category">${r.category}</span><h3>${r.title}</h3>${arrow}</a>`).join('')}</div>${textLink('Все материалы','../')}</section></div>`;
}

const about=`<div class="container"><section class="hero about-hero"><div class="hero-copy">${label('Динар Динмухаметов')}<h1>Знаю<br>производство.<br><em>Понимаю<br>вашу задачу.</em></h1><p class="hero-description">С 2001 года работаю в рекламных агентствах и рекламно-производственных компаниях. Помогаю пройти путь от идеи изделия до образца и готового тиража.</p><div class="actions">${button('Обсудить задачу')}</div></div><div class="about-photo">${portrait('../','',true)}<span>Лично. От разговора до тиража.</span></div></section>
<section class="section about-story">${label('Практический опыт')}<div><h2>Понимать материал.<br><em>Задавать точные вопросы.</em></h2><p class="body-large">Моя работа — соединять задачу заказчика с возможностями производства. Разобраться в изделии, сравнить решения и вовремя заметить то, что стоит проверить на образце.</p><p>В моём опыте — картон, полиграфия, упаковка, пластик и металл. Я работал в рекламных агентствах и производственных компаниях, поэтому понимаю и требования к внешнему виду, и вопросы изготовления.</p><h3>Закупки и тендеры</h3><p>Четыре года работал в закупочном агентстве InnerWorkings: тендеры для крупных компаний, в том числе Unilever, сравнение подрядчиков, переговоры, отчётность и контроль производства. Этот опыт помогает оценивать не только итоговую цену, но и состав предложения, сроки и условия исполнения.</p><h3>Упаковка и выкладка товара</h3><p>В моей практике были припаки для Ferrero, Mars и Unilever. В таких задачах важно учитывать не только изображение на стенде, но и сам товар, нагрузку, комплектацию и путь до торговой точки.</p><p class="muted">Названия компаний приведены в контексте моего профессионального опыта, включая работу по найму. Это не перечень текущих заказчиков личного сайта и не заявление о партнёрстве с брендами.</p></div></section></div>
<section class="belief-band"><div class="container">${label('Мой подход')}<h2>Важен красивый замысел.<br>И то, как изделие будет<br><em>собрано, упаковано<br>и использовано.</em></h2></div></section>
<div class="container"><section class="section about-principles"><article><h3>Один собеседник на всём пути</h3><p>Я лично разбираюсь в задаче и координирую работу подрядных производств. Условия, образец и изменения обсуждаю с вами до следующего этапа.</p></article><article><h3>Прозрачность вместо обещаний</h3><p>Показываю предложения исполнителей. Отдельно согласуем мою работу и критерии контроля. Возможность изготовления проверяем под конкретные требования.</p></article></section>${process}${terms}</div>`;

const pages=[
  ['', 'Картонные коробки и дисплеи на заказ — Динар Динмухаметов','Организую изготовление коробок, шоубоксов и картонных стоек для юрлиц. Разработка конструкции, образец и тираж. Личное ведение заказа.',home],
  ...products.map(p=>[p.slug,p.title,p.description,product(p)]),
  ['about','Динар Динмухаметов — в рекламном производстве с 2001 года','Опыт в рекламных агентствах, производственных компаниях и закупках. Упаковка, припаки, тендеры и личное ведение вашего заказа.',about],
  ['articles','Полезное об упаковке — конструкции, материалы и заказ тиража','Практические статьи о картонных коробках, ложементах, SRP, припаках, образцах и отделке. Что учесть перед заказом производства.',journal],
  ...articles.map(a=>[`articles/${a.slug}`,a.title+' — Динар',a.summary,article(a)])
];
for(const [slug,title,description,body] of pages){
  const p=slug?'../'.repeat(slug.split('/').length):'./';
  const nav=[['kartonnye-korobki','Коробки'],['kartonnye-stoyki','Стойки'],['shouboksy-displei','Шоубоксы'],['articles','Полезное'],['about','Обо мне']].map(([s,t])=>`<a href="${p}${s}/"${s===slug?' aria-current="page"':''}>${t}</a>`).join('');
  const html=`<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="theme-color" content="#f7f5ef">
<title>${title}</title><meta name="description" content="${description}">
<link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${p}assets/fonts/manrope-variable.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="${p}assets/style.css"><script src="${p}assets/site.js" defer></script>
</head><body class="${slug.startsWith('articles/')?'article-page':slug||'home'}">
<a class="skip" href="#main">К содержанию</a>
<header class="header container"><a class="brand" href="${p}" aria-label="Динар — главная">Динар<span>.</span><small>Динмухаметов</small></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="navigation" hidden>Меню <span aria-hidden="true">+</span></button>
<nav id="navigation" aria-label="Основная навигация">${nav}<a class="nav-contact" href="#contact">Обсудить задачу ${arrow}</a></nav></header>
<main id="main">${body}${contact(p)}</main>
<footer class="footer container"><a class="brand" href="${p}">Динар<span>.</span></a><p>Упаковка и картонные дисплеи.<br>Личное ведение заказа.</p><p>© 2026 Динар Динмухаметов<br><span>Preview v03</span></p></footer>
</body></html>`;
  await mkdir(new URL(slug?slug+'/':'./',root),{recursive:true});
  await writeFile(new URL((slug?slug+'/':'')+'index.html',root),html);
}
console.log(`v03: ${pages.length} страниц созданы в public/`);
