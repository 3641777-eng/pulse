const BLOCKS = [
  { id:'inertia', name:'Барьеры изменений', risk:'Психологическая инерция', short:'Инерция',
    base:['Я считаю, что старые методы работы надежнее новых.','Я предпочитаю сначала посмотреть, как новшество внедрят у других, и только потом пробовать самому.','Мне сложно менять привычный порядок действий, даже если новый способ быстрее.','Я часто слышу в коллективе фразу «мы всегда так делали».','Если бы я мог выбрать, я бы оставил всё как есть.','Обучение новым методам кажется мне пустой тратой времени.'],
    levels:[2.49,3.5], recommendation:{low:'Поддерживайте пилотирование новых методов и регулярно пересматривайте стандарты.',medium:'Проведите аудит устаревших стандартов, выберите один процесс для пилота и организуйте перекрестное обучение.',high:'Запустите аудит «застывших» практик, назначьте владельца обновления стандартов и проверьте результат через 8–12 недель.'}},
  { id:'burnout', name:'Энергия и истощение', risk:'Профессиональное выгорание', short:'Выгорание',
    base:['После рабочего дня я чувствую себя эмоционально опустошенным.','Я стал(а) циничнее относиться к работе и коллегам.','Мне кажется, что моя работа не имеет смысла.','Я делаю свои задачи «на автомате», без интереса.','У меня нет сил на дополнительные задачи, даже если они важны.','Я задумываюсь об увольнении или смене работы.'],
    levels:[2.49,3.5], recommendation:{low:'Сохраняйте регулярный контроль нагрузки и возможность восстановления.',medium:'Проверьте сверхурочную нагрузку, добавьте ротацию функций и ежемесячный короткий опрос состояния.',high:'Ограничьте сверхурочные, перераспределите критическую нагрузку, подключите поддержку и повторите оценку через 8 недель.'}},
  { id:'deviance', name:'Климат и нормы поведения', risk:'Девиантное поведение', short:'Нормы поведения',
    base:['В коллективе есть люди, которым «всё сходит с рук».','Я замечал(а) случаи несправедливого распределения задач или премий.','Я не доверяю своему руководителю в вопросах справедливости.','В коллективе есть конфликты, которые открыто не обсуждаются.','Я боюсь, что если сообщу о проблеме, меня накажут, а не помогут.','Мне кажется, что некоторые коллеги намеренно вредят проекту.'],
    levels:[2.49,3.49], recommendation:{low:'Поддерживайте прозрачные правила, единые требования и безопасную обратную связь.',medium:'Проверьте слепые зоны контроля, правила эскалации и равномерность применения норм.',high:'Организуйте независимую проверку, защищенный канал сообщений и пересмотрите KPI, создающие конфликт качества и сроков.'}},
  { id:'helpless', name:'Вера в результат', risk:'Выученная беспомощность', short:'Вера в результат',
    base:['Мои предложения по улучшению никогда не принимаются.','Что бы я ни сделал, всё равно всё решит руководство.','Нет смысла предлагать идеи, всё равно ничего не изменится.','Я перестал(а) верить, что изменения могут улучшить мою работу.','Я предпочитаю молчать на собраниях, чтобы не выглядеть глупо.','Мне кажется, что от меня ничего не зависит на работе.'],
    levels:[2,3], recommendation:{low:'Сохраняйте прозрачную обратную связь по предложениям и показывайте результаты инициатив.',medium:'Определите зоны влияния сотрудников, отвечайте на предложения в течение 10 рабочих дней и реализуйте одно улучшение за 2–4 недели.',high:'Проведите анонимные интервью, проверьте реакцию руководителей на инициативы, передайте сотрудникам ограниченные полномочия и повторите диагностику через 8–12 недель.'}}
];

const DEPARTMENTS = [
  ['management','Руководители'],['warehouse','Склад и логистика'],['it','ИТ-служба'],['production','Производство'],
  ['procurement','Отдел закупок'],['engineering','Инженерно-технические работники'],['hr','Служба управления персоналом'],
  ['security','Служба безопасности'],['hse','Служба охраны труда и промышленной безопасности'],
  ['planning','Планово-экономический отдел'],['maintenance','Ремонтная служба'],['quality','Служба качества']
].map(([id,name])=>({id,name}));

const SPECIAL = {
inertia:[
['management','Я замечаю, что мои подчиненные сопротивляются новым методам, даже если они объективно быстрее.','Я сам(а) считаю, что старые проверенные методы надежнее новых, и предпочитаю не рисковать.'],
['warehouse','В работе склада есть операции, которые делаются «по привычке», хотя их можно упростить.','Если бы мне предложили изменить порядок хранения, я бы отнесся(лась) к этому скептически.'],
['it','Пользователи часто просят вернуть старую версию программы или обходят новую систему.','Я считаю, что большинство цифровых изменений на предприятии — это лишняя суета.'],
['production','В цехе есть операции, которые выполняются «как всегда», хотя стандарт изменился.','Я уверен(а), что мой опыт важнее любых новых инструкций.'],
['procurement','Мы продолжаем работать с теми же поставщиками, даже когда есть более выгодные предложения.','Мне комфортнее работать с проверенными партнерами, чем искать новых.'],
['engineering','Я использую те же методы расчетов и проектирования, что и 5 лет назад, потому что они работают.','Новые методики в моей работе — это скорее риск, чем возможность.'],
['hr','При подборе персонала мы опираемся на те же критерии, что и много лет назад.','Я считаю, что старые кадры надежнее, чем новые подходы к найму.'],
['security','Правила безопасности не пересматривались годами, даже если оборудование изменилось.','Я считаю, что если раньше не было аварий, то и менять ничего не надо.'],
['hse','Инструктажи проводятся по старым шаблонам, без учета новых рисков.','Я считаю, что новые методы обучения — это лишняя трата времени.'],
['planning','Планы составляются по старым шаблонам, без учета реальной динамики процессов.','Я предпочитаю проверенные методы планирования, даже если они дают погрешность.'],
['maintenance','При ремонте мы используем те же приемы, что и 10 лет назад, даже если есть новые инструменты.','Я считаю, что кустарные методы иногда надежнее заводских.'],
['quality','Контрольные операции выполняются по старым стандартам, хотя продукция изменилась.','Я уверен(а), что старые методы контроля точнее новых.']],
burnout:[
['management','Я замечаю, что мои подчиненные выполняют задачи механически, без интереса.','Я сам(а) чувствую, что выкладываюсь на работе больше, чем получаю отдачи.'],
['warehouse','В последние месяцы я замечаю, что мне намного стало чаще ошибаться в простых операциях.','Я чувствую, что монотонность работы убивает мой интерес к ней.'],
['it','Я замечаю, что пользователи перестали обращаться за помощью, даже когда она нужна.','Мне кажется, что моя работа никому не нужна, я просто «затыкаю дыры».'],
['production','В цехе участились случаи, когда люди просто «отбывают смену» без энтузиазма.','Я чувствую, что работа стала для меня просто способом дожить до зарплаты.'],
['procurement','Я замечаю, что коллеги перестали искать выгодные предложения и работают «на автомате».','Постоянное давление по срокам и бюджету выматывает меня.'],
['engineering','Я замечаю, что мои коллеги перестали предлагать улучшения, хотя раньше были инициативными.','Я устал(а) от постоянных «авралов» и не вижу конца этому.'],
['hr','Я замечаю, что сотрудники всё чаще берут больничные без явных причин.','Я устал(а) от того, что увольнения и конфликты стали рутиной.'],
['security','Я замечаю, что сотрудники игнорируют мелкие нарушения, потому что «всем всё равно».','Я чувствую, что моя работа — это борьба с ветряными мельницами.'],
['hse','Я замечаю, что инструктажи воспринимаются как формальность, никто не слушает.','Я устал(а) повторять одно и то же и чувствую, что это никому не нужно.'],
['planning','Я замечаю, что мои коллеги перестали углубляться в цифры и работают поверхностно.','Я чувствую, что мои расчеты никому не нужны, всё равно всё решает руководство.'],
['maintenance','Я замечаю, что в бригаде растет безразличие к качеству: «и так сойдет».','Я чувствую, что после каждой смены я эмоционально выжат.'],
['quality','Я замечаю, что инспекторы стали пропускать мелкие дефекты, которые раньше не пропускали.','Я устал(а) быть плохим полицейским для производства.']],
deviance:[
['management','Я замечаю, что некоторые сотрудники получают поблажки, которых нет у других.','Я считаю, что некоторые нарушения «спускаются» сверху, потому что так удобно.'],
['warehouse','Я замечаю случаи, когда недостачи списываются на «естественную убыль», хотя причины неясны.','Я считаю, что некоторые коллеги могут присвоить продукцию без последствий.'],
['it','Я замечаю попытки обойти систему безопасности: логины, пароли, доступы.','Я считаю, что правила информационной безопасности часто мешают работе.'],
['production','Я замечаю, что некоторые рабочие намеренно портят оборудование или сырье.','Я считаю, что если бы я сообщил(а) о нарушении, меня бы наказали, а не помогли.'],
['procurement','Я замечаю, что некоторые закупки проводятся через «своих» поставщиков без анализа рынка.','Я считаю, что в закупках есть откаты, и с этим ничего не поделать.'],
['engineering','Я замечаю, что некоторые технические решения принимаются под давлением, а не по расчету.','Я считаю, что если я откажусь подписать сомнительное решение, меня накажут.'],
['hr','Я замечаю, что при найме есть «свои люди», которые закрываются вакансиями быстрее других.','Я считаю, что фаворитизм в кадровых решениях — это норма.'],
['security','Я замечаю, что некоторые нарушения не фиксируются, чтобы не портить отчетность.','Я считаю, что если я зафиксирую нарушение, это создаст мне проблемы.'],
['hse','Я замечаю, что сотрудники намеренно не надевают СИЗ, чтобы быстрее закончить работу.','Я считаю, что сообщать о нарушении ТБ бесполезно: руководство закроет глаза.'],
['planning','Я замечаю, что цифры в отчетах подгоняются под нужный результат.','Я считаю, что если я откажусь подписать цифры, меня уволят.'],
['maintenance','Я замечаю, что некоторые ремонты делаются «для галочки», без реального устранения проблемы.','Я считаю, что проще сделать быстро и формально, чем честно и дорого.'],
['quality','Я замечаю случаи, когда с браком «договариваются» неофициально.','Я считаю, что сообщать о браке бесполезно: руководство всё равно решит по-своему.']],
helpless:[
['management','Я замечаю, что мои подчиненные перестали предлагать идеи и просто ждут указаний.','Я считаю, что уже ничего всё равно не улучшится при принятии решений.'],
['warehouse','Я замечаю, что коллеги не участвуют в обсуждении улучшений, даже когда их спрашивают.','Я считаю, что предлагать идеи бессмысленно — ничего не изменится.'],
['it','Я замечаю, что пользователи перестали сообщать о проблемах в системе.','Я считаю, что мои предложения по улучшению системы игнорируются.'],
['production','Я замечаю, что рабочие не участвуют в кружках качества и собраниях.','Я считаю, что мой голос ничего не решает в производстве.'],
['procurement','Я замечаю, что коллеги перестали искать альтернативы и просто выполняют заявки.','Я считаю, что мои предложения по оптимизации закупок не нужны.'],
['engineering','Я замечаю, что коллеги перестали углубляться в расчеты и делают только минимально необходимое.','Я считаю, что моя работа — это просто выполнение приказов.'],
['hr','Я замечаю, что сотрудники всё чаще берут больничные без явных причин.','Я считаю, что если я подниму вопрос о проблемах, меня не поддержат.'],
['security','Я замечаю, что сотрудники перестали сообщать об инцидентах и «тихо закрывают» их.','Я считаю, что сообщать о рисках бессмысленно — руководство не реагирует.'],
['hse','Я замечаю, что сотрудники не участвуют в расследованиях инцидентов.','Я считаю, что мои предложения по улучшению безопасности не примут ни к чему.'],
['planning','Я замечаю, что коллеги перестали анализировать данные и просто делают отчеты.','Я считаю, что моя аналитика никому не нужна.'],
['maintenance','Я замечаю, что бригада не предлагает улучшений, даже когда очевидно, что процесс неэффективен.','Я считаю, что если я предложу что-то новое, меня высмеют.'],
['quality','Я замечаю, что инспекторы перестали предлагать изменения в стандарты контроля.','Я считаю, что мои предложения по улучшению качества проигнорируются.']]
};

const SCALE = ['Совершенно не согласен','Скорее не согласен','И согласен, и не согласен','Скорее согласен','Полностью согласен'];
const STORAGE='pulse40-prototype-v1';
const defaults={screen:'home',profile:{company:'',industry:'',projectTypes:[],stage:'',departments:[]},answers:{},questionIndex:0,startedAt:null,completedAt:null};
let state=load();
const app=document.querySelector('#app');
const status=document.querySelector('#headerStatus');
const dialog=document.querySelector('#infoDialog');

function load(){try{return {...structuredClone(defaults),...JSON.parse(localStorage.getItem(STORAGE)||'{}')}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function department(id){return DEPARTMENTS.find(d=>d.id===id)}
function questions(){return BLOCKS.flatMap(block=>[
  ...block.base.map((text,i)=>({id:`${block.id}-b${i+1}`,block:block.id,text,type:'base'})),
  ...SPECIAL[block.id].filter(r=>state.profile.departments.includes(r[0])).flatMap(r=>[1,2].map(n=>({id:`${block.id}-${r[0]}-${n}`,block:block.id,text:r[n],type:'special',department:r[0]})))
])}
function esc(s=''){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function render(){status.textContent=state.screen==='survey'?'Ответы сохраняются автоматически':state.screen==='results'?'Результат сформирован':'Анонимная сессия'; ({home,profile,departments,survey,results}[state.screen]||home)(); window.scrollTo({top:0,behavior:'smooth'})}
function stepper(active){return `<div class="stepper" aria-label="Шаг ${active} из 3">${[1,2,3].map(i=>`<span class="${i<active?'done':i===active?'active':''}"></span>`).join('')}</div>`}

function home(){
  const resume=Object.keys(state.answers).length>0;
  app.innerHTML=`<section class="page hero"><div><p class="eyebrow">Диагностика изменений</p><h1>Проверьте, где изменения теряют импульс.</h1><p class="lead">PULSE 4.0 показывает психологические риски проекта и добавляет вопросы для выбранных подразделений. Индивидуальные ответы остаются анонимными.</p><div class="actions"><button class="button primary" data-action="start">${resume?'Продолжить диагностику':'Начать диагностику'}</button><button class="button ghost" data-action="method">Как это работает</button></div></div><aside class="hero-panel"><div class="metric"><b>4</b><span>обязательных диагностических блока</span></div><div class="metric"><b>6+2</b><span>базовых вопросов плюс два на каждое выбранное подразделение</span></div><div class="metric"><b>1–5</b><span>единая шкала согласия без правильных и неправильных ответов</span></div></aside></section>`
}

function profile(){
  const p=state.profile;
  const projectTypes=['Внедрение ERP / MES / WMS','Автоматизация и ИИ','Цифровизация процессов','Lean-инструменты','Изменение оргструктуры','Изменение мотивации / KPI','Система безопасности','Обучение и наставничество'];
  app.innerHTML=`<section class="page"><p class="eyebrow">Шаг 1 из 3</p><div class="section-head"><div><h2>Контекст проекта</h2><p>Это помогает связать результат с реальными изменениями. Название организации можно не указывать.</p></div></div>${stepper(1)}<form id="profileForm" class="card" style="padding:clamp(24px,5vw,48px)"><div class="form-grid"><div class="field"><label for="company">Организация <span class="muted">необязательно</span></label><input id="company" name="company" value="${esc(p.company)}" placeholder="Например, производственная компания"></div><div class="field"><label for="industry">Отрасль</label><select id="industry" name="industry" required><option value="">Выберите отрасль</option>${['Машиностроение','Металлургия','Химическая промышленность','Пищевая промышленность','Энергетика','Логистика','ИТ и телеком','Другое'].map(x=>`<option ${p.industry===x?'selected':''}>${x}</option>`).join('')}</select></div><fieldset class="field full"><legend>Тип проекта</legend><div class="choice-grid">${projectTypes.map((x,i)=>`<div class="choice"><input id="pt${i}" type="checkbox" name="projectType" value="${x}" ${p.projectTypes.includes(x)?'checked':''}><label for="pt${i}">${x}</label></div>`).join('')}</div></fieldset><div class="field full"><label for="stage">Стадия проекта</label><select id="stage" name="stage" required><option value="">Выберите стадию</option>${['Только планируется','Запущен, но идет тяжело','Завершен, но эффект откатился','Завершен успешно, нужна профилактика'].map(x=>`<option ${p.stage===x?'selected':''}>${x}</option>`).join('')}</select></div></div><div class="actions"><button type="button" class="button ghost" data-action="home">Назад</button><button class="button primary" type="submit">Выбрать подразделения</button></div></form></section>`
}

function departments(){
 const selected=state.profile.departments;
 app.innerHTML=`<section class="page"><p class="eyebrow">Шаг 2 из 3</p><div class="section-head"><div><h2>Какие подразделения затрагивает проект?</h2><p>Можно выбрать несколько. Для каждого PULSE добавит по два специальных вопроса в каждый блок.</p></div></div>${stepper(2)}<div class="choice-grid">${DEPARTMENTS.map((d,i)=>`<div class="choice"><input id="dep${i}" type="checkbox" value="${d.id}" ${selected.includes(d.id)?'checked':''}><label for="dep${i}">${d.name}</label></div>`).join('')}</div><div class="selection-summary" id="selectionSummary"></div><div class="actions"><button class="button ghost" data-action="back-profile">Назад</button><button class="button primary" data-action="begin-survey" ${selected.length?'':'disabled'}>Перейти к вопросам</button></div></section>`; updateSelectionSummary()
}
function updateSelectionSummary(){const el=document.querySelector('#selectionSummary');if(!el)return;const n=state.profile.departments.length;el.innerHTML=n?`<strong>${n} ${plural(n,'подразделение','подразделения','подразделений')}</strong><span>•</span><span>${24+8*n} вопросов</span><span>•</span><span>примерно ${Math.max(6,Math.round((24+8*n)*.22))} минут</span>`:'Выберите хотя бы одно подразделение'}
function plural(n,a,b,c){const x=n%10,y=n%100;return x===1&&y!==11?a:x>=2&&x<=4&&(y<10||y>=20)?b:c}

function survey(){
 const qs=questions(); if(!qs.length){state.screen='departments';return render()}
 state.questionIndex=Math.max(0,Math.min(state.questionIndex,qs.length-1)); const q=qs[state.questionIndex]; const block=BLOCKS.find(b=>b.id===q.block); const answered=Object.keys(state.answers).filter(k=>qs.some(q=>q.id===k)).length; const blockIndex=BLOCKS.findIndex(b=>b.id===block.id); const blockQs=qs.filter(x=>x.block===block.id); const blockPos=blockQs.findIndex(x=>x.id===q.id)+1;
 const choice=state.answers[q.id];
 app.innerHTML=`<section class="page survey-shell"><aside class="survey-nav"><p class="eyebrow">Диагностика</p><div class="progress"><i style="width:${answered/qs.length*100}%"></i></div><div class="progress-text"><span>${answered} из ${qs.length}</span><span>${Math.round(answered/qs.length*100)}%</span></div><ol>${BLOCKS.map((b,i)=>`<li data-index="${i+1}" class="${i<blockIndex?'done':i===blockIndex?'active':''}">${b.name}</li>`).join('')}</ol></aside><div><article class="card question-card"><div class="question-meta"><span>${block.name}</span><span>${q.type==='base'?'Базовый вопрос':department(q.department).name}</span></div><h2>${q.text}</h2><div class="scale" role="radiogroup" aria-label="Степень согласия">${SCALE.map((label,i)=>`<div><input id="v${i+1}" type="radio" name="answer" value="${i+1}" ${choice===i+1?'checked':''}><label for="v${i+1}"><b>${i+1}</b><span>${label}</span></label></div>`).join('')}</div></article><div class="progress-text"><span>Вопрос ${state.questionIndex+1} из ${qs.length}</span><span>${blockPos} из ${blockQs.length} в блоке</span></div><div class="survey-controls"><button class="button ghost" data-action="prev-question" ${state.questionIndex===0?'disabled':''}>Назад</button><button class="button primary" data-action="next-question" ${choice?'':'disabled'}>${state.questionIndex===qs.length-1?'Показать результат':'Далее'}</button></div></div></section>`
}

function avg(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function level(block,score){return score<=block.levels[0]?'low':score<=block.levels[1]?'medium':'high'}
function labelLevel(l){return l==='low'?'Низкий':l==='medium'?'Средний':'Высокий'}
function resultsData(){return BLOCKS.map(block=>{const base=block.base.map((_,i)=>state.answers[`${block.id}-b${i+1}`]);const score=avg(base);const signals=state.profile.departments.map(dep=>{const value=avg([state.answers[`${block.id}-${dep}-1`],state.answers[`${block.id}-${dep}-2`]]);return{dep,value,level:value<=2.49?'low':value<=3.49?'medium':'high'}});return{block,score,level:level(block,score),signals}})}

function results(){
 const data=resultsData(); const sorted=[...data].sort((a,b)=>b.score-a.score); const date=new Date(state.completedAt||Date.now()).toLocaleDateString('ru-RU');
 app.innerHTML=`<section class="page"><div class="results-hero"><div><p class="eyebrow">Результат PULSE 4.0</p><h1 style="font-size:clamp(40px,6vw,74px)">Карта рисков проекта</h1><p class="lead">Диагностический ориентир для планирования изменений, а не оценка отдельных сотрудников.</p></div><div class="muted">${date}<br>${state.profile.company?esc(state.profile.company):'Анонимный проект'}</div></div><div class="actions"><button class="button dark" data-action="print">Сохранить PDF</button><button class="button ghost" data-action="restart">Пройти заново</button></div><div class="score-grid">${data.map(x=>`<article class="score-card"><span class="risk-pill risk-${x.level}">${labelLevel(x.level)} риск</span><h3>${x.block.short}</h3><div class="score"><strong>${x.score.toFixed(1)}</strong><span>/ 5</span></div></article>`).join('')}</div><div class="section-head"><div><p class="eyebrow">Детализация</p><h2>Что требует внимания</h2></div><p>Общий балл построен по шести базовым вопросам. Подразделенческие показатели — отдельные локальные сигналы по двум вопросам.</p></div>${sorted.map(x=>`<article class="card result-block"><div class="result-block-head"><div><span class="risk-pill risk-${x.level}">${labelLevel(x.level)} уровень</span><h3>${x.block.risk}</h3></div><strong>${x.score.toFixed(1)}</strong></div><div class="signal-list">${x.signals.map(s=>`<div class="signal"><span>${department(s.dep).name}</span><b class="risk-pill risk-${s.level}">${s.value.toFixed(1)}</b></div>`).join('')}</div><div class="recommendation"><h3>Рекомендуемое действие</h3><p>${x.block.recommendation[x.level]}</p><p class="muted">Контрольный срок: ${x.level==='high'?'8 недель':x.level==='medium'?'4 недели':'ежеквартально'}.</p></div></article>`).join('')}<section style="margin-top:60px"><p class="eyebrow">План минимизации</p><h2>Первые действия</h2><div class="card" style="overflow:hidden"><table class="plan-table"><thead><tr><th>Риск</th><th>Действие</th><th>Срок</th><th>Метрика</th></tr></thead><tbody>${sorted.slice(0,3).map(x=>`<tr><td>${x.block.short}</td><td>${x.block.recommendation[x.level]}</td><td>${x.level==='high'?'8 недель':'4 недели'}</td><td>Повторный балл и доля выполненных действий</td></tr>`).join('')}</tbody></table></div></section><p class="muted" style="margin-top:28px">Версия банка вопросов 1.1 · Алгоритм 1.0 · Результаты специальных вопросов не входят в общий балл.</p></section>`
}

document.addEventListener('change',e=>{
 if(e.target.name==='answer'){const q=questions()[state.questionIndex];state.answers[q.id]=Number(e.target.value);save();survey()}
 if(e.target.closest('.choice-grid')&&e.target.type==='checkbox'&&e.target.value&&DEPARTMENTS.some(d=>d.id===e.target.value)){state.profile.departments=[...document.querySelectorAll('.choice-grid input:checked')].map(x=>x.value);save();document.querySelector('[data-action="begin-survey"]').disabled=!state.profile.departments.length;updateSelectionSummary()}
});

document.addEventListener('submit',e=>{if(e.target.id==='profileForm'){e.preventDefault();const f=new FormData(e.target);state.profile.company=f.get('company').trim();state.profile.industry=f.get('industry');state.profile.projectTypes=f.getAll('projectType');state.profile.stage=f.get('stage');if(!state.profile.projectTypes.length){toast('Выберите хотя бы один тип проекта');return}state.screen='departments';save();render()}});

document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(a==='home'){state.screen='home';save();render()}
 if(a==='start'){state.screen=state.profile.stage?'departments':'profile';save();render()}
 if(a==='back-profile'){state.screen='profile';save();render()}
 if(a==='begin-survey'){state.screen='survey';state.startedAt=state.startedAt||new Date().toISOString();state.questionIndex=0;save();render()}
 if(a==='prev-question'){state.questionIndex--;save();survey()}
 if(a==='next-question'){const qs=questions(),q=qs[state.questionIndex];if(!state.answers[q.id])return toast('Выберите вариант ответа');if(state.questionIndex<qs.length-1){state.questionIndex++;save();survey()}else{state.completedAt=new Date().toISOString();state.screen='results';save();results()}}
 if(a==='restart'){if(confirm('Начать новую диагностику? Текущие ответы будут удалены.')){state=structuredClone(defaults);save();render()}}
 if(a==='print'){window.print()}
 if(a==='privacy')showDialog('<h2>Как защищены данные</h2><p>Прототип не запрашивает ФИО, табельный номер или личную почту. Ответы хранятся только в локальном хранилище этого браузера и никуда не отправляются.</p><p>В рабочей системе результаты подразделений следует показывать только для групп от пяти завершенных анкет.</p>')
 if(a==='method')showDialog('<h2>Как работает PULSE 4.0</h2><p>Сначала вы описываете проект и выбираете подразделения. Затем проходите четыре блока. В каждом блоке есть шесть базовых вопросов и по два специальных вопроса для каждого выбранного подразделения.</p><p>Базовые вопросы формируют общий уровень риска. Специальные вопросы показываются отдельно как локальные сигналы.</p>')
 if(a==='close-dialog')dialog.close()
});

function showDialog(html){document.querySelector('#dialogContent').innerHTML=html;dialog.showModal()}
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
render();
