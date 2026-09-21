-- =====================================================================
-- تطبيق مانجا بيور — إعداد قاعدة البيانات المشتركة على Supabase
-- انسخ كامل هذا الملف والصقه في SQL Editor بمشروعك على supabase.com
-- ثم اضغط Run. يكفي تشغيله مرة وحدة فقط.
-- =====================================================================

-- جدول الأعمال (مانجا / مانهوا) — بيانات المكتبة المشتركة
create table if not exists works (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- جدول الفصول — كل فصل مرتبط بعمل عبر work_id
create table if not exists chapters (
  id text primary key,
  work_id text not null references works(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz default now()
);

create index if not exists chapters_work_id_idx on chapters(work_id);

-- تفعيل أمان الصفوف (مطلوب من Supabase حتى يُسمح بالوصول عبر مفتاح anon)
alter table works enable row level security;
alter table chapters enable row level security;

-- سياسات مفتوحة: أي شخص يفتح التطبيق يكدر يقرأ + يضيف + يعدّل + يحذف.
-- مناسبة لمرحلة التجربة الحالية. راجع ملاحظة الأمان بملف config.js.
drop policy if exists "public full access works" on works;
create policy "public full access works" on works
  for all using (true) with check (true);

drop policy if exists "public full access chapters" on chapters;
create policy "public full access chapters" on chapters
  for all using (true) with check (true);
