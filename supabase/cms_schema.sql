-- ===========================================================================
--  ستائر الياقوت — جداول CMS الشاملة
--  شغّل هذا في: Supabase → SQL Editor
-- ===========================================================================

-- 1) إعدادات الموقع (key-value)
create table if not exists public.site_settings (
  key        text primary key,
  value      text,
  label_ar   text,
  updated_at timestamptz default now()
);

-- 2) الآراء والتقييمات
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  city         text,
  rating       integer default 5,
  text_ar      text,
  text_en      text,
  avatar_color text default '#8a1b3d',
  active       boolean default true,
  sort_order   integer default 99,
  created_at   timestamptz default now()
);

-- 3) مقالات المدوّنة
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title_ar     text not null,
  title_en     text,
  excerpt_ar   text,
  body_ar      text,
  cover        text,
  tag_ar       text default 'مقال',
  read_minutes integer default 3,
  published    boolean default true,
  created_at   timestamptz default now()
);

-- 4) معرض الأعمال
create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  title_ar   text,
  title_en   text,
  city       text,
  category   text,
  image      text not null,
  sort_order integer default 99,
  active     boolean default true,
  created_at timestamptz default now()
);

-- 5) البانرات والعروض
create table if not exists public.banners (
  id          uuid primary key default gen_random_uuid(),
  title_ar    text,
  subtitle_ar text,
  badge_ar    text,
  cta_ar      text,
  cta_url     text,
  image       text,
  bg_color    text default '#8a1b3d',
  active      boolean default true,
  sort_order  integer default 99,
  created_at  timestamptz default now()
);

-- RLS
alter table public.site_settings  enable row level security;
alter table public.testimonials    enable row level security;
alter table public.blog_posts      enable row level security;
alter table public.gallery         enable row level security;
alter table public.banners         enable row level security;

-- قراءة عامة لكل الجداول
create policy "settings_read"      on public.site_settings  for select using (true);
create policy "testimonials_read"  on public.testimonials    for select using (active = true);
create policy "blog_read"          on public.blog_posts      for select using (published = true);
create policy "gallery_read"       on public.gallery         for select using (active = true);
create policy "banners_read"       on public.banners         for select using (active = true);

-- كتابة للمشرفين فقط
create policy "settings_write"     on public.site_settings  for all using (public.is_admin()) with check (public.is_admin());
create policy "testimonials_write" on public.testimonials    for all using (public.is_admin()) with check (public.is_admin());
create policy "blog_write"         on public.blog_posts      for all using (public.is_admin()) with check (public.is_admin());
create policy "gallery_write"      on public.gallery         for all using (public.is_admin()) with check (public.is_admin());
create policy "banners_write"      on public.banners         for all using (public.is_admin()) with check (public.is_admin());

-- إعدادات افتراضية
insert into public.site_settings (key, value, label_ar) values
  ('brand_name_ar',    'ستائر الياقوت',              'اسم العلامة (عربي)'),
  ('brand_name_en',    'Al-Yaqoot Curtains',          'اسم العلامة (إنجليزي)'),
  ('tagline_ar',       'للأقمشة والستائر',            'الشعار الفرعي'),
  ('phone',            '07709164206',                 'رقم الهاتف'),
  ('whatsapp',         '9647709164206',               'واتساب (بدون +)'),
  ('location_ar',      'كركوك – السوق الكبير',        'الموقع'),
  ('delivery_fee',     '5000',                        'رسوم التوصيل (دينار)'),
  ('free_above',       '250000',                      'توصيل مجاني فوق (دينار)'),
  ('hero_title_ar',    'ستائر الياقوت',              'عنوان الهيرو'),
  ('hero_subtitle_ar', 'نحوّل نوافذك إلى لوحة من الأناقة', 'العنوان الفرعي للهيرو'),
  ('hero_desc_ar',     'تشكيلة فاخرة من الستائر والأقمشة، تفصيل حسب القياس، وتوصيل لكل محافظات العراق.', 'وصف الهيرو'),
  ('about_story_ar',   'ستائر الياقوت — علامة عراقية أصيلة تأسست في كركوك. نقدّم أرقى الستائر والأقمشة مع خدمة تفصيل وتركيب احترافية.', 'قصة الشركة'),
  ('about_vision_ar',  'أن نكون الخيار الأول لكل بيت عراقي يبحث عن الأناقة بسعر مناسب.', 'الرؤية'),
  ('about_mission_ar', 'تقديم ستائر فاخرة بجودة عالية وأسعار تنافسية مع خدمة عملاء استثنائية.', 'الرسالة'),
  ('meta_title_ar',    'ستائر الياقوت | ستائر وأقمشة فاخرة في كركوك والعراق', 'عنوان SEO'),
  ('meta_desc_ar',     'ستائر الياقوت — تشكيلة فاخرة من الستائر والأقمشة، تفصيل حسب القياس، توصيل لكل محافظات العراق.', 'وصف SEO')
on conflict (key) do nothing;

-- آراء افتراضية
insert into public.testimonials (name, city, rating, text_ar, avatar_color, sort_order) values
  ('أم محمد', 'كركوك', 5, 'والله ستارة البيت صارت تحفة! الشغل نظيف والتفصيل مضبوط على القياس.', '#8a1b3d', 1),
  ('أبو عمر', 'بغداد',  5, 'طلبت عن بُعد ووصلني لبغداد بسرعة وبخمس آلاف بس. القماش أصلي وقوي.', '#1f3a5f', 2),
  ('سارة',    'أربيل',  5, 'فكرة تجربة الستارة بالصورة قبل الشراء عجيبة! ساعدتني أختار اللون الصح.', '#c9a24b', 3),
  ('أبو رؤى', 'كركوك', 5, 'ستائر العتمة خيال — الغرفة صارت ظلمة تامة والولد صار ينام مرتاح.', '#4a5d4a', 4),
  ('هدى',     'النجف',  5, 'المخمل الياقوتي شكله بالبيت أفخم من الصورة! جنّن كل اللي شافه عدنا.', '#7a1f33', 5)
on conflict do nothing;

-- مقالات مدوّنة افتراضية
insert into public.blog_posts (slug, title_ar, excerpt_ar, body_ar, tag_ar, read_minutes) values
  ('how-to-choose-curtains','كيف تختار الستارة المناسبة لغرفتك؟','دليل عملي لاختيار اللون والخامة والطول حسب نوع الغرفة.','اختيار الستارة يعتمد على ثلاثة أشياء: وظيفة الغرفة، كمية الضوء، وستايل الديكور.\n\n١) غرف النوم: اختر ستائر العتمة لنوم مريح.\n٢) الصالات: امزج بين ستارة ثقيلة وتول شفاف.\n٣) المطابخ: أقمشة سهلة الغسل هي الأنسب.','دليل',5),
  ('blackout-vs-sheer','العتمة أو التول؟ ليش ما تجمع الاثنين','نظام الطبقتين يعطيك تحكم كامل بالضوء والخصوصية.','نظام الطبقتين: تول خفيف نهاراً وستارة عتمة ليلاً. الحل المثالي لكل غرفة نوم.','نصائح',4),
  ('measure-your-window','كيف تقيس نافذتك بالشكل الصح','خطوات بسيطة لقياس العرض والارتفاع وكمية القماش.','قِس عرض النافذة واضرب بـ٢.٥ للكثافة الفخمة. أضف ١٠سم للارتفاع للخياطة.','دليل',6)
on conflict (slug) do nothing;
