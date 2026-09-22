/* =====================================================================
   إعدادات تطبيق مانجا بيور
   =====================================================================
   بشكله الحالي (وحقلي SUPABASE_URL و SUPABASE_KEY فاضيين) يشتغل التطبيق
   بتخزين محلي على جهازك انت بس — يعني إذا عطيت الملف لصديقك، ما راح
   يشوف نفس الأعمال إلا إذا فعّلت المكتبة المشتركة بالخطوات التالية:

   1) روح لـ https://supabase.com وسوّي حساب ومشروع جديد (مجاني).
   2) افتح "SQL Editor" بمشروعك، وشغّل كامل محتوى ملف supabase-schema.sql
      الموجود بجانب هذا الملف (نسخ + لصق + Run).
   3) من "Settings → API" بمشروعك، انسخ:
        - Project URL
        - anon public key
   4) الصقهم بالمكانين تحت واحفظ الملف، وارفع كل المجلد على Netlify.

   بعدها كل من يفتح التطبيق (على أي جهاز) راح يشوف نفس مكتبة الأعمال
   ونفس الروابط والفصول، لأن التخزين صار على قاعدة بيانات مشتركة
   مو على جهاز وحد بس.

   ملاحظة أمان: مفتاح anon public مصمم للاستخدام بالمتصفح وهذا طبيعي،
   بس بشكله الافتراضي بملف supabase-schema.sql أي شخص عنده رابط التطبيق
   يكدر يضيف/يعدّل/يحذف من المكتبة (مو بس يقرأ). هذا مناسب هسه لمرحلة
   التجربة بينك وبين صديقك. لما تريد تطلق التطبيق لعدد اكبر من الناس،
   خبرني ونضيف نظام تسجيل دخول للمشرف بس يقدر يضيف/يحذف.

   نفس الملاحظة تنطبق على Firebase: لازم تتأكد إن قواعد أمان Firestore
   (Firebase Console ← Firestore Database ← Rules) تسمح بالقراءة والكتابة،
   وإلا التطبيق ما يقدر يحفظ ولا يقرأ شي. الصق هذا بمربع القواعد واضغط نشر:

     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if true;
         }
       }
     }
   ===================================================================== */
const CONFIG = {
  // Supabase (اختياري — احتياطي إذا ما اشتغل Firebase لأي سبب)
  SUPABASE_URL: '',
  SUPABASE_KEY: '',

  // Firebase Firestore — مشروع Pure Library (مفعّل الآن، هذا التخزين المستخدم فعلياً)
  firebaseConfig: {
    apiKey: "AIzaSyBkaDrsjial5W6xyXPPt1-trJhR7E9n2p4",
    authDomain: "pure-library-2d45d.firebaseapp.com",
    projectId: "pure-library-2d45d",
    storageBucket: "pure-library-2d45d.firebasestorage.app",
    messagingSenderId: "953898341477",
    appId: "1:953898341477:web:85409f5597f894ff13e28c",
    measurementId: "G-YS8VFDXVKZ"
  },
};
// مهم جداً: `const` بأعلى ملف سكربت عادي ما ينحط تلقائياً على window —
// وهذا كان بالضبط سبب فشل الاتصال بكل النسخ الماضية (store.js كان
// يتأكد من window.CONFIG قبل ما يكمل، وهذا كان دائماً undefined رغم
// إن CONFIG نفسه معرّف صح). هذا السطر يصلحها نهائياً:
window.CONFIG = CONFIG;
