/* =====================================================================
   طبقة التخزين (Store)
   =====================================================================
   واجهة واحدة موحّدة يستخدمها app.js بدون ما يهمه من وين تيجي البيانات:

   - إذا كانت بيانات Supabase موجودة بـ config.js → التخزين يصير على
     قاعدة بيانات مشتركة على الإنترنت، وكل من يفتح التطبيق يشوف نفس
     المكتبة (الأعمال + الفصول).
   - إذا كانت فاضية → التخزين يصير محلي على جهاز المستخدم فقط (IndexedDB)
     عشان التطبيق يشتغل فوراً بدون أي إعداد إضافي.

   بكلا الحالتين، "التحميلات" (نظام تحميل الفصول للقراءة بدون إنترنت)
   تبقى دائماً محلية على جهاز كل مستخدم، لأنها بطبيعتها شخصية.
   ===================================================================== */
const Store = (function () {
  const hasSupabase = !!(window.CONFIG && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_KEY);
  let sb = null;
  if (hasSupabase && window.supabase && window.supabase.createClient) {
    sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
  }

  let ldb; // قاعدة بيانات محلية على جهاز المستخدم (تُستخدم دائماً للتحميلات، وللمكتبة كاملة إذا ماكو Supabase)
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
  function tx(store, mode = 'readonly') { return ldb.transaction(store, mode).objectStore(store); }
  function idbGetAll(store) { return new Promise((res) => { const r = tx(store).getAll(); r.onsuccess = () => res(r.result || []); }); }
  function idbGet(store, id) { return new Promise((res) => { const r = tx(store).get(id); r.onsuccess = () => res(r.result); }); }
  function idbPut(store, val) { return new Promise((res) => { const r = tx(store, 'readwrite').put(val); r.onsuccess = () => res(val); }); }
  function idbDelete(store, id) { return new Promise((res) => { const r = tx(store, 'readwrite').delete(id); r.onsuccess = () => res(); }); }

  async function init() { await openLocal(); }

  /* ---------------- الأعمال ---------------- */
  async function getWorks() {
    if (sb) {
      const { data, error } = await sb.from('works').select('data').order('updated_at', { ascending: false });
      if (error) { console.error(error); return []; }
      return (data || []).map((r) => r.data);
    }
    return idbGetAll('works');
  }
  async function getWork(id) {
    if (sb) {
      const { data, error } = await sb.from('works').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return data.data;
    }
    return idbGet('works', id);
  }
  async function putWork(w) {
    w.updatedAt = Date.now();
    if (sb) {
      const { error } = await sb.from('works').upsert({ id: w.id, data: w, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return w;
    }
    return idbPut('works', w);
  }
  async function deleteWork(id) {
    if (sb) { await sb.from('works').delete().eq('id', id); return; }
    return idbDelete('works', id);
  }

  /* ---------------- الفصول ---------------- */
  async function getChapters(workId) {
    if (sb) {
      const { data, error } = await sb.from('chapters').select('data').eq('work_id', workId);
      if (error) { console.error(error); return []; }
      return (data || []).map((r) => r.data);
    }
    return (await idbGetAll('chapters')).filter((c) => c.workId === workId);
  }
  async function getChapter(id) {
    if (sb) {
      const { data, error } = await sb.from('chapters').select('data').eq('id', id).maybeSingle();
      if (error || !data) return undefined;
      return data.data;
    }
    return idbGet('chapters', id);
  }
  async function putChapter(c) {
    if (sb) {
      const { error } = await sb.from('chapters').upsert({ id: c.id, work_id: c.workId, data: c, updated_at: new Date().toISOString() });
      if (error) console.error(error);
      return c;
    }
    return idbPut('chapters', c);
  }
  async function deleteChapter(id) {
    if (sb) { await sb.from('chapters').delete().eq('id', id); return; }
    return idbDelete('chapters', id);
  }

  /* ---------------- التحميلات (محلية دائماً على جهاز المستخدم) ---------------- */
  async function getDownloads() { return idbGetAll('downloads'); }
  async function getDownload(id) { return idbGet('downloads', id); }
  async function putDownload(d) { return idbPut('downloads', d); }
  async function deleteDownload(id) { return idbDelete('downloads', id); }

  return {
    init, isShared: !!sb,
    getWorks, getWork, putWork, deleteWork,
    getChapters, getChapter, putChapter, deleteChapter,
    getDownloads, getDownload, putDownload, deleteDownload,
  };
})();
