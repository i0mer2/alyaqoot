# 03 — مخطط قاعدة البيانات | Database Schema

الملف التنفيذي: [`../supabase/schema.sql`](../supabase/schema.sql) · البيانات الأولية: [`../supabase/seed.sql`](../supabase/seed.sql)

## مخطط العلاقات (ERD)

```
┌────────────────┐        ┌──────────────────────────┐
│   categories   │        │         products          │
├────────────────┤        ├──────────────────────────┤
│ id (uuid) PK    │        │ id (uuid) PK              │
│ slug (unique)   │◀──────┤│ category → categories.slug│
│ name_ar/en      │  1   ∞ │ slug (unique)             │
│ tagline_ar/en   │        │ name_ar/en, price, unit   │
│ description...  │        │ images/colors (jsonb)     │
│ "order"         │        │ base_color/pattern/sheer  │
└────────────────┘        │ in_stock/featured/is_new  │
                          │ rating/reviews, width_cm  │
┌────────────────┐        └──────────────────────────┘
│     orders     │
├────────────────┤        ┌──────────────────────────┐
│ id (uuid) PK    │        │         coupons          │
│ customer_name   │        ├──────────────────────────┤
│ phone, gov, addr│        │ code (unique), percent_off│
│ items (jsonb)   │        │ active, expires_at        │
│ subtotal/total  │        └──────────────────────────┘
│ status          │
│ payment_method  │
└────────────────┘
```

## الجداول

### `categories` — الفئات
| العمود | النوع | ملاحظة |
|---|---|---|
| `slug` | text UNIQUE | معرّف الفئة (modern, classic…) |
| `name_ar/en`, `tagline_ar/en`, `description_ar/en` | text | ثنائي اللغة |
| `order` | int | ترتيب العرض |

### `products` — المنتجات
| العمود | النوع | ملاحظة |
|---|---|---|
| `slug` | text UNIQUE | رابط المنتج |
| `category` | text FK→categories.slug | |
| `price` / `compare_at_price` | int | بالدينار العراقي |
| `unit` | text | `meter / piece / set / custom` |
| `images` / `colors` | jsonb | روابط الصور / `[{name_ar,name_en,hex}]` |
| `base_color`,`pattern`,`sheer` | | لمعاينة الغرفة |
| `width_cm`,`origin_ar/en`,`fabric_ar/en` | | المواصفات |
| `in_stock`,`featured`,`is_new`,`rating`,`reviews` | | حالة وتسويق |

### `orders` — الطلبات
| العمود | النوع | ملاحظة |
|---|---|---|
| `items` | jsonb | لقطة عناصر السلة |
| `subtotal/delivery_fee/total` | int | |
| `status` | text | `new→confirmed→preparing→delivering→done / cancelled` |
| `payment_method` | text | `cod / mastercard / whatsapp` |

### `coupons` — للتوسّع (كوبونات الخصم)

## الأمان (RLS)
- `categories`, `products`: **قراءة عامة**، **كتابة للمشرفين فقط** عبر دالة `is_admin()` التي تتحقق من بريد المستخدم.
- `orders`: الإدراج عبر **service-role** (مسار `/api/orders`)، والاطّلاع/التحديث للمشرفين فقط.
- خزّن صور المنتجات في حاوية `product-images` (قراءة عامة، كتابة للمشرفين).

## تعدّد المشرفين (مشرفان)
عدّل قائمة البريد داخل دالة `is_admin()` في `schema.sql`:
```sql
(auth.jwt() ->> 'email') in ('trukmenogulu@gmail.com', 'second-admin@email.com')
```
ثم أنشئ مستخدمَي الدخول من Supabase → Authentication → Users.
