-- ===========================================================================
--  ستائر الياقوت — مخطط قاعدة البيانات (PostgreSQL / Supabase)
--  شغّل هذا الملف في: Supabase Dashboard → SQL Editor
-- ===========================================================================

-- امتدادات
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1) قائمة المشرفين المسموح لهم بالكتابة (عدّل القائمة حسب حاجتك — حتى مشرفَين)
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql stable
as $$
  select coalesce(
    (auth.jwt() ->> 'email') in (
      'trukmenogulu@gmail.com'   -- المشرف الرئيسي
      -- , 'second-admin@email.com' -- أضف المشرف الثاني هنا عند الحاجة
    ),
    false
  );
$$;

-- ---------------------------------------------------------------------------
-- 2) الفئات
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name_ar      text not null,
  name_en      text,
  tagline_ar   text,
  tagline_en   text,
  description_ar text,
  description_en text,
  image        text,
  "order"      integer default 99,
  created_at   timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- 3) المنتجات
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name_ar          text not null,
  name_en          text,
  category         text not null references public.categories(slug) on update cascade,
  description_ar   text,
  description_en   text,
  price            integer not null default 0,          -- بالدينار العراقي
  compare_at_price integer,
  unit             text not null default 'meter',        -- meter | piece | set | custom
  images           jsonb default '[]'::jsonb,
  colors           jsonb default '[]'::jsonb,            -- [{name_ar,name_en,hex}]
  width_cm         integer,
  origin_ar        text,
  origin_en        text,
  fabric_ar        text,
  fabric_en        text,
  base_color       text default '#8a1b3d',               -- لمعاينة الغرفة
  pattern          text default 'plain',                 -- plain | stripe | damask
  sheer            boolean default false,
  in_stock         boolean default true,
  featured         boolean default false,
  is_new           boolean default false,
  rating           numeric(2,1) default 5.0,
  reviews          integer default 0,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_featured_idx on public.products(featured);

-- ---------------------------------------------------------------------------
-- 4) الطلبات
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz default now(),
  customer_name  text not null,
  phone          text not null,
  governorate    text,
  address        text,
  note           text,
  items          jsonb not null default '[]'::jsonb,
  subtotal       integer default 0,
  delivery_fee   integer default 0,
  total          integer default 0,
  status         text default 'new',                    -- new|confirmed|preparing|delivering|done|cancelled
  payment_method text default 'cod'                      -- cod|mastercard|whatsapp
);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_idx on public.orders(created_at desc);

-- ---------------------------------------------------------------------------
-- 5) المفضّلة/الكوبونات (للتوسّع المستقبلي)
-- ---------------------------------------------------------------------------
create table if not exists public.coupons (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  percent_off integer default 0,
  active      boolean default true,
  expires_at  timestamptz,
  created_at  timestamptz default now()
);

-- ===========================================================================
--  Row Level Security (RLS)
-- ===========================================================================
alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.orders     enable row level security;
alter table public.coupons    enable row level security;

-- الفئات: قراءة عامة، كتابة للمشرفين فقط
drop policy if exists "categories_read" on public.categories;
create policy "categories_read"  on public.categories for select using (true);
drop policy if exists "categories_write" on public.categories;
create policy "categories_write" on public.categories for all
  using (public.is_admin()) with check (public.is_admin());

-- المنتجات: قراءة عامة، كتابة للمشرفين فقط
drop policy if exists "products_read" on public.products;
create policy "products_read"  on public.products for select using (true);
drop policy if exists "products_write" on public.products;
create policy "products_write" on public.products for all
  using (public.is_admin()) with check (public.is_admin());

-- الطلبات: الإدراج عبر service role فقط (API)، والاطّلاع/التحديث للمشرفين
drop policy if exists "orders_admin_read" on public.orders;
create policy "orders_admin_read"   on public.orders for select using (public.is_admin());
drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders for update using (public.is_admin());

-- الكوبونات: قراءة عامة (للتحقق)، كتابة للمشرفين
drop policy if exists "coupons_read" on public.coupons;
create policy "coupons_read"  on public.coupons for select using (true);
drop policy if exists "coupons_write" on public.coupons;
create policy "coupons_write" on public.coupons for all
  using (public.is_admin()) with check (public.is_admin());

-- ===========================================================================
--  Storage: حاوية صور المنتجات (نفّذ بعد إنشاء الحاوية product-images من اللوحة)
-- ===========================================================================
-- create bucket 'product-images' (public) من: Storage → New bucket
drop policy if exists "product_images_read" on storage.objects;
create policy "product_images_read" on storage.objects for select
  using (bucket_id = 'product-images');
drop policy if exists "product_images_write" on storage.objects;
create policy "product_images_write" on storage.objects for insert
  with check (bucket_id = 'product-images' and public.is_admin());
