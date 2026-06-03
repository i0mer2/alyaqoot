<div align="center">

# 💎 ستائر الياقوت | Al-Yaqoot Curtains

**منصّة تجارة إلكترونية فاخرة للستائر والأقمشة — كركوك، العراق**

عربي (RTL) + إنجليزي · Next.js 14 · Supabase · 3D · مُصمّم ستائر بالذكاء الاصطناعي (مجاني)

</div>

---

## ✨ نظرة عامة

موقع متكامل وفخم لعرض وبيع الستائر والأقمشة، يشمل:

- 🏠 **واجهة فاخرة** بهوية الياقوت (أحمر ياقوتي + فضي + ذهبي هادئ) مع مشهد قماش **ثلاثي الأبعاد** يتفاعل مع الماوس.
- 🛍️ **متجر كامل**: فئات، تفاصيل منتج، ألوان، بيع بالمتر/قطعة/طقم/حسب القياس، سلة، مفضّلة، مقارنة.
- 🤖 **مُصمّم الستائر الذكي**: يرفع الزبون صورة غرفته ويعاين الستارة داخلها — **مجاني 100%** ويعمل داخل المتصفح (بخصوصية تامة)، مع بنية جاهزة لتفعيل مزوّد AI مدفوع لاحقاً.
- 📐 **حاسبة كمية القماش** التلقائية.
- 🧮 **لوحة تحكم** لإدارة المنتجات والفئات والطلبات — بدون لمس الكود.
- 💬 **طلب عبر واتساب بضغطة زر** + الدفع عند الاستلام، وتوصيل لكل محافظات العراق.
- 🔍 **SEO** كامل (Sitemap، JSON-LD، Metadata عربية).

> الموقع يعمل **فوراً ببيانات تجريبية** بدون أي إعداد. عند ربط Supabase تُفعّل الإدارة الحقيقية والطلبات.

---

## 🚀 البدء السريع

```bash
# 1) ثبّت Node.js 18+ من https://nodejs.org  ثم:
npm install

# 2) (اختياري) انسخ متغيّرات البيئة
cp .env.local.example .env.local   # على ويندوز: copy .env.local.example .env.local

# 3) شغّل بيئة التطوير
npm run dev
# افتح http://localhost:3000  ولوحة التحكم على http://localhost:3000/admin
```

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | تشغيل التطوير |
| `npm run build` | بناء الإنتاج |
| `npm run start` | تشغيل بعد البناء |
| `npm run lint` | فحص الكود |
| `npm run typecheck` | فحص الأنواع |

---

## 🧱 المكدّس التقني (Tech Stack)

- **الواجهة:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Three.js / React-Three-Fiber
- **الحالة:** Zustand (سلة/مفضّلة/مقارنة) مع حفظ محلي
- **الباك-إند:** Supabase (PostgreSQL + Auth + Storage) عبر `@supabase/ssr`
- **الذكاء الاصطناعي:** طبقة خدمة معيارية + وضع مجاني داخل المتصفح (Canvas)
- **النشر:** Vercel

---

## 📁 هيكل المشروع (مختصر)

```
src/
├── app/                # المسارات (App Router)
│   ├── page.tsx            الرئيسية
│   ├── products/           المنتجات + [slug]
│   ├── category/[slug]/    صفحات الفئات
│   ├── visualizer/         مُصمّم الستائر الذكي
│   ├── calculator/         حاسبة القماش
│   ├── cart, wishlist, compare, about, gallery, blog, contact
│   ├── admin/              لوحة التحكم (login, products, categories, orders)
│   ├── api/                ai/visualize · orders
│   ├── sitemap.ts robots.ts manifest.ts icon.svg
│   └── layout.tsx globals.css
├── components/         # الواجهات (home, product, visualizer, admin, layout, ui, three, art, seo)
├── lib/                # constants, utils, i18n, data(تجريبي), supabase, ai, visualizer, order
├── store/              # zustand
└── types/
supabase/               # schema.sql · seed.sql
docs/                   # كل التوثيق التفصيلي
```

التفاصيل الكاملة في [`docs/01-ARCHITECTURE.md`](docs/01-ARCHITECTURE.md).

---

## 🔑 متغيّرات البيئة

انظر [`.env.local.example`](.env.local.example). أهمّها:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...           # خادم فقط
NEXT_PUBLIC_WHATSAPP_NUMBER=9647709164206
NEXT_PUBLIC_ADMIN_EMAIL=trukmenogulu@gmail.com
```

---

## 📚 التوثيق

| المستند | المحتوى |
|---|---|
| [01-ARCHITECTURE](docs/01-ARCHITECTURE.md) | المعمارية وتدفّق البيانات وهيكل المجلدات |
| [02-WIREFRAMES](docs/02-WIREFRAMES.md) | مخططات UI/UX لكل الصفحات |
| [03-DATABASE-SCHEMA](docs/03-DATABASE-SCHEMA.md) | الجداول والعلاقات وRLS |
| [04-DEPLOYMENT](docs/04-DEPLOYMENT.md) | النشر على Vercel + إعداد Supabase + الدومين |
| [05-SEO](docs/05-SEO.md) | إعداد SEO والكلمات المفتاحية لكركوك/العراق |
| [06-SECURITY](docs/06-SECURITY.md) | أفضل ممارسات الأمان |
| [07-SCALABILITY](docs/07-SCALABILITY.md) | خارطة التوسّع (دفع، فروع، تطبيق، AI مدفوع) |
| [08-AI-VISUALIZER](docs/08-AI-VISUALIZER.md) | كيف يعمل المُصمّم الذكي وكيف تضيف مزوّد AI |

---

## 🖼️ صورك وشعارك

- ضع شعارك الرسمي في `public/logo.png` (يوجد شعار نصّي فخم كبديل حتى ذلك الحين).
- صور المنتجات تُضاف من **لوحة التحكم** لاحقاً؛ وإلى أن تُضاف يعرض الموقع **رسومات ستائر إجرائية أنيقة** على هوية العلامة (لا صور مكسورة).

---

<div align="center">
صُمّم بعناية لعشّاق التفاصيل · ستائر الياقوت · بإدارة أحمد ترزي
</div>
