/* =====================================================================
   طبقة التخزين (Store)
   =====================================================================
   ترتيب الأولوية تلقائياً:
   1) Firebase Firestore — إذا كانت CONFIG.firebaseConfig.apiKey موجودة
   2) Supabase — إذا كانت CONFIG.SUPABASE_URL و CONFIG.SUPABASE_KEY موجودة
   3) IndexedDB محلي — إذا ماكو ولا وحدة مفعّلة (تخزين على جهاز المستخدم بس)

   بكل الحالات، "التحميلات" (نظام تحميل الفصول للقراءة بدون إنترنت)
   تبقى دائماً محلية على جهاز كل مستخدم، لأنها بطبيعتها شخصية.
   ===================================================================== */
const Store = (function () {
  let mode = 'local'; // 'firebase' | 'supabase' | 'local'
  let sb = null;       // عميل Supabase
  let db = null;       // عميل Firestore
  let FS = null;       // دوال Firestore (collection, doc, getDoc, ...)

  let ldb; // قاعدة بيانات محلية على جهاز المستخدم (دائماً للتحميلات، واحتياط للمكتبة)
  function openLocal() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open('pureMangaLocal', 1);
      r.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains('works')) d.createObjectStore('works', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('chapters')) d.createObjectStore('chapters', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('downloads')) d.createObjectStore('downloads', { keyPath: 'id' });
      };
      r.onsuccess = (e) => { ldb = e.target.result; resolve(ldb); };
      r.onerror = (e) => reject(e);
    });
  }
  function tx(store, mode2 = 'readonly') { return ldb.transaction(store, mode2).objectStore(store); }
  function idbGetAll(store) { return new Promise((res) => { const r = tx(store).getAll(); r.onsuccess = () => res(r.result || []); }); }
  function idbGet(store, id) { return new Promise((res) => { const r = tx(store).get(id); r.onsuccess = () => res(r.result); }); }
  function idbPut(store, val) { return new Promise((res) => { const r = tx(store, 'readwrite').put(val); r.onsuccess = () => res(val); }); }
  function idbDelete(store, id) { return new Promise((res) => { const r = tx(store, 'readwrite').delete(id); r.onsuccess = () => res(); }); }

  async function init() {
    await openLocal();

    // 1) نحاول Firebase أول
    if (window.CONFIG && CONFIG.firebaseConfig && CONFIG.firebaseConfig.apiKey) {
      try {
        const appMod = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const fsMod = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
        const app = appMod.initializeApp(CONFIG.firebaseConfig);
        db = fsMod.getFirestore(app);
        FS = fsMod;
        mode = 'firebase';
      } catch (e) {
        console.error('تعذّر الاتصال بـ Firebase، رح نجرب البديل:', e);
      }
    }

    // 2) إذا Firebase ما اشتغل، نجرب Supabase
    if (mode === 'local' && window.CONFIG && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_KEY && window.supabase && window.supabase.createClient) {
      sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
      mode = 'supabase';
    }

    api.isShared = (mode !== 'local');
    api.mode = mode;
  }

  /* ---------------- الأعمال ---------------- */
  async function getWorks() {
    if (mode === 'firebase') {
      const snap = await FS.getDocs(FS.collection(db, 'works'));
      return snap.docs.map((d) => d.data());
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('works').select('data').order('updated_at', { ascending: false });
      if (error) { console.error(error); return []; }
      return (data || []).map((r) => r.data);
    }
    return idbGetAll('works');
  }
  async function getWork(id) {
    if (mode === 'firebase') {
      const d = await FS.getDoc(FS.doc(db, 'works', id));
      return d.exists() ? d.data() : undefined;
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('works').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return data.data;
    }
    return idbGet('works', id);
  }
  async function putWork(w) {
    w.updatedAt = Date.now();
    if (mode === 'firebase') {
      await FS.setDoc(FS.doc(db, 'works', w.id), w);
      return w;
    }
    if (mode === 'supabase') {
      const { error } = await sb.from('works').upsert({ id: w.id, data: w, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return w;
    }
    return idbPut('works', w);
  }
  async function deleteWork(id) {
    if (mode === 'firebase') { await FS.deleteDoc(FS.doc(db, 'works', id)); return; }
    if (mode === 'supabase') { await sb.from('works').delete().eq('id', id); return; }
    return idbDelete('works', id);
  }

  /* ---------------- الفصول ---------------- */
  async function getChapters(workId) {
    if (mode === 'firebase') {
      const q = FS.query(FS.collection(db, 'chapters'), FS.where('workId', '==', workId));
      const snap = await FS.getDocs(q);
      return snap.docs.map((d) => d.data());
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('chapters').select('data').eq('work_id', workId);
      if (error) { console.error(error); return []; }
      return (data || []).map((r) => r.data);
    }
    return (await idbGetAll('chapters')).filter((c) => c.workId === workId);
  }
  async function getChapter(id) {
    if (mode === 'firebase') {
      const d = await FS.getDoc(FS.doc(db, 'chapters', id));
      return d.exists() ? d.data() : undefined;
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('chapters').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return data.data;
    }
    return idbGet('chapters', id);
  }
  async function putChapter(c) {
    if (mode === 'firebase') {
      await FS.setDoc(FS.doc(db, 'chapters', c.id), c);
      return c;
    }
    if (mode === 'supabase') {
      const { error } = await sb.from('chapters').upsert({ id: c.id, work_id: c.workId, data: c, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return c;
    }
    return idbPut('chapters', c);
  }
  async function deleteChapter(id) {
    if (mode === 'firebase') { await FS.deleteDoc(FS.doc(db, 'chapters', id)); return; }
    if (mode === 'supabase') { await sb.from('chapters').delete().eq('id', id); return; }
    return idbDelete('chapters', id);
  }

  /* ---------------- التحميلات (محلية دائماً على جهاز المستخدم) ---------------- */
  async function getDownloads() { return idbGetAll('downloads'); }
  async function getDownload(id) { return idbGet('downloads', id); }
  async function putDownload(d) { return idbPut('downloads', d); }
  async function deleteDownload(id) { return idbDelete('downloads', id); }

  const api = {
    init, isShared: false, mode: 'local',
    getWorks, getWork, putWork, deleteWork,
    getChapters, getChapter, putChapter, deleteChapter,
    getDownloads, getDownload, putDownload, deleteDownload,
  };
  return api;
})();
