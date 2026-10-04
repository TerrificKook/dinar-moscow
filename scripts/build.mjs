import { mkdir, writeFile } from 'node:fs/promises';
import { products, articles } from './content.mjs';

const root = new URL('../public/', import.meta.url);
const arrow = '<span aria-hidden="true">↗</span>';
const label = text => `<p class="eyebrow">${text}</p>`;
const button = (text, href='#contact', light=false) => `<a class="button${light?' button-light':''}" href="${href}">${text}${arrow}</a>`;
const textLink = (text, href) => `<a class="text-link" href="${href}">${text}${arrow}</a>`;
const portrait = (p, cls='', eager=false) => `<img class="${cls}" src="${p}assets/dinar-portrait-v04.webp" width="1086" height="1448" alt="Динар Динмухаметов — портрет с ретушью" ${eager?'fetchpriority="high"':'loading="lazy"'}>`;
const imageNames = { 'white-boxes':'Белые коробки: крышка-дно, складная с клапаном и с окном', 'white-insert':'Белая жёсткая коробка с картонным ложементом под набор', 'white-displays':'Белый лоток SRP и многоуровневый прикассовый дисплей', 'white-stands':'Белые картонные стойки: высокая напольная и низкая широкая' };
const concept = (p, kind, cls='', eager=false) => `<figure class="concept ${cls}"><img src="${p}assets/${kind}.webp" width="1536" height="1024" alt="${imageNames[kind]}. Сгенерированная иллюстрация конструкции." ${eager?'fetchpriority="high"':'loading="lazy"'}><figcaption>${cls.includes('hero-object')?'Беляк · иллюстрация':'Иллюстрация конструкции · не фото выполненного заказа'}</figcaption></figure>`;
const person = p => `<a class="project-owner" href="${p}about/">Личное ведение — Динар Динмухаметов ${arrow}</a>`;
const card = (p, item) => `<article class="product-card"><a class="product-image" href="${p}${item.slug}/" aria-label="${item.name}: подробнее">${concept(p,item.image)}</a><div class="product-copy"><h3><a href="${p}${item.slug}/">${item.name} ${arrow}</a></h3><p>${item.short}</p></div></article>`;
const reading = (p, ids, heading='Разобраться до заказа') => `<section class="section reading"><div class="section-heading">${label('Полезное об упаковке')}<h2>${heading}</h2></div><div class="reading-list">${ids.map(id=>{const a=articles.find(a=>a.slug===id);return `<a class="reading-link" href="${p}articles/${a.slug}/"><span class="reading-category">${a.category}</span><h3>${a.title}</h3>${arrow}</a>`}).join('')}</div>${textLink('Все материалы',`${p}articles/`)}</section>`;

const process = `<section class="section process" id="process">
  <div class="section-heading">${label('Как проходит работа')}<h2>От задачи — к образцу.<br><em>От образца — к тиражу.</em></h2></div>
  <div class="steps">
    ${[
      ['Ваша задача','Получаю товар или его параметры. Согласуем состав работы: разработка, изготовление образца или подготовка тиража.'],
      ['Конструкция и образец','Организую разработку и изготовление белого образца. Проверяем размеры, размещение товара и сборку, уточняем необходимые правки.'],
      ['Внешний вид','Подбираем материалы и отделку. Согласуем цветной образец и фиксируем спецификацию изделия.'],
      ['Тираж по согласованию','Разработку и образец можно заказать отдельно. Если нужен тираж, рассчитываю количества по согласованной спецификации и организую изготовление.']
    ].map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}
  </div>
</section>`;

const terms = `<section class="section terms">
  <div>${label('Сначала — изделие')}<h2>Удобно открыть.<br>Приятно держать.<br><em>Можно повторить в тираже.</em></h2></div>
  <div class="terms-copy"><p class="body-large">Образец позволяет проверить решение руками: как сидит продукт, открывается крышка и собирается конструкция.</p>
  <p>Фиксируем размеры, материал, ложемент, печать и отделку. Расчёт тиража опирается на согласованное изделие — с понятным составом и комплектацией.</p></div>
</section>`;

function contact(p) { return `<section class="contact-band" id="contact"><div class="container contact-inner">
  <div class="contact-title">${label('Начнём с разговора')}<h2>Расскажите,<br>что вы <em>задумали.</em></h2>
  <p>Пришлите фото товара, размеры и вашу задачу.<br>Укажите, нужен образец или тираж. Готовое ТЗ необязательно.</p>
  ${button('Написать в Telegram','https://t.me/mrdinar',true)}</div>
  <div class="contact-aside"><p>Динар Динмухаметов<br><span>Ваш собеседник на всём пути</span></p>
  <div class="direct-links"><a href="https://t.me/mrdinar">Telegram @mrdinar ${arrow}</a><a href="tel:+79057011177">+7 (905) 701-11-77 ${arrow}</a><a href="mailto:db@dinardb.ru">db@dinardb.ru ${arrow}</a><a href="https://max.ru/u/f9LHodD0cOKdKxpZWRTf6opqWFE4_FBbFln83YGEvx6yfmukrq7u5bdn0Wg">Написать в MAX ${arrow}</a></div></div>
  <p class="contact-note">Работаю с юридическими лицами. Макеты и файлы можно приложить в выбранном мессенджере.</p>
</div></section>`; }

const home = `<div class="container">
<section class="hero solution-hero">
  <div class="hero-copy">${label('Упаковка и выкладка товара · для бизнеса')}
    <h1>Коробки и дисплеи<br><em>под ваш товар.</em></h1>
    <p class="hero-description">Разработка конструкции, изготовление образца и организация тиража. Помогу пройти путь от идеи до изделия — с подбором производства и контролем исполнения.</p>
    <p class="sample-entry">Разработку и образец можно заказать отдельно.</p>
    <div class="actions">${button('Обсудить задачу')}${textLink('Разработка и образец','#sample-development')}</div>
    <p class="micro">По вашим размерам · можно начать без готового ТЗ</p>
  </div>
  <div class="solution-visual">${concept('./','white-insert','solution-image',true)}<p class="visual-note">Проверка перед тиражом.<br><em>Размеры, посадка товара, сборка.</em></p></div>
</section>
<section class="section needs-section">
  <div class="section-heading">${label('С чем можно обратиться')}<h2>Понятный следующий шаг<br><em>для вашей задачи.</em></h2></div>
  <div class="needs-grid">
    <article><h3>Есть товар, нет конструкции</h3><p>Помогу определить требования к упаковке или дисплею и организую разработку под размеры и свойства товара.</p></article>
    <article><h3>Нужен физический образец</h3><p>Организую изготовление, чтобы проверить посадку товара, сборку и удобство использования до решения о тираже.</p></article>
    <article><h3>Сложно выбрать производство</h3><p>Подберу исполнителя под конструкцию, материал, отделку и количество. Уточню состав работ и условия.</p></article>
    <article><h3>Нужно довести заказ до результата</h3><p>Возьму на себя согласования с производством и контроль исполнения по утверждённому образцу и спецификации.</p></article>
  </div>
</section>
<section class="sample-service" id="sample-development">
  <div>${label('Отдельная услуга')}<h2>Разработка<br>и изготовление<br><em>образца.</em></h2><p class="body-large">Проверить решение на вашем товаре — перед тем, как заказывать тираж.</p><div class="actions">${button('Обсудить образец')}${textLink('Как проверяем образец','./articles/belyak-i-obrazec/')}</div></div>
  <div class="sample-service-copy"><p>Для коробки, ложемента, шоубокса или картонной стойки. Можно обратиться с идеей, фотографией похожего изделия или готовым заданием.</p><ul><li>Уточнение задачи и разработка конструкции.</li><li>Изготовление физического образца под ваш продукт.</li><li>Проверка размеров, размещения товара и сборки.</li><li>Согласование правок, материалов и следующего этапа.</li></ul><p>Белый образец помогает проверить конструкцию. Цветной образец, печать и отделку обсуждаем отдельно.</p><p class="sample-terms">Состав работ, стоимость и сроки согласуем по вашей задаче. Решение о тираже можно принять после образца.</p></div>
</section>
<section class="section products" id="products">
  <div class="section-heading">${label('Что нужно изготовить')}<h2>Упаковать продукт.<br><em>Подготовить выкладку.</em></h2></div>
  <div class="product-grid">${[products[1],products[2],products[0],products[3]].map(item=>card('./',item)).join('')}</div>
  <p class="gallery-note">Белые образцы помогают увидеть конструкцию без брендинга. Это сгенерированные иллюстрации, не портфолио. Для вашего заказа разработаем и согласуем физический образец.</p>
  <div class="run-note"><h3>Нужны 500 или 1000 коробок?</h3><p>Обсудим оба тиража, материал и комплектацию. Это примеры количества для расчёта — возможность изготовления и условия зависят от изделия.</p>${textLink('Из чего складывается цена','./articles/tirazh-500-1000/')}</div>
</section>
</div>
<section class="personal-band"><div class="container personal-inner">
  <div class="personal-photo">${portrait('./')}<span>Динар Динмухаметов</span></div>
  <div class="personal-copy">${label('Один ответственный за вашу задачу')}<h2>Лично веду заказ.<br><em>От первых вводных<br>до изготовления.</em></h2><p>Уточню требования, организую разработку и образец, согласую работу с производством. Вы знаете, к кому обратиться с вопросом на каждом этапе.</p>
    <div class="experience"><div><strong>С 2001</strong><span>в рекламных агентствах<br>и производственных компаниях</span></div></div>
    ${textLink('Мой опыт и подход','./about/')}
  </div>
</div></section>
<div class="container">
<section class="section situations"><div>${label('Начните с того, что есть')}<h2>Ваш следующий<br><em>шаг.</em></h2><p>Для первого разговора достаточно описания задачи. Остальные вводные уточним вместе.</p></div><div class="situation-list">
  ${[['Нужна только разработка и образец','Это отдельная услуга. Обсудим изделие, требования и вид образца. Стоимость и сроки согласуем до начала работы; тираж можно обсудить позже.'],['Есть идея, но нет ТЗ','Пришлите фотографию товара, размеры и пример того, что нравится. Помогу перевести замысел в требования к изделию.'],['Есть образец, который нужно изменить','Разберём конструкцию и то, что нужно сохранить или улучшить. Уточним материалы и организуем новый образец.'],['Нужен новый тираж','Уточним количество, проверим образец, материалы и условия изготовления.']].map(([t,p])=>`<details><summary>${t}<span aria-hidden="true">+</span></summary><p>${p}</p></details>`).join('')}
</div></section>
${process}${reading('./',['belyak-i-obrazec','pripak-shouboks-srp','kak-vybrat-karton'])}${terms}
</div>`;

function product(item) {
  return `<div class="container"><p class="breadcrumb"><a href="../">Главная</a><span>/</span>${item.name}</p>
  <section class="hero product-hero"><div class="hero-copy">${label(item.eyebrow)}<h1>${item.heading}</h1><p class="hero-description">${item.lead}</p><p class="sample-entry">Можно начать с разработки и изготовления образца.</p><div class="actions">${button(item.cta)}${textLink('Нужен образец','#sample-development')}</div>${person('../')}</div><div class="product-hero-visual">${concept('../',item.image,'',true)}<p class="image-note">Формат для обсуждения.<br>Конструкцию разработаем под ваш товар.</p></div></section>
  <section class="section product-intro"><div>${label('Продумано до тиража')}<h2>${item.intro}</h2></div><div><p class="body-large">${item.explanation}</p><p>${item.note}</p></div></section>
  <section class="section variants"><div class="section-heading">${label('Варианты под задачу')}<h2>Как это может<br><em>быть устроено.</em></h2></div><div class="variant-grid">${item.options.map(([t,p])=>`<article><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></section></div>
  <section class="sample-band" id="sample-development"><div class="container sample-inner"><div>${label('Можно заказать отдельно')}<h2>Разработка<br>и изготовление<br><em>образца.</em></h2><p>Организую разработку конструкции и изготовление физического образца. Проверим решение с вашим товаром. Состав работ, стоимость и сроки согласуем по задаче; тираж можно обсудить после образца.</p><div class="actions">${button('Обсудить образец')}</div>${textLink('Что проверяет беляк','../articles/belyak-i-obrazec/')}</div><div class="checks">${item.checks.map(([t,p])=>`<article><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>
  <div class="container"><section class="section product-start"><div>${label('Для первого обсуждения')}<h2>Начните<br><em>с вашего товара.</em></h2></div><div><p>${item.brief}</p><p>Готовое техническое задание необязательно. Я помогу уточнить параметры и предложу следующий шаг.</p>${button(item.cta)}</div></section>${process}${terms}${reading('../',item.guides)}<div class="related-products"><p class="eyebrow">Другие задачи</p>${products.filter(p=>p.slug!==item.slug).map(p=>textLink(p.name,`../${p.slug}/`)).join('')}</div></div>`;
}

const journal = `<div class="container"><section class="journal-hero"><div>${label('Полезное об упаковке')}<h1>Понять детали.<br><em>Заказать уверенно.</em></h1><p class="hero-description">Конструкции, материалы и подготовка тиража — простыми словами. Чтобы выбрать подходящий формат и задать производству правильные вопросы.</p></div>${concept('../','white-boxes','journal-cover',true)}</section><section class="journal-grid" aria-label="Статьи">${articles.map(a=>`<article class="journal-card"><p class="eyebrow">${a.category}</p><h2><a href="./${a.slug}/">${a.title} ${arrow}</a></h2><p>${a.summary}</p>${textLink('Читать материал',`./${a.slug}/`)}</article>`).join('')}</section></div>`;

function article(a) {
  const related=articles.filter(item=>item.slug!==a.slug).slice(0,2);
  const service=products.find(p=>p.slug===a.service);
  return `<div class="container"><p class="breadcrumb"><a href="../../">Главная</a><span>/</span><a href="../">Полезное</a><span>/</span>${a.category}</p><header class="article-heading">${label(a.category)}<h1>${a.title}</h1><p class="article-lead">${a.summary}</p><p class="article-meta">Динар Динмухаметов · <time datetime="2026-09-19">19 сентября 2026</time></p></header>${concept('../../',a.image,'article-image',true)}<div class="article-layout"><aside class="article-toc"><details class="toc-details" open><summary>В этом материале</summary><nav aria-label="Содержание статьи">${a.sections.map(([id,t])=>`<a href="#${id}">${t}</a>`).join('')}</nav></details>${textLink('Обсудить мой заказ','#contact')}</aside><article class="article-body">${a.sections.map(([id,t,body])=>`<section id="${id}"><h2>${t}</h2>${body}</section>`).join('')}<div class="article-offer"><p class="eyebrow">От информации — к изделию</p><h2>${service.name} под вашу задачу</h2><p>Помогу с конструкцией, образцом и организацией тиража для вашей компании.</p>${button('Подробнее об изготовлении',`../../${service.slug}/`)}</div></article></div><section class="reading section"><div class="section-heading">${label('Читайте дальше')}<h2>Ещё по теме</h2></div><div class="reading-list">${related.map(r=>`<a class="reading-link" href="../${r.slug}/"><span class="reading-category">${r.category}</span><h3>${r.title}</h3>${arrow}</a>`).join('')}</div>${textLink('Все материалы','../')}</section></div>`;
}

const about=`<div class="container"><section class="hero about-hero"><div class="hero-copy">${label('Динар Динмухаметов')}<h1>Знаю<br>производство.<br><em>Понимаю<br>вашу задачу.</em></h1><p class="hero-description">С 2001 года работаю в рекламных агентствах и рекламно-производственных компаниях. Помогаю пройти путь от идеи изделия до образца и готового тиража.</p><div class="actions">${button('Обсудить задачу')}</div></div><div class="about-photo">${portrait('../','',true)}<span>Лично. От разговора до тиража.</span></div></section>
<section class="section about-story">${label('Практический опыт')}<div><h2>Понимать материал.<br><em>Задавать точные вопросы.</em></h2><p class="body-large">Моя работа — соединять задачу заказчика с возможностями производства. Разобраться в изделии, сравнить решения и вовремя заметить то, что стоит проверить на образце.</p><p>В моём опыте — картон, полиграфия, упаковка, пластик и металл. Я работал в рекламных агентствах и производственных компаниях, поэтому понимаю и требования к внешнему виду, и вопросы изготовления.</p><div class="brand-experience"><p class="eyebrow">Бренды в моём профессиональном опыте</p><p class="brand-names">Ferrero · Mars · Unilever<br>Nivea · Old Spice · Фрутоняня</p><p class="muted">Проекты в составе рекламных агентств и производственных компаний.</p></div><h3>Картонные конструкции: от брифа до макета</h3><p>В Display Design Company (2008–2013) вёл заказы на напольные дисплеи, картонные конструкции и паллетные выкладки. Участвовал в разработке с конструкторами, подготовке полноразмерных макетов и контроле изготовления. В производственном опыте этого периода — конструкции для Nivea, Ferrero, Фрутоняни и Old Spice.</p><h3>Проекты для Ferrero и Mars</h3><p>В MS&amp;co (2018–2021) и ЭмЭсПро работал с клиентскими задачами Ferrero и Mars: от входящего брифа и коммерческого предложения до сопровождения заказа. В моей практике — припаки и решения для выкладки товара, где важны конструкция, комплектация и удобство в торговой точке.</p><h3>Тендеры и производство для крупных компаний</h3><p>В InnerWorkings Rus (2013–2017) организовывал тендеры и закупки, согласование образцов, контроль качества и сроков поставки, в том числе для Unilever и Reckitt Benckiser. Этот опыт помогает тщательно проверять состав изделия и производственные решения до запуска.</p><h3>Личное ведение сложных задач</h3><p>Начинал в рекламном агентстве «Светофор» в 2001 году, затем руководил производственным отделом. В дальнейшем работал в TTG Production и «Ритейл Сервис» с проектами полного цикла. Сегодня этот опыт применяю к вашей упаковке: уточнить исходные данные, проверить образец и довести согласованное решение до изготовления.</p><p class="muted">Здесь приведён мой опыт работы по найму, а не перечень текущих заказчиков личного сайта. Названия брендов не означают действующее партнёрство.</p></div></section></div>
<section class="belief-band"><div class="container">${label('Мой подход')}<h2>Важен красивый замысел.<br>И то, как изделие будет<br><em>собрано, упаковано<br>и использовано.</em></h2></div></section>
<div class="container"><section class="section about-principles"><article><h3>Один собеседник на всём пути</h3><p>Я лично разбираюсь в задаче и сопровождаю разработку, образцы и изготовление. Вы знаете, к кому обратиться с вопросом на любом этапе.</p></article><article><h3>Решение проверяем на образце</h3><p>Сначала примеряем продукт, уточняем конструкцию и выбираем материалы. Затем согласуем внешний вид и спецификацию, по которой рассчитывается тираж.</p></article></section>${process}${terms}</div>`;

const pages=[
  ['', 'Коробки и дисплеи на заказ — разработка и изготовление образца','Разработка конструкции, изготовление образца и организация тиража коробок, шоубоксов и стоек для компаний. Разработку и образец можно заказать отдельно.',home],
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
<meta name="robots" content="index, follow"><meta name="theme-color" content="#f7f5ef">
<title>${title}</title><meta name="description" content="${description}">
<link rel="canonical" href="https://dinar.moscow/${slug ? slug+'/' : ''}">
<meta property="og:type" content="website"><meta property="og:locale" content="ru_RU">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}">
<meta property="og:url" content="https://dinar.moscow/${slug ? slug+'/' : ''}"><meta property="og:image" content="https://dinar.moscow/assets/${slug==='about'?'dinar-portrait-v04':products.find(item=>item.slug===slug)?.image||articles.find(item=>'articles/'+item.slug===slug)?.image||'white-insert'}.webp">
<link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${p}assets/fonts/manrope-variable.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="${p}assets/style.css"><script src="${p}assets/site.js" defer></script><script src="${p}assets/consent-metrika.js" defer></script>
</head><body class="${slug.startsWith('articles/')?'article-page':slug||'home'}">
<a class="skip" href="#main">К содержанию</a>
<header class="header container"><a class="brand" href="${p}" aria-label="Динар — главная">Динар<span>.</span><small>Динмухаметов</small></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="navigation" hidden>Меню <span aria-hidden="true">+</span></button>
<nav id="navigation" aria-label="Основная навигация">${nav}<a class="nav-contact" href="#contact">Обсудить задачу ${arrow}</a></nav></header>
<main id="main">${body}${contact(p)}</main>
<footer class="footer container"><a class="brand" href="${p}">Динар<span>.</span></a><p>Упаковка и картонные дисплеи.<br>Личное ведение заказа.</p><p>© 2026 Динар Динмухаметов<br><a href="${p}privacy/">О данных на сайте</a></p></footer>
</body></html>`;
  await mkdir(new URL(slug?slug+'/':'./',root),{recursive:true});
  await writeFile(new URL((slug?slug+'/':'')+'index.html',root),html);
}
await writeFile(new URL('sitemap.xml',root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([slug])=>`  <url><loc>https://dinar.moscow/${slug ? slug+'/' : ''}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(new URL('robots.txt',root), 'User-agent: *\nAllow: /\nSitemap: https://dinar.moscow/sitemap.xml\n');
console.log(`v06: ${pages.length} страниц созданы в public/`);

