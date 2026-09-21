/* =====================================================================
   fetch-meta — دالة تعمل على سيرفر Netlify (مو بمتصفح المستخدم)
   =====================================================================
   الهدف الوحيد: تجيب "معاينة" لصفحة عمل واحدة يحددها المشرف بنفسه —
   العنوان + صورة الغلاف + الوصف — نفس فكرة "معاينة الرابط" اللي تشوفها
   لما تلصق رابط بواتساب أو تويتر. هذا كل شي تسويه.

   ما تسوي:
   - ما تزحف (crawl) على كامل الموقع ولا تكتشف السلاسل بنفسها.
   - ما تجيب فصول ولا صور صفحات المانجا/المانهوا إطلاقاً.
   - ما تحفظ أي شي تلقائياً — النتيجة ترجع للمشرف بس يراجعها ويضغط حفظ.

   ليش سيرفر ومو مباشرة من المتصفح؟ لأن أغلب المواقع تمنع المتصفح
   من قراءة صفحاتها مباشرة (CORS)، فنسوي الطلب من جهة السيرفر.
   ===================================================================== */
exports.handler = async function (event) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  const url = (event.queryStringParameters && event.queryStringParameters.url || '').trim();
  if (!url || !/^https?:\/\//i.test(url)) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'رابط غير صالح' }) };
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PureMangaPreview/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) {
      return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'تعذر فتح الصفحة (' + res.status + ')' }) };
    }
    // نقرأ جزء من الصفحة بس (الرأس عادة) توفيراً للوقت والموارد
    const reader = res.body ? res.body.getReader() : null;
    let html = '';
    if (reader) {
      let received = 0;
      const decoder = new TextDecoder('utf-8');
      while (received < 250000) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
        received += value.length;
      }
    } else {
      html = await res.text();
    }

    const pick = (re) => { const m = html.match(re); return m ? m[1].trim() : ''; };
    const title =
      pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i) ||
      pick(/<title[^>]*>([^<]+)<\/title>/i);
    const image =
      pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const description =
      pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
      pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);

    const decodeEntities = (s) => (s || '')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    return {
      statusCode: 200, headers: cors,
      body: JSON.stringify({
        title: decodeEntities(title).slice(0, 200),
        image: image || '',
        description: decodeEntities(description).slice(0, 600),
      }),
    };
  } catch (e) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'تعذر جلب المعلومات من هذا الرابط' }) };
  }
};
