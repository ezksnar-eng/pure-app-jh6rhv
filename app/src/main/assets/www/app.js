/* ============================================================
   تطبيق مانجا بيور — app.js
   ============================================================ */

/* ---------- أيقونات SVG بسيطة ---------- */
const ICON = {
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r="0.6" fill="currentColor"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3-2 4-2 7a4 4 0 008 0c1.5 2 2 4 2 6a8 8 0 11-16 0c0-4 2-6 4-9 1 1 1 2 2 2 .5-2-1-4 2-6z"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/><circle cx="3.5" cy="18" r="1" fill="currentColor"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  bars:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="20" x2="6" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="14"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4 6 4c2.2 0 3.7 1.3 6 4 2.3-2.7 3.8-4 6-4 4 0 5.5 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>',
  heartFilled:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4 6 4c2.2 0 3.7 1.3 6 4 2.3-2.7 3.8-4 6-4 4 0 5.5 4 4 7.7C19.5 16.4 12 21 12 21z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13"/><polyline points="7 12 12 17 17 12"/><line x1="4" y1="20" x2="20" y2="20"/></svg>',
  downloadDone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M6 12l4 4 8-9"/></svg>',
  puzzle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4h4v2.5a1.5 1.5 0 003 0V4h4v4h-2.5a1.5 1.5 0 000 3H21v4h-4v-2.5a1.5 1.5 0 00-3 0V17h-4v-4H7.5a1.5 1.5 0 000-3H10V4z"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V8"/><polyline points="7 13 12 8 17 13"/><line x1="4" y1="4" x2="20" y2="4"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 007.1 0l3-3a5 5 0 00-7.1-7.1l-1.5 1.4"/><path d="M14 10a5 5 0 00-7.1 0l-3 3a5 5 0 007.1 7.1l1.4-1.4"/></svg>',
};

/* ---------- أدوات عامة ---------- */
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function esc(s){ return (s||'').toString().replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function fileToDataURL(file){ return new Promise(res=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(file); }); }
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(window.__toastT);
  window.__toastT=setTimeout(()=>t.classList.remove('show'),1800);
}

/* ============================================================
   بيانات شخصية للمستخدم (مفضلة / تقييمي / قرأتها / آخر فتح)
   تُحفظ دائماً محلياً على جهاز كل مستخدم — حتى لو المكتبة نفسها
   مشتركة عبر Supabase، لأن هذي بيانات خاصة بكل شخص لحاله.
   ============================================================ */
const Personal = (function(){
  const KEY='pm_personal_v1';
  function all(){ try{ return JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ return {}; } }
  function save(o){ localStorage.setItem(KEY, JSON.stringify(o)); }
  function get(workId){
    const d = all()[workId];
    return Object.assign({listStatus:null, userRating:0, readChapterIds:[], lastOpened:0}, d||{});
  }
  function set(workId, patch){
    const a = all();
    a[workId] = Object.assign(get(workId), patch);
    save(a);
    return a[workId];
  }
  return {get, set};
})();

/* القوائم المخصصة — محلية أيضاً لكل مستخدم */
const CustomLists = (function(){
  const KEY='pm_lists_v1';
  function all(){ try{ return JSON.parse(localStorage.getItem(KEY))||[]; }catch(e){ return []; } }
  function save(a){ localStorage.setItem(KEY, JSON.stringify(a)); }
  function create(name){ const a=all(); const l={id:uid(), name, workIds:[]}; a.push(l); save(a); return l; }
  function remove(id){ save(all().filter(l=>l.id!==id)); }
  function toggleWork(listId, workId){
    const a=all(); const l=a.find(x=>x.id===listId); if(!l) return;
    const i=l.workIds.indexOf(workId);
    if(i>=0) l.workIds.splice(i,1); else l.workIds.push(workId);
    save(a);
  }
  return {all, create, remove, toggleWork};
})();

/* ---------- بيانات مبدئية عند أول تشغيل (وضع محلي فقط) ---------- */
async function seedIfEmpty(){
  if(Store.isShared) return; // لا نملأ بيانات تجريبية على مكتبة مشتركة حقيقية
  const works = await Store.getWorks();
  if(works.length) return;
  const demo = [
    {title:'ظل التاج المفقود', titleEn:'Shadow of the Lost Crown', type:'مانهوا', status:'مستمر', genres:['أكشن','خيال','دراما'], desc:'بعد أن فقد عرشه في ليلة واحدة، يخوض الأمير كيان رحلة انتقام عبر ممالك مظلمة، حاملاً سراً قد يقلب موازين القوى في القارة بأكملها.', source:'ويب تون', sourceUrl:'https://example.com/shadow-of-the-lost-crown', publisher:'استوديو بيور', from:'2025', chapterCount:32},
    {title:'أكاديمية السحرة الصامتين', titleEn:'Silent Mages Academy', type:'مانجا', status:'مكتمل', genres:['مدرسي','خيال','كوميديا'], desc:'في أكاديمية يُمنع فيها الكلام أثناء استخدام السحر، تكتشف الطالبة نور موهبة نادرة تجعلها محط أنظار الجميع.', source:'مانجا ويب', sourceUrl:'', publisher:'دار نشر الفجر', from:'2023', chapterCount:87},
    {title:'قلب من حديد', titleEn:'Heart of Iron', type:'مانهوا', status:'مستمر', genres:['أكشن','رياضة'], desc:'حارس مرمى سابق يعود للملاعب بعد إصابة كادت تنهي مسيرته، ليواجه فريقاً جديداً وحلماً قديماً لم يمت بعد.', source:'ويب تون', sourceUrl:'https://example.com/heart-of-iron', publisher:'استوديو بيور', from:'2024', chapterCount:19, nextReleaseDate:''},
  ];
  for(const d of demo){
    const w = Object.assign({
      id:uid(), cover:null, chapters:d.chapterCount, avgRating:(7+Math.random()*2),
      dist:null, nextReleaseDate:'', createdAt:Date.now(), updatedAt:Date.now()
    }, d);
    w.dist = seededDist(w.id);
    await Store.putWork(w);
    const chN = Math.min(w.chapterCount, 12);
    for(let i=1;i<=chN;i++){
      await Store.putChapter({id:uid(), workId:w.id, number:i, title:'', sourceUrl:'', pages:[], createdAt:Date.now()-i*1000});
    }
  }
}
function seededDist(id){
  let seed=0; for(const c of id) seed+=c.charCodeAt(0);
  const r=(n)=>{ seed=(seed*9301+49297)%233280; return Math.floor((seed/233280)*n); };
  const d=[]; for(let i=0;i<10;i++) d.push(10+r(60));
  d[8]+=40; d[9]+=180;
  return d;
}

/* ============================================================
   التوجيه (Router) — مربوط بزر الرجوع الفعلي بالجوال (History API)
   حتى ضغطة "رجوع" تتنقل جوه التطبيق أول، مو تطلع منه مباشرة
   ============================================================ */
let route = {name:'home'};
function nav(r){
  route = r;
  history.pushState({route:r}, '', location.href);
  render();
  window.scrollTo(0,0);
}
window.addEventListener('popstate', (e)=>{
  route = (e.state && e.state.route) || {name:'home'};
  render();
});

/* ---------- الدرج الجانبي ---------- */
const DRAWER_ITEMS = [
  {name:'home', label:'أخر التحديثات', icon:ICON.flame},
  {name:'list', label:'قائمة المانجا', icon:ICON.list},
  {name:'genres', label:'الأنواع', icon:ICON.grid},
  '-',
  {name:'topRated', label:'الأعلى تقييماً', icon:ICON.bars},
  '-',
  {name:'myList', label:'قائمتي', icon:ICON.bars},
  {name:'customLists', label:'القوائم المخصصة', icon:ICON.bars},
  {name:'favorites', label:'مفضلتي', icon:ICON.heart},
  {name:'recent', label:'اخر القراءات', icon:ICON.clock},
  {name:'downloads', label:'تحميلاتي', icon:ICON.download},
  '-',
  {name:'schedule', label:'مواعيد نزول الفصول', icon:ICON.calendar},
  {name:'favChars', label:'شخصياتي المفضلة', icon:ICON.heart},
  {name:'popularChars', label:'الشخصيات الاكثر شعبية', icon:ICON.bars},
  {name:'recommend', label:'التوصيات', icon:ICON.puzzle},
  '-',
  {name:'upload', label:'مجلد روابط', icon:ICON.link, special:true},
];
function renderDrawer(){
  const el=document.getElementById('drawer');
  el.innerHTML = DRAWER_ITEMS.map(it=>{
    if(it==='-') return '<div class="drawer-sep"></div>';
    const active = route.name===it.name ? 'active':'';
    const special = it.special ? 'drawer-upload':'';
    return `<div class="drawer-item ${active} ${special}" data-nav="${it.name}">${it.icon}<span>${it.label}</span></div>`;
  }).join('') + `<div class="drawer-foot">${Store.isShared? 'متصل بمكتبة مشتركة':'وضع محلي — البيانات على جهازك فقط'}</div>`;
  el.querySelectorAll('[data-nav]').forEach(n=>{
    n.onclick=()=>{ closeDrawer(); nav({name:n.dataset.nav}); };
  });
}
function openDrawer(){ document.getElementById('drawer').classList.add('show'); document.getElementById('overlay').classList.add('show'); }
function closeDrawer(){ document.getElementById('drawer').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }

/* ---------- شريط علوي عام ---------- */
function topbar(title, opts={}){
  return `<div class="topbar">
    <div class="topbar-left">
      <button class="icon-btn" onclick="openDrawer()">${ICON.menu}</button>
      <h1>${esc(title)}</h1>
    </div>
    <div class="topbar-right">
      ${opts.search? `<button class="icon-btn" onclick="nav({name:'search'})">${ICON.search}</button>`:''}
      <button class="icon-btn" onclick="nav({name:'list'})">${ICON.grid}</button>
      <button class="icon-btn" onclick="toast(Store.isShared? 'متصل بمكتبة مشتركة على الإنترنت':'وضع محلي — البيانات محفوظة على جهازك فقط')">${ICON.info}</button>
    </div>
  </div>`;
}

/* ---------- بطاقة عمل ---------- */
function workCard(w){
  const last = w.status==='مكتمل' ? `${w.chapters||0} : الفصل الأخير` : `${w.chapters||0} : الفصل`;
  const cover = w.cover ? `<img src="${w.cover}">` : `<div class="cover-placeholder">${esc(w.title)}</div>`;
  return `<div class="card" data-open="${w.id}">
    <div class="card-cover">${cover}
      <div class="type-badge">${esc(w.type||'مانجا')}</div>
      <div class="badge">${last}</div>
    </div>
    <div class="card-info">
      <div class="card-title">${esc(w.title)}</div>
      <div class="card-meta">
        <span>${esc(w.status||'')}</span>
        <span class="rate">${ICON.star}${(w.avgRating||8).toFixed(1)}</span>
      </div>
    </div>
  </div>`;
}
function bindCards(root){
  root.querySelectorAll('[data-open]').forEach(c=>{
    c.onclick=()=>nav({name:'details', id:c.dataset.open, tab:'details'});
  });
}
function emptyState(title, sub){
  return `<div class="empty">${ICON.image}<b>${esc(title)}</b><div>${esc(sub||'')}</div></div>`;
}

/* ---------- الرئيسية ---------- */
async function pageHome(){
  const works = (await Store.getWorks()).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  setView(`
    ${topbar('أخر التحديثات',{search:true})}
    ${works.length? `<div class="grid">${works.map(workCard).join('')}</div>` : emptyState('لا توجد أعمال بعد','ابدأ بإضافة أول عمل من "مجلد روابط" في القائمة الجانبية')}
  `);
  bindCards(document);
}

/* ---------- قوائم عامة (فلترة على مصفوفة الأعمال) ---------- */
async function pageList(filterFn, title){
  const works = await Store.getWorks();
  const filtered = filterFn ? works.filter(filterFn) : works;
  setView(`
    ${topbar(title,{search:true})}
    ${filtered.length? `<div class="grid">${filtered.map(workCard).join('')}</div>` : emptyState('لا توجد نتائج','لم يتم العثور على أعمال في هذا القسم')}
  `);
  bindCards(document);
}
async function pageRecent(){
  const works = await Store.getWorks();
  const withPos = works
    .map(w=>({w, lastOpened:Personal.get(w.id).lastOpened||0}))
    .filter(x=>x.lastOpened)
    .sort((a,b)=>b.lastOpened-a.lastOpened)
    .map(x=>x.w);
  setView(`
    ${topbar('اخر القراءات',{search:true})}
    ${withPos.length? `<div class="grid">${withPos.map(workCard).join('')}</div>` : emptyState('لا توجد قراءات بعد','الأعمال التي تفتحها راح تظهر هنا')}
  `);
  bindCards(document);
}
async function pageTopRated(){
  const works = (await Store.getWorks()).slice().sort((a,b)=>(b.avgRating||0)-(a.avgRating||0));
  setView(`
    ${topbar('الأعلى تقييماً')}
    ${works.length? `<div class="grid">${works.map(workCard).join('')}</div>` : emptyState('لا توجد أعمال بعد','')}
  `);
  bindCards(document);
}

/* ---------- الأنواع ---------- */
async function pageGenres(){
  const works = await Store.getWorks();
  const set = new Set();
  works.forEach(w=>(w.genres||[]).forEach(g=>set.add(g)));
  const genres = [...set].sort((a,b)=>a.localeCompare('ar'));
  setView(`
    ${topbar('الأنواع')}
    ${genres.length? `<div class="tags" style="justify-content:flex-start;padding:16px">${genres.map(g=>`<span class="tag" style="cursor:pointer;padding:9px 18px;font-size:13.5px" data-genre="${esc(g)}">${esc(g)}</span>`).join('')}</div>` : emptyState('لا توجد أنواع بعد','أضف تصنيفات للأعمال من مجلد روابط')}
  `);
  document.querySelectorAll('[data-genre]').forEach(el=>{
    el.onclick=()=> nav({name:'genreList', genre:el.dataset.genre});
  });
}

/* ---------- بحث ---------- */
async function pageSearch(){
  const works = await Store.getWorks();
  setView(`
    <div class="topbar">
      <button class="icon-btn" onclick="nav({name:'home'})">${ICON.back}</button>
      <h1>بحث</h1><div style="width:36px"></div>
    </div>
    <div class="searchbar"><input id="searchInput" placeholder="ابحث عن مانجا أو مانهوا..." autofocus></div>
    <div class="grid" id="searchResults"></div>
  `);
  const inp = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  function run(){
    const q = inp.value.trim();
    const res = q? works.filter(w=> w.title.includes(q) || (w.titleEn||'').toLowerCase().includes(q.toLowerCase())) : [];
    box.innerHTML = res.map(workCard).join('');
    bindCards(box);
  }
  inp.oninput = run;
}

/* ---------- قوائم مخصصة ---------- */
async function pageCustomLists(){
  const lists = CustomLists.all();
  setView(`
    ${topbar('القوائم المخصصة')}
    <div style="padding:6px 16px">
      ${lists.length? lists.map(l=>`
        <div class="upload-work" data-openlist="${l.id}">
          <div class="upload-work-head"><div class="upload-work-body"><h4>${esc(l.name)}</h4><div class="sub">${l.workIds.length} عمل</div></div></div>
        </div>`).join('') : emptyState('لا توجد قوائم بعد','أنشئ قائمتك الأولى بالأسفل')}
    </div>
    <div style="height:80px"></div>
    <div class="fab"><button class="btn btn-accent btn-block" id="newListBtn">${ICON.plus} قائمة جديدة</button></div>
  `);
  document.querySelectorAll('[data-openlist]').forEach(el=> el.onclick=()=> nav({name:'customListDetail', id:el.dataset.openlist}));
  document.getElementById('newListBtn').onclick=()=>{
    showModal(`
      <h3>قائمة جديدة</h3>
      <div class="field"><label>اسم القائمة</label><input type="text" id="cl_name" placeholder="مثال: أفضل أعمال 2026"></div>
      <div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">إلغاء</button><button class="btn btn-accent" id="cl_save">إنشاء</button></div>
    `);
    document.getElementById('cl_save').onclick=()=>{
      const name=document.getElementById('cl_name').value.trim();
      if(!name){ toast('اكتب اسم القائمة'); return; }
      CustomLists.create(name); closeModal(); toast('تم إنشاء القائمة'); pageCustomLists();
    };
  };
}
async function pageCustomListDetail(listId){
  const list = CustomLists.all().find(l=>l.id===listId);
  if(!list){ nav({name:'customLists'}); return; }
  const allWorks = await Store.getWorks();
  const works = allWorks.filter(w=>list.workIds.includes(w.id));
  setView(`
    <div class="detail-topbar">
      <button class="icon-btn" onclick="nav({name:'customLists'})">${ICON.back}</button>
      <h2>${esc(list.name)}</h2>
      <button class="icon-btn" style="color:var(--danger)" id="delListBtn">${ICON.trash}</button>
    </div>
    ${works.length? `<div class="grid">${works.map(workCard).join('')}</div>` : emptyState('القائمة فارغة','أضف أعمالاً لها من صفحة تفاصيل أي عمل عبر زر قائمتي')}
  `);
  bindCards(document);
  document.getElementById('delListBtn').onclick=()=>{
    if(!confirm('حذف هذه القائمة؟')) return;
    CustomLists.remove(listId); toast('تم الحذف'); nav({name:'customLists'});
  };
}

/* ---------- تحميلاتي (نظام تحميل فصول حقيقي، دائماً محلي على الجهاز) ---------- */
async function pageDownloads(){
  const downloads = (await Store.getDownloads()).sort((a,b)=>b.downloadedAt-a.downloadedAt);
  setView(`
    ${topbar('تحميلاتي')}
    ${downloads.length? downloads.map(d=>`
      <div class="chapter-row">
        <div class="ch-name" data-opendl="${d.id}" data-workid="${d.workId}" style="flex:1">${esc(d.workTitle)} — الفصل ${d.number}</div>
        <div class="ch-actions"><button data-deldl="${d.id}" style="color:var(--danger)">${ICON.trash}</button></div>
      </div>`).join('') : emptyState('لا توجد فصول محملة','حمّل أي فصل من صفحة الفصول لقراءته بدون إنترنت')}
  `);
  document.querySelectorAll('[data-opendl]').forEach(el=>{
    el.onclick=()=> nav({name:'reader', workId:el.dataset.workid, chId:el.dataset.opendl});
  });
  document.querySelectorAll('[data-deldl]').forEach(b=> b.onclick=async(e)=>{
    e.stopPropagation();
    await Store.deleteDownload(b.dataset.deldl);
    toast('تم حذف التحميل'); pageDownloads();
  });
}
async function downloadChapter(workId, chId){
  const [w, chapters] = await Promise.all([Store.getWork(workId), Store.getChapters(workId)]);
  const ch = chapters.find(c=>c.id===chId);
  if(!ch || !ch.pages || !ch.pages.length){ toast('لا توجد صفحات مرفوعة لهذا الفصل ليتم تحميلها'); return; }
  await Store.putDownload({id:ch.id, workId, workTitle:w?w.title:'', number:ch.number, title:ch.title||'', pages:ch.pages, downloadedAt:Date.now()});
  toast('تم تحميل الفصل — يفتح الآن حتى بدون إنترنت');
  render();
}

/* ---------- مواعيد نزول الفصول ---------- */
async function pageSchedule(){
  const works = (await Store.getWorks()).filter(w=>w.nextReleaseDate).sort((a,b)=> new Date(a.nextReleaseDate)-new Date(b.nextReleaseDate));
  setView(`
    ${topbar('مواعيد نزول الفصول')}
    ${works.length? works.map(w=>`
      <div class="chapter-row" data-open="${w.id}">
        <div class="ch-name">${esc(w.title)}</div>
        <div style="color:var(--accent);font-size:13px;font-weight:700">${esc(w.nextReleaseDate)}</div>
      </div>`).join('') : emptyState('لا توجد مواعيد مضافة بعد','أضف تاريخ الفصل القادم عند إنشاء أو تعديل عمل من مجلد روابط')}
  `);
  document.querySelectorAll('[data-open]').forEach(el=> el.onclick=()=> nav({name:'details', id:el.dataset.open, tab:'details'}));
}

/* ---------- صفحة قيد التطوير ---------- */
function pagePlaceholder(title, sub){
  setView(`
    ${topbar(title)}
    ${emptyState('هذا القسم قيد التطوير', sub||'سيتم تفعيله في تحديث قادم للتطبيق')}
  `);
}

/* ============================================================
   صفحة التفاصيل
   ============================================================ */
async function pageDetails(id, activeTab){
  const w = await Store.getWork(id);
  if(!w){ nav({name:'home'}); return; }
  Personal.set(id, {lastOpened: Date.now()});
  const personal = Personal.get(id);
  const chapters = (await Store.getChapters(id)).sort((a,b)=>a.number-b.number);
  const downloads = await Store.getDownloads();
  const downloadedIds = new Set(downloads.filter(d=>d.workId===id).map(d=>d.id));
  activeTab = activeTab || 'details';

  const tabsHtml = `<div class="tabs">
    ${tabBtn('details','التفاصيل',activeTab)}
    ${tabBtn('chapters',`الفصول (${chapters.length})`,activeTab)}
    ${tabBtn('cast','الشخصيات والطاقم',activeTab)}
    ${tabBtn('stats','الاحصائيات',activeTab)}
  </div>`;

  let body='';
  if(activeTab==='details') body = detailsTab(w, personal);
  else if(activeTab==='chapters') body = chaptersTab(w, chapters, personal, downloadedIds);
  else if(activeTab==='cast') body = emptyState('قريباً','بيانات الشخصيات والطاقم غير متوفرة بعد');
  else if(activeTab==='stats') body = statsTab();

  setView(`
    <div class="detail-topbar">
      <button class="icon-btn" onclick="nav({name:'home'})">${ICON.back}</button>
      <h2>${esc(w.title)}</h2>
      <button class="icon-btn" id="favBtn">${personal.listStatus==='favorite'?ICON.heartFilled:ICON.heart}</button>
    </div>
    ${tabsHtml}
    <div id="tabBody">${body}</div>
  `);

  document.getElementById('favBtn').onclick=()=>toggleFav(w.id);
  document.querySelectorAll('[data-tab]').forEach(t=>{
    t.onclick=()=> nav({name:'details', id:w.id, tab:t.dataset.tab});
  });
  if(activeTab==='stats') drawCharts(w, chapters, personal);
  if(activeTab==='chapters'){
    document.querySelectorAll('[data-ch]').forEach(r=>{
      r.onclick=()=> nav({name:'reader', workId:w.id, chId:r.dataset.ch});
    });
    document.querySelectorAll('[data-dl]').forEach(b=>{
      b.onclick=(e)=>{ e.stopPropagation(); downloadChapter(w.id, b.dataset.dl); };
    });
  }
  if(activeTab==='details'){
    document.getElementById('rateBtn')?.addEventListener('click', ()=>openRateModal(w, personal));
    document.getElementById('listBtn')?.addEventListener('click', ()=>openListModal(w, personal));
  }
}
function tabBtn(key,label,active){
  return `<div class="tab ${active===key?'active':''}" data-tab="${key}">${label}</div>`;
}

function detailsTab(w, personal){
  const cover = w.cover ? `<img src="${w.cover}">` : `<div class="cover-placeholder">${esc(w.title)}</div>`;
  const listLabels = {favorite:'في المفضلة',reading:'أقرأها حالياً',planned:'أرغب بقراءتها',completed:'تم قراءتها',onhold:'أكملها لاحقاً',dropped:'لا أرغب بقراءتها'};
  return `
    <div class="hero">
      <div class="hero-cover">${cover}</div>
      <div class="hero-info">
        <h2>${esc(w.title)}</h2>
        <div class="status-line">${esc(w.status||'')} &nbsp;•&nbsp; ${esc(w.type||'مانجا')}</div>
        <div class="meta-line">${w.chapters||0} فصل${w.from? ' &nbsp;•&nbsp; منذ '+esc(w.from):''}</div>
      </div>
    </div>
    <div class="rating-row">
      <div class="rating-col"><div class="big star">${(w.avgRating||8).toFixed(2)}</div><div class="lbl">تقييم القراء</div></div>
      <div class="rating-col"><div class="big">${personal.userRating? personal.userRating.toFixed(1):'—'}</div><div class="lbl" id="rateBtn" style="color:var(--accent);cursor:pointer">${personal.userRating?'تعديل تقييمي':'إضافة تقييم'}</div></div>
      <div class="rating-col"><div id="listBtn" style="cursor:pointer">${ICON.plus}<div class="lbl">${personal.listStatus? listLabels[personal.listStatus]:'قائمتي'}</div></div></div>
    </div>
    <div class="desc">${esc(w.desc||'لا يوجد وصف لهذا العمل حالياً.')}
      <div class="tags">${(w.genres||[]).map(g=>`<span class="tag">${esc(g)}</span>`).join('')}</div>
    </div>
    ${w.sourceUrl? `<div style="padding:0 16px 14px">
      <a href="${esc(w.sourceUrl)}" target="_blank" rel="noopener" class="btn btn-outline btn-block" style="color:var(--accent);border-color:var(--accent)">${ICON.link} مصدر العمل — فتح الموقع الأصلي</a>
    </div>`:''}
    <div class="meta-grid">
      <div class="meta-cell"><div class="k">المصدر</div><div class="v">${esc(w.source||'—')}</div></div>
      <div class="meta-cell"><div class="k">الحالة</div><div class="v">${esc(w.status||'—')}</div></div>
      <div class="meta-cell"><div class="k">الناشر</div><div class="v">${esc(w.publisher||'—')}</div></div>
      <div class="meta-cell"><div class="k">العنوان الانجليزي</div><div class="v">${esc(w.titleEn||'—')}</div></div>
    </div>
  `;
}

function chaptersTab(w, chapters, personal, downloadedIds){
  if(!chapters.length) return emptyState('لا توجد فصول بعد','أضف أول فصل من مجلد روابط في القائمة الجانبية');
  const sorted=[...chapters].sort((a,b)=>b.number-a.number);
  return sorted.map((c,i)=>{
    const read = (personal.readChapterIds||[]).includes(c.id);
    const downloaded = downloadedIds.has(c.id);
    const isLast = i===0 && w.status==='مكتمل';
    return `<div class="chapter-row">
      <div class="ch-name" data-ch="${c.id}" style="flex:1">الفصل : ${c.number}${isLast?' و الاخيرة':''}${c.title? ' — '+esc(c.title):''}</div>
      <div class="ch-actions">
        <button data-dl="${c.id}" title="تحميل للقراءة بدون إنترنت" style="color:${downloaded?'var(--green)':'inherit'}">${downloaded?ICON.downloadDone:ICON.download}</button>
        <span class="${read?'read':''}">${ICON.eye}</span>
      </div>
    </div>`;
  }).join('');
}

function statsTab(){
  return `
    <div class="stat-box">
      <h3>تقييمات القراء</h3>
      <canvas id="barChart" height="170"></canvas>
      <div class="stat-note">بيانات تجريبية لحين ربط التطبيق بقاعدة بيانات مجتمعية للتقييمات</div>
    </div>
    <div class="stat-box">
      <h3>حالة قراءتك لهذا العمل</h3>
      <div class="donut-wrap">
        <canvas id="donutChart" width="130" height="130" style="width:130px;height:130px"></canvas>
        <div class="legend" id="donutLegend"></div>
      </div>
    </div>
  `;
}
function drawCharts(w, chapters, personal){
  const dist = w.dist || seededDist(w.id);
  new Chart(document.getElementById('barChart'), {
    type:'bar',
    data:{ labels:['1','2','3','4','5','6','7','8','9','10'],
      datasets:[{data:dist, backgroundColor:'#3d97e8', borderRadius:4, maxBarThickness:26}] },
    options:{ plugins:{legend:{display:false}}, scales:{
      x:{grid:{display:false}, ticks:{color:'#93a1b3'}},
      y:{display:false, grid:{display:false}} } }
  });
  const readCount = (personal.readChapterIds||[]).length;
  const unread = Math.max((chapters.length||0)-readCount,0);
  const total = readCount+unread;
  const colors=['#3fbf7f','#e0555a'];
  const labels=[`مقروءة : ${readCount}`,`غير مقروءة : ${unread}`];
  new Chart(document.getElementById('donutChart'), {
    type:'doughnut',
    data:{ labels, datasets:[{data: total?[readCount,unread]:[1], backgroundColor: total?colors:['#8993a355'], borderWidth:0}] },
    options:{ cutout:'68%', plugins:{legend:{display:false}} }
  });
  document.getElementById('donutLegend').innerHTML = labels.map((l,i)=>
    `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span>${l}</div>`
  ).join('');
}

function toggleFav(id){
  const p = Personal.get(id);
  Personal.set(id, {listStatus: p.listStatus==='favorite' ? null : 'favorite'});
  render();
}

/* ---------- مودال التقييم ---------- */
function openRateModal(w, personal){
  const stars = [1,2,3,4,5,6,7,8,9,10];
  showModal(`
    <h3>قيّم "${esc(w.title)}"</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:14px 0">
      ${stars.map(n=>`<button class="btn btn-outline" style="min-width:38px;padding:8px 0" data-star="${n}">${n}</button>`).join('')}
    </div>
    <div class="modal-actions"><button class="btn btn-outline btn-block" onclick="closeModal()">إلغاء</button></div>
  `);
  document.querySelectorAll('[data-star]').forEach(b=>{
    b.onclick=()=>{
      Personal.set(w.id, {userRating: Number(b.dataset.star)});
      closeModal(); toast('تم حفظ تقييمك'); render();
    };
  });
}

/* ---------- مودال قائمتي + القوائم المخصصة ---------- */
function openListModal(w, personal){
  const opts=[
    ['favorite','مفضلتي'],['reading','أقرأها حالياً'],['planned','أرغب بقراءتها'],
    ['completed','تم قراءتها'],['onhold','أكملها لاحقاً'],['dropped','لا أرغب بقراءتها']
  ];
  const lists = CustomLists.all();
  showModal(`
    <h3>أضف إلى قائمتي</h3>
    ${opts.map(([k,l])=>`<div class="drawer-item" style="padding:12px 4px" data-list="${k}">
      <span style="width:18px;text-align:center">${personal.listStatus===k?'●':'○'}</span><span>${l}</span></div>`).join('')}
    <h3 style="margin-top:16px">قوائمي المخصصة</h3>
    ${lists.length? lists.map(l=>`<div class="check-row" data-toggle-list="${l.id}">
        <span class="box ${l.workIds.includes(w.id)?'on':''}">${l.workIds.includes(w.id)?'✓':''}</span>
        <span>${esc(l.name)}</span>
      </div>`).join('') : `<div style="color:var(--faint);font-size:12.5px;padding:6px 4px">لا توجد قوائم مخصصة بعد — أنشئها من الدرج الجانبي</div>`}
    <div class="modal-actions" style="margin-top:10px">
      <button class="btn btn-outline btn-block" onclick="closeModal()">إغلاق</button>
    </div>
  `);
  document.querySelectorAll('[data-list]').forEach(b=>{
    b.onclick=()=>{
      Personal.set(w.id, {listStatus: b.dataset.list});
      closeModal(); toast('تم التحديث'); render();
    };
  });
  document.querySelectorAll('[data-toggle-list]').forEach(row=>{
    row.onclick=()=>{
      CustomLists.toggleWork(row.dataset.toggleList, w.id);
      const box = row.querySelector('.box');
      box.classList.toggle('on');
      box.textContent = box.classList.contains('on') ? '✓' : '';
    };
  });
}

/* ============================================================
   القارئ — لمسة تخفي/تُظهر الأزرار، وحفظ آخر موضع قراءة بالضبط
   ============================================================ */
function readPosKey(chId){ return 'readpos_'+chId; }
let __readerScrollHandler=null, __readerSaveTimer=null;

async function pageReader(workId, chId){
  // إذا الفصل محمّل محلياً نقرأه من التحميل مباشرة (يشتغل حتى بدون إنترنت)
  let ch = await Store.getDownload(chId);
  let workTitle = ch ? ch.workTitle : '';
  let chapters = [];
  let w = null;

  try{
    w = await Store.getWork(workId);
    chapters = (await Store.getChapters(workId)).sort((a,b)=>a.number-b.number);
    if(!ch) ch = chapters.find(c=>c.id===chId);
    if(w) workTitle = w.title;
  }catch(e){ /* بدون إنترنت بوضع المكتبة المشتركة — نكمل بما هو محمّل فقط */ }

  if(!ch){ nav({name:'details', id:workId, tab:'chapters'}); return; }

  const idx = chapters.findIndex(c=>c.id===chId);
  const p = Personal.get(workId);
  if(!(p.readChapterIds||[]).includes(ch.id)){
    Personal.set(workId, {readChapterIds:[...(p.readChapterIds||[]), ch.id]});
  }

  const hasPages = ch.pages && ch.pages.length;
  let pagesHtml;
  if(hasPages){
    pagesHtml = ch.pages.map(pg=>`<img src="${pg}">`).join('');
  } else if(ch.sourceUrl){
    pagesHtml = `<div style="padding:70px 24px;text-align:center;color:var(--dim)">
      لم يتم رفع صفحات لهذا الفصل، لكنه متوفر عند المصدر الأصلي.
      <div style="margin-top:16px"><a href="${esc(ch.sourceUrl)}" target="_blank" rel="noopener" class="btn btn-accent">${ICON.link} فتح الفصل من المصدر</a></div>
    </div>`;
  } else {
    pagesHtml = `<div style="padding:80px 20px;text-align:center;color:var(--faint)">لا يوجد محتوى لهذا الفصل بعد</div>`;
  }

  document.body.classList.remove('reader-ui-hidden');
  const prevBtn = idx>0 ? `onclick="nav({name:'reader',workId:'${workId}',chId:'${chapters[idx-1].id}'})"` : 'disabled style="opacity:.4"';
  const nextBtn = (idx>=0 && idx<chapters.length-1) ? `onclick="nav({name:'reader',workId:'${workId}',chId:'${chapters[idx+1].id}'})"` : 'disabled style="opacity:.4"';

  setView(`
    <div class="reader-top" id="readerTop">
      <button class="icon-btn" onclick="nav({name:'details', id:'${workId}', tab:'chapters'})">${ICON.back}</button>
      <span style="font-size:13.5px;font-weight:700">${esc(workTitle)} — الفصل ${ch.number}</span>
      <span style="width:36px"></span>
    </div>
    <div class="reader-pages" id="readerPages">${pagesHtml}</div>
    <div class="reader-bottom" id="readerBottom">
      <button class="btn btn-outline" ${prevBtn}>الفصل السابق</button>
      <button class="btn btn-accent" ${nextBtn}>الفصل التالي</button>
    </div>
  `);

  if(hasPages){
    const savedPos = Number(localStorage.getItem(readPosKey(ch.id)) || 0);
    if(savedPos>0) requestAnimationFrame(()=> window.scrollTo(0, savedPos));
  }

  if(__readerScrollHandler) window.removeEventListener('scroll', __readerScrollHandler);
  __readerScrollHandler = ()=>{
    clearTimeout(__readerSaveTimer);
    __readerSaveTimer = setTimeout(()=>{ localStorage.setItem(readPosKey(ch.id), String(window.scrollY)); }, 250);
  };
  window.addEventListener('scroll', __readerScrollHandler, {passive:true});

  // لمسة على الصفحة تخفي/تُظهر شريطي الأعلى والأسفل — بدون أي تلميح نصي
  document.getElementById('readerPages').onclick = (e)=>{
    if(e.target.closest('a')) return;
    document.body.classList.toggle('reader-ui-hidden');
  };
}

/* ============================================================
   مجلد روابط — إضافة أعمال منسوبة لمواقع مصدر + رفع فصولها
   ============================================================ */
let uploadTypeFilter='all';
async function pageUpload(){
  const works = (await Store.getWorks()).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  const filtered = uploadTypeFilter==='all'? works : works.filter(w=>w.type===uploadTypeFilter);
  setView(`
    ${topbar('مجلد روابط')}
    <div class="upload-hero">
      <p>هنا تضيف أعمال مانجا ومانهوا مع رابط الموقع المصدر الذي أُخذت منه، وترفع فصولها. الأعمال المضافة هنا تظهر تلقائياً في كل أقسام التطبيق، ورابط المصدر يظهر لزوار صفحة التفاصيل.
      ${Store.isShared? ' هذي البيانات مشتركة الآن — كل من يفتح التطبيق يشوفها.' : ' تنبيه: التطبيق حالياً بوضع محلي، يعني هذي البيانات تظهر على جهازك بس (راجع config.js لتفعيل المشاركة).'}</p>
    </div>
    <div class="type-switch">
      <button class="${uploadTypeFilter==='all'?'active':''}" data-tf="all">الكل</button>
      <button class="${uploadTypeFilter==='مانجا'?'active':''}" data-tf="مانجا">مانجا</button>
      <button class="${uploadTypeFilter==='مانهوا'?'active':''}" data-tf="مانهوا">مانهوا</button>
    </div>
    <div style="padding:0 16px 4px"><button class="btn btn-outline btn-block" id="bulkBtn">${ICON.plus} إضافة عدة أعمال دفعة وحدة (روابط فقط)</button></div>
    ${filtered.length? filtered.map(uploadWorkCard).join('') : emptyState('لا توجد أعمال بعد','اضغط على زر "+ عمل جديد" بالأسفل للبدء')}
    <div style="height:80px"></div>
    <div class="fab"><button class="btn btn-accent btn-block" id="newWorkBtn">${ICON.plus} عمل جديد</button></div>
  `);
  document.querySelectorAll('[data-tf]').forEach(b=> b.onclick=()=>{ uploadTypeFilter=b.dataset.tf; pageUpload(); });
  document.getElementById('newWorkBtn').onclick = openNewWorkModal;
  document.getElementById('bulkBtn').onclick = openBulkAddModal;
  document.querySelectorAll('[data-addch]').forEach(b=> b.onclick=(e)=>{ e.stopPropagation(); openAddChapterModal(b.dataset.addch); });
  document.querySelectorAll('[data-editwork]').forEach(b=> b.onclick=async (e)=>{
    e.stopPropagation();
    const w = await Store.getWork(b.dataset.editwork);
    if(w) openNewWorkModal(w);
  });
  document.querySelectorAll('[data-delwork]').forEach(b=> b.onclick=async (e)=>{
    e.stopPropagation();
    if(!confirm('حذف هذا العمل وكل فصوله؟')) return;
    const chs = await Store.getChapters(b.dataset.delwork);
    for(const c of chs) await Store.deleteChapter(c.id);
    await Store.deleteWork(b.dataset.delwork);
    toast('تم الحذف'); pageUpload();
  });
  document.querySelectorAll('[data-openwork]').forEach(el=> el.onclick=()=> nav({name:'details', id:el.dataset.openwork, tab:'details'}));
}

function uploadWorkCard(w){
  const cover = w.cover? `<img src="${w.cover}">` : `<div class="ph">${esc(w.title)}</div>`;
  return `<div class="upload-work">
    <div class="upload-work-head" data-openwork="${w.id}">
      ${cover}
      <div class="upload-work-body">
        <h4>${esc(w.title)}</h4>
        <div class="sub">${esc(w.type)} • ${esc(w.status)} • ${w.chapters||0} فصل</div>
        ${w.sourceUrl? `<div class="sub" style="color:var(--accent);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ICON.link}<span>${esc(w.sourceUrl)}</span></div>`:'<div class="sub" style="color:var(--danger)">بدون رابط مصدر</div>'}
      </div>
    </div>
    <div class="upload-work-actions">
      <button class="btn btn-outline" data-editwork="${w.id}">تعديل</button>
      <button class="btn btn-outline" data-addch="${w.id}">${ICON.upload} فصل</button>
      <button class="btn btn-outline" style="color:var(--danger)" data-delwork="${w.id}">${ICON.trash}</button>
    </div>
  </div>`;
}

function showModal(html){
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal(){ document.getElementById('modalOverlay').classList.remove('show'); }

/* يقبل عمل موجود (existing) للتعديل، أو بدون أي شي لإنشاء عمل جديد */
function openNewWorkModal(existing){
  const isEdit = !!existing;
  const w0 = existing || {};
  showModal(`
    <h3>${isEdit? 'تعديل العمل':'عمل جديد'}</h3>
    <div class="field"><label>رابط الموقع المصدر (الصفحة التي أُخذ منها العمل)</label>
      <div style="display:flex;gap:8px">
        <input type="text" id="nw_sourceUrl" placeholder="https://example.com/manga-name" dir="ltr" style="text-align:left;flex:1" value="${esc(w0.sourceUrl||'')}">
        <button class="btn btn-outline" id="nw_fetchBtn" style="flex:none;padding:10px 12px">${ICON.link} جلب</button>
      </div>
      <div style="font-size:11px;color:var(--faint);margin-top:5px">يجيب فقط عنوان العمل وصورة الغلاف والوصف من هذي الصفحة تحديداً، وتراجعها قبل الحفظ — ما يسحب فصول ولا باقي أعمال الموقع.</div>
    </div>
    <div class="field"><label>عنوان العمل</label><input type="text" id="nw_title" placeholder="مثال: ظل التاج المفقود" value="${esc(w0.title||'')}"></div>
    <div id="nw_titleWarn" style="display:none;color:var(--danger);font-size:11.5px;margin:-8px 0 10px">هذا يبدو رابط مو عنوان — انسخه لحقل "رابط الموقع المصدر" فوك واكتب عنوان العمل الحقيقي هنا.</div>
    <div class="field"><label>العنوان بالإنجليزية (اختياري)</label><input type="text" id="nw_titleEn" value="${esc(w0.titleEn||'')}"></div>
    <div class="field"><label>النوع</label>
      <div class="radio-row">
        <label><input type="radio" name="nw_type" value="مانجا" ${(!w0.type||w0.type==='مانجا')?'checked':''}><span>مانجا</span></label>
        <label><input type="radio" name="nw_type" value="مانهوا" ${w0.type==='مانهوا'?'checked':''}><span>مانهوا</span></label>
        <label><input type="radio" name="nw_type" value="مانها" ${w0.type==='مانها'?'checked':''}><span>مانها</span></label>
      </div>
    </div>
    <div class="field"><label>حالة العمل</label>
      <div class="radio-row">
        <label><input type="radio" name="nw_status" value="مستمر" ${(!w0.status||w0.status==='مستمر')?'checked':''}><span>مستمر</span></label>
        <label><input type="radio" name="nw_status" value="مكتمل" ${w0.status==='مكتمل'?'checked':''}><span>مكتمل</span></label>
        <label><input type="radio" name="nw_status" value="متوقف" ${w0.status==='متوقف'?'checked':''}><span>متوقف</span></label>
      </div>
    </div>
    <div class="field"><label>التصنيفات (افصل بينها بفاصلة)</label><input type="text" id="nw_genres" placeholder="أكشن، خيال، دراما" value="${esc((w0.genres||[]).join('، '))}"></div>
    <div class="field"><label>تاريخ الفصل القادم (اختياري)</label><input type="date" id="nw_nextDate" value="${esc(w0.nextReleaseDate||'')}"></div>
    <div class="field"><label>الوصف</label><textarea id="nw_desc" placeholder="نبذة عن القصة...">${esc(w0.desc||'')}</textarea></div>
    <div class="field"><label>غلاف العمل</label>
      <div class="filepick" id="nw_coverPick">${w0.cover? `<img src="${w0.cover}" style="max-height:90px;border-radius:6px">` : ICON.image+'<div style="margin-top:6px">اضغط لاختيار صورة الغلاف، أو استخدم زر "جلب" فوك</div>'}</div>
      <input type="file" id="nw_cover" accept="image/*" class="hidden">
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
      <button class="btn btn-accent" id="nw_save">${isEdit?'حفظ التعديلات':'حفظ العمل'}</button>
    </div>
  `);
  const coverInput = document.getElementById('nw_cover');
  document.getElementById('nw_coverPick').onclick = ()=>coverInput.click();
  let coverData = w0.cover || null;
  coverInput.onchange = async ()=>{
    if(coverInput.files[0]){
      coverData = await fileToDataURL(coverInput.files[0]);
      document.getElementById('nw_coverPick').innerHTML = `<img src="${coverData}" style="max-height:90px;border-radius:6px">`;
    }
  };

  const titleInput = document.getElementById('nw_title');
  const warnEl = document.getElementById('nw_titleWarn');
  const looksLikeUrl = (s)=> /^https?:\/\//i.test(s.trim());
  titleInput.oninput = ()=>{ warnEl.style.display = looksLikeUrl(titleInput.value) ? 'block':'none'; };

  document.getElementById('nw_fetchBtn').onclick = async ()=>{
    const url = document.getElementById('nw_sourceUrl').value.trim();
    if(!url){ toast('حط رابط الصفحة أول'); return; }
    const btn = document.getElementById('nw_fetchBtn');
    const oldLabel = btn.innerHTML; btn.innerHTML = '...'; btn.disabled = true;
    try{
      const r = await fetch('/.netlify/functions/fetch-meta?url='+encodeURIComponent(url));
      const data = await r.json();
      if(data.error){ toast(data.error); }
      else {
        if(data.title && !titleInput.value.trim()) titleInput.value = data.title;
        if(data.description && !document.getElementById('nw_desc').value.trim()) document.getElementById('nw_desc').value = data.description;
        if(data.image){ coverData = data.image; document.getElementById('nw_coverPick').innerHTML = `<img src="${data.image}" style="max-height:90px;border-radius:6px">`; }
        warnEl.style.display='none';
        toast('تم جلب المعلومات — راجعها قبل الحفظ');
      }
    }catch(e){
      toast('هذي الميزة تحتاج نشر التطبيق على Netlify (ما تشتغل وأنت تجرب محلياً بدون رفع)');
    }
    btn.innerHTML = oldLabel; btn.disabled = false;
  };

  document.getElementById('nw_save').onclick = async ()=>{
    const title = titleInput.value.trim();
    if(!title){ toast('الرجاء إدخال عنوان العمل'); return; }
    if(looksLikeUrl(title)){ toast('عنوان العمل ما يصير يكون رابط — صححه أول'); return; }
    const type = document.querySelector('[name=nw_type]:checked').value;
    const status = document.querySelector('[name=nw_status]:checked').value;
    const genres = document.getElementById('nw_genres').value.split('،').join(',').split(',').map(s=>s.trim()).filter(Boolean);
    const w = Object.assign({}, w0, {
      id: w0.id || uid(), title, titleEn: document.getElementById('nw_titleEn').value.trim(),
      type, status, genres, desc: document.getElementById('nw_desc').value.trim(),
      sourceUrl: document.getElementById('nw_sourceUrl').value.trim(),
      nextReleaseDate: document.getElementById('nw_nextDate').value,
      cover: coverData,
      source: w0.source || (type==='مانهوا'?'ويب تون':'مانجا ويب'),
      publisher: w0.publisher || 'رفع شخصي',
      from: w0.from || new Date().getFullYear().toString(),
      chapters: w0.chapters||0,
      avgRating: w0.avgRating || (7+Math.random()*2),
      dist: w0.dist || null,
      createdAt: w0.createdAt || Date.now(), updatedAt: Date.now()
    });
    if(!w.dist) w.dist = seededDist(w.id);
    await Store.putWork(w);
    closeModal(); toast(isEdit? 'تم حفظ التعديلات':'تمت إضافة العمل بنجاح'); pageUpload();
  };
}

function openAddChapterModal(workId){
  showModal(`
    <h3>إضافة فصل جديد</h3>
    <div class="field"><label>رقم الفصل</label><input type="text" id="ac_num" inputmode="numeric" placeholder="1"></div>
    <div class="field"><label>عنوان الفصل (اختياري)</label><input type="text" id="ac_title"></div>
    <div class="field"><label>رابط الفصل عند المصدر (اختياري)</label><input type="text" id="ac_sourceUrl" placeholder="https://example.com/chapter-1" dir="ltr" style="text-align:left"></div>
    <div class="field"><label>صفحات الفصل (يمكن اختيار عدة صور — اختياري إذا وضعت رابط الفصل)</label>
      <div class="filepick small" id="ac_pick">${ICON.upload}<div style="margin-top:4px">اضغط لاختيار صور الصفحات</div></div>
      <input type="file" id="ac_files" accept="image/*" multiple class="hidden">
      <div class="file-list" id="ac_fileList"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
      <button class="btn btn-accent" id="ac_save">حفظ الفصل</button>
    </div>
  `);
  const filesInput = document.getElementById('ac_files');
  document.getElementById('ac_pick').onclick=()=>filesInput.click();
  filesInput.onchange = ()=>{
    document.getElementById('ac_fileList').innerHTML = [...filesInput.files].map(f=>`<span>${esc(f.name)}</span>`).join('');
  };
  document.getElementById('ac_save').onclick = async ()=>{
    const w = await Store.getWork(workId);
    const num = Number(document.getElementById('ac_num').value) || ((w.chapters||0)+1);
    const title = document.getElementById('ac_title').value.trim();
    const sourceUrl = document.getElementById('ac_sourceUrl').value.trim();
    const files = [...filesInput.files];
    if(!files.length && !sourceUrl){ toast('أضف صور الصفحات أو رابط الفصل على الأقل'); return; }
    const pages = [];
    for(const f of files){ pages.push(await fileToDataURL(f)); }
    await Store.putChapter({id:uid(), workId, number:num, title, sourceUrl, pages, createdAt:Date.now()});
    w.chapters = (w.chapters||0)+1; w.updatedAt=Date.now();
    if(!w.cover && pages[0]) w.cover = pages[0];
    await Store.putWork(w);
    closeModal(); toast('تم حفظ الفصل بنجاح'); pageUpload();
  };
}

/* إضافة عدة أعمال دفعة وحدة عن طريق لصق قائمة روابط — بديل سريع وآمن
   بدل الجلب الآلي الكامل من مواقع أخرى (غير ممكن تقنياً وقانونياً بأمان) */
function openBulkAddModal(){
  showModal(`
    <h3>إضافة عدة أعمال دفعة وحدة</h3>
    <p style="font-size:12.5px;color:var(--dim);line-height:1.8;margin-bottom:12px">
      اكتب سطر لكل عمل بهذا الشكل: <b>العنوان</b> ثم علامة <b>|</b> ثم <b>رابط المصدر</b>.<br>
      مثال:<br>
      ظل التاج المفقود | https://example.com/shadow<br>
      قلب من حديد | https://example.com/heart
    </p>
    <div class="field"><label>النوع لكل الأعمال بهذه الدفعة</label>
      <div class="radio-row">
        <label><input type="radio" name="bk_type" value="مانجا" checked><span>مانجا</span></label>
        <label><input type="radio" name="bk_type" value="مانهوا"><span>مانهوا</span></label>
      </div>
    </div>
    <div class="field"><label>القائمة</label><textarea id="bk_text" style="min-height:140px" placeholder="عنوان العمل | https://..."></textarea></div>
    <div class="modal-actions">
      <button class="btn btn-outline" onclick="closeModal()">إلغاء</button>
      <button class="btn btn-accent" id="bk_save">إضافة الكل</button>
    </div>
  `);
  document.getElementById('bk_save').onclick = async ()=>{
    const type = document.querySelector('[name=bk_type]:checked').value;
    const lines = document.getElementById('bk_text').value.split('\n').map(l=>l.trim()).filter(Boolean);
    if(!lines.length){ toast('أضف سطر واحد على الأقل'); return; }
    let count=0, skipped=0;
    for(const line of lines){
      const parts = line.split('|').map(s=>s.trim());
      let title = parts[0]; let sourceUrl = parts[1]||'';
      if(!title) continue;
      // إذا كتب رابط بس بدون عنوان، نحط الرابط بخانة المصدر مو بالعنوان
      if(/^https?:\/\//i.test(title)){
        if(!sourceUrl) sourceUrl = title;
        skipped++; continue; // نتجاوزه بدل ما نحفظ عنوان مكسور — يحتاج عنوان حقيقي
      }
      const w = {
        id: uid(), title, titleEn:'', type, status:'مستمر', genres:[], desc:'',
        sourceUrl, nextReleaseDate:'', cover:null, source: type==='مانهوا'?'ويب تون':'مانجا ويب',
        publisher:'رفع شخصي', from:new Date().getFullYear().toString(), chapters:0,
        avgRating:(7+Math.random()*2), dist:null, createdAt:Date.now(), updatedAt:Date.now()
      };
      w.dist = seededDist(w.id);
      await Store.putWork(w);
      count++;
    }
    closeModal();
    toast(skipped? `تمت إضافة ${count} عمل — تجاوزت ${skipped} سطر بلا عنوان واضح`:`تمت إضافة ${count} عمل`);
    pageUpload();
  };
}


/* ---------- إظهار المحتوى ---------- */
function setView(html){ document.getElementById('app').innerHTML = html; renderDrawer(); }

/* ---------- الموجه الرئيسي ---------- */
async function render(){
  closeModal(); closeDrawer();
  if(route.name!=='reader' && __readerScrollHandler){
    window.removeEventListener('scroll', __readerScrollHandler);
    __readerScrollHandler=null;
    document.body.classList.remove('reader-ui-hidden');
  }
  switch(route.name){
    case 'home': return pageHome();
    case 'list': return pageList(null,'قائمة المانجا');
    case 'genres': return pageGenres();
    case 'genreList': return pageList(w=>(w.genres||[]).includes(route.genre), route.genre);
    case 'topRated': return pageTopRated();
    case 'myList': return pageList(w=>!!Personal.get(w.id).listStatus,'قائمتي');
    case 'customLists': return pageCustomLists();
    case 'customListDetail': return pageCustomListDetail(route.id);
    case 'favorites': return pageList(w=>Personal.get(w.id).listStatus==='favorite','مفضلتي');
    case 'recent': return pageRecent();
    case 'downloads': return pageDownloads();
    case 'search': return pageSearch();
    case 'details': return pageDetails(route.id, route.tab);
    case 'reader': return pageReader(route.workId, route.chId);
    case 'upload': return pageUpload();
    case 'schedule': return pageSchedule();
    case 'favChars': return pagePlaceholder('شخصياتي المفضلة','يحتاج بناء نظام شخصيات كامل — قادم بتحديث لاحق');
    case 'popularChars': return pagePlaceholder('الشخصيات الاكثر شعبية','يحتاج بناء نظام شخصيات كامل — قادم بتحديث لاحق');
    case 'recommend': return pagePlaceholder('التوصيات','يحتاج محرك توصيات ذكي — قادم بتحديث لاحق');
    default: return pageHome();
  }
}

/* ---------- بدء التشغيل ---------- */
(async function init(){
  await Store.init();
  await seedIfEmpty();
  history.replaceState({route}, '', location.href);
  render();
})();
