# 04 — دليل النشر | Deployment Guide

## أ) المتطلّبات
- **Node.js 18+** (حمّله من nodejs.org).
- حساب **GitHub** + **Vercel** (مجاني) + **Supabase** (مجاني).

---

## ب) التشغيل محلياً
```bash
npm install
npm run dev      # http://localhost:3000
```
الموقع يعمل فوراً ببيانات تجريبية. لوحة التحكم: `/admin` (وضع تطوير بدون Supabase).

---

## ج) إعداد Supabase (لتفعيل الإدارة والطلبات)
1. أنشئ مشروعاً على [supabase.com](https://supabase.com) (اختر منطقة قريبة مثل Frankfurt).
2. **SQL Editor** → الصق محتوى [`supabase/schema.sql`](../supabase/schema.sql) ثم Run.
3. الصق [`supabase/seed.sql`](../supabase/seed.sql) ثم Run (بيانات أولية).
4. **Storage** → New bucket باسم `product-images` (Public).
5. **Authentication → Users → Add user**: أنشئ مستخدم الأدمن ببريد `trukmenogulu@gmail.com` وكلمة مرور قوية. (وللمشرف الثاني: أضِف بريده في دالة `is_admin()` ثم أنشئ مستخدمه.)
6. **Project Settings → API**: انسخ `Project URL`, `anon key`, `service_role key`.

---

## د) متغيّرات البيئة
أنشئ `.env.local` (محلياً) وأضِف نفس القيم في Vercel لاحقاً:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...          # خادم فقط — لا تكشفه
NEXT_PUBLIC_WHATSAPP_NUMBER=9647709164206
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADMIN_EMAIL=trukmenogulu@gmail.com
```

---

## هـ) النشر على Vercel
1. ارفع المشروع إلى GitHub:
   ```bash
   git init && git add . && git commit -m "ستائر الياقوت"
   git branch -M main
   git remote add origin https://github.com/<user>/alyaqoot.git
   git push -u origin main
   ```
2. على [vercel.com](https://vercel.com) → **New Project** → استورد المستودع.
3. Framework = **Next.js** (يُكتشف تلقائياً). أضِف **Environment Variables** من القسم (د).
4. **Deploy**. خلال دقائق سيكون الموقع على رابط `*.vercel.app`.
5. كل `git push` ينشر تلقائياً.

---

## و) ربط الدومين (لاحقاً)
- اشترِ دومين (مثل `alyaqoot.iq` أو `.com`).
- Vercel → Project → **Settings → Domains** → أضِف الدومين واتبع إعداد DNS.
- حدّث `NEXT_PUBLIC_SITE_URL` بالدومين الجديد ثم أعد النشر (لتصحّ روابط SEO/Sitemap).

> ملاحظة: لم تشترِ دوميناً بعد — يعمل الموقع على رابط Vercel المجاني إلى أن تجهّزه.

---

## ز) ما بعد النشر
- ادخل `/admin/login` ببريد الأدمن.
- أضِف منتجاتك وصورك الحقيقية من **المنتجات**، وعدّل الفئات، وتابع الطلبات.
- (اختياري) فعّل Google Search Console وأرسل `https://your-domain.com/sitemap.xml`.

---

## ح) استكشاف الأخطاء
| المشكلة | الحل |
|---|---|
| `node غير معروف` | ثبّت Node.js وأعد فتح الطرفية |
| لوحة التحكم تفتح بلا تسجيل دخول | Supabase غير مضبوط (وضع تطوير) — أضِف المفاتيح |
| الصور لا تظهر | طبيعي قبل رفع صورك — تظهر رسومات إجرائية |
| فشل حفظ منتج | تأكد من تشغيل `schema.sql` وأن بريدك ضمن `is_admin()` |
