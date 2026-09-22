/* =====================================================================
   طبقة التخزين (Store)
   =====================================================================
   ترتيب الأولوية تلقائياً:
   1) Firebase Firestore — إذا كانت CONFIG.firebaseConfig.apiKey موجودة
   2) Supabase — إذا كانت CONFIG.SUPABASE_URL و CONFIG.SUPABASE_KEY موجودة
   3) IndexedDB محلي — إذا ماكو ولا وحدة مفعّلة (تخزين على جهاز المستخدم بس)

   مجموعة الأعمال بـ Firestore اسمها بالضبط "manga" (بالحروف اللاتينية،
   نفس اللي تشوفه بلوحة Firebase Console — راجعتها من صورة قاعدة بياناتك).
   الفصول مخزّنة كمجموعة فرعية تحت كل مستند: manga/{workId}/chapters/{id}
   (نفس البنية اللي شفناها بلوحتك، مو مجموعة منفصلة بحقل workId).

   ماكو أي بيانات وهمية (dummy) بهذا الملف إطلاقاً — إذا رجّعت المكتبة
   فاضية، السبب فعلي: إما قاعدة البيانات فاضية بعد، أو صار خطأ بالاتصال
   (يظهر بـ Store.error بعد init، وتقدر تطبعه بـ console لمعرفة السبب).
   ===================================================================== */
const Store = (function () {
  const WORKS_COLLECTION = 'manga'; // بالحروف اللاتينية — يطابق Firestore Console بالضبط
  let mode = 'local'; // 'firebase' | 'supabase' | 'local'
  let sb = null;       // عميل Supabase
  let db = null;       // عميل Firestore
  let FS = null;       // دوال Firestore (collection, doc, getDoc, ...)

  let ldb; // قاعدة بيانات محلية على جهاز المستخدم (دائماً للتحميلات، واحتياط فقط لو ماكو أي اتصال)
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

  /* ---------------- تطبيع بيانات العمل ----------------
     يقبل مستندات ناقصة أو بشكل مختلف (متل الحقول اللي ترفعها أدوات
     خارجية) ويرجعها بنفس الشكل القياسي اللي يفهمه باقي التطبيق. */
  function toMillis(v) {
    if (!v) return Date.now();
    if (typeof v === 'number') return v;
    if (typeof v.toMillis === 'function') return v.toMillis(); // Firestore Timestamp
    if (v.seconds) return v.seconds * 1000;
    return Date.now();
  }
  function normalizeWork(raw) {
    if (!raw) return raw;
    const w = Object.assign({}, raw);
    if (!w.cover && w.coverUrl) w.cover = w.coverUrl; // الحقل ممكن يجي بأي وحدة من الاسمين
    if (w.sourceSite && !w.source) w.source = w.sourceSite;
    if (typeof w.chapters !== 'number') {
      const m = String(w.latestChapter || '').match(/(\d+)/);
      w.chapters = m ? Number(m[1]) : 0;
    }
    if (!w.status) w.status = 'مستمر';
    if (!w.type) w.type = 'مانجا';
    if (!Array.isArray(w.genres)) w.genres = [];
    if (typeof w.avgRating !== 'number') w.avgRating = 8;
    if (!w.dist) w.dist = null;
    if (!w.desc) w.desc = '';
    if (!w.publisher) w.publisher = w.source || '';
    if (!w.from) w.from = '';
    if (!w.title) w.title = 'بدون عنوان';
    w.createdAt = toMillis(w.createdAt);
    w.updatedAt = toMillis(w.updatedAt);
    return w;
  }

  const api = {
    init, isShared: false, mode: 'local', error: null,
    getWorks: null, getWork: null, putWork: null, deleteWork: null,
    getChapters: null, getChapter: null, putChapter: null, deleteChapter: null,
    getDownloads: null, getDownload: null, putDownload: null, deleteDownload: null,
  };

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
        api.error = 'تعذّر الاتصال بـ Firebase: ' + (e && e.message ? e.message : e);
        console.error(api.error);
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
  api.getWorks = async function () {
    let list;
    if (mode === 'firebase') {
      try {
        const snap = await FS.getDocs(FS.collection(db, WORKS_COLLECTION));
        list = snap.docs.map((d) => normalizeWork(Object.assign({ id: d.id }, d.data())));
      } catch (e) {
        api.error = 'تعذّر قراءة مجموعة "' + WORKS_COLLECTION + '": ' + (e && e.message ? e.message : e);
        console.error(api.error);
        list = [];
      }
    } else if (mode === 'supabase') {
      const { data, error } = await sb.from('works').select('data');
      if (error) { console.error(error); list = []; }
      else list = (data || []).map((r) => normalizeWork(r.data));
    } else {
      list = (await idbGetAll('works')).map(normalizeWork);
    }
    return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  };
  api.getWork = async function (id) {
    if (mode === 'firebase') {
      const d = await FS.getDoc(FS.doc(db, WORKS_COLLECTION, id));
      return d.exists() ? normalizeWork(Object.assign({ id: d.id }, d.data())) : undefined;
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('works').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return normalizeWork(data.data);
    }
    const w = await idbGet('works', id);
    return w ? normalizeWork(w) : undefined;
  };
  api.putWork = async function (w) {
    w.updatedAt = Date.now();
    if (mode === 'firebase') {
      const { id } = w;
      const payload = Object.assign({}, w);
      delete payload.id;
      await FS.setDoc(FS.doc(db, WORKS_COLLECTION, id), payload, { merge: true });
      return w;
    }
    if (mode === 'supabase') {
      const { error } = await sb.from('works').upsert({ id: w.id, data: w, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return w;
    }
    return idbPut('works', w);
  };
  api.deleteWork = async function (id) {
    if (mode === 'firebase') { await FS.deleteDoc(FS.doc(db, WORKS_COLLECTION, id)); return; }
    if (mode === 'supabase') { await sb.from('works').delete().eq('id', id); return; }
    return idbDelete('works', id);
  };

  /* ---------------- الفصول (مجموعة فرعية تحت كل عمل بـ Firestore) ---------------- */
  api.getChapters = async function (workId) {
    if (mode === 'firebase') {
      try {
        const snap = await FS.getDocs(FS.collection(db, WORKS_COLLECTION, workId, 'chapters'));
        return snap.docs.map((d) => Object.assign({ id: d.id, workId }, d.data()));
      } catch (e) {
        console.error('تعذّر قراءة فصول العمل', workId, e);
        return [];
      }
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('chapters').select('data').eq('work_id', workId);
      if (error) { console.error(error); return []; }
      return (data || []).map((r) => r.data);
    }
    return (await idbGetAll('chapters')).filter((c) => c.workId === workId);
  };
  api.getChapter = async function (workId, id) {
    if (mode === 'firebase') {
      const d = await FS.getDoc(FS.doc(db, WORKS_COLLECTION, workId, 'chapters', id));
      return d.exists() ? Object.assign({ id: d.id, workId }, d.data()) : undefined;
    }
    if (mode === 'supabase') {
      const { data, error } = await sb.from('chapters').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return data.data;
    }
    return idbGet('chapters', id);
  };
  api.putChapter = async function (c) {
    if (mode === 'firebase') {
      const { id, workId } = c;
      const payload = Object.assign({}, c);
      delete payload.id; delete payload.workId;
      await FS.setDoc(FS.doc(db, WORKS_COLLECTION, workId, 'chapters', id), payload, { merge: true });
      return c;
    }
    if (mode === 'supabase') {
      const { error } = await sb.from('chapters').upsert({ id: c.id, work_id: c.workId, data: c, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return c;
    }
    return idbPut('chapters', c);
  };
  api.deleteChapter = async function (workId, id) {
    if (mode === 'firebase') { await FS.deleteDoc(FS.doc(db, WORKS_COLLECTION, workId, 'chapters', id)); return; }
    if (mode === 'supabase') { await sb.from('chapters').delete().eq('id', id); return; }
    return idbDelete('chapters', id);
  };

  /* ---------------- التحميلات (محلية دائماً على جهاز المستخدم) ---------------- */
  api.getDownloads = async function () { return idbGetAll('downloads'); };
  api.getDownload = async function (id) { return idbGet('downloads', id); };
  api.putDownload = async function (d) { return idbPut('downloads', d); };
  api.deleteDownload = async function (id) { return idbDelete('downloads', id); };

  return api;
})();
