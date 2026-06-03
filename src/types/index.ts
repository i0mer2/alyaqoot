// ===========================================================================
//  الأنواع المشتركة — Shared domain types
// ===========================================================================

export type Locale = 'ar' | 'en';

/** أنواع الفئات — Category slugs */
export type CategorySlug =
  | 'modern'
  | 'classic'
  | 'luxury'
  | 'blackout'
  | 'sheer'
  | 'fabric'
  | 'custom';

/** وحدة البيع — How the product is sold */
export type SaleUnit = 'meter' | 'piece' | 'set' | 'custom';
//  meter = بالمتر | piece = قطعة جاهزة | set = طقم | custom = حسب القياس

export interface Category {
  id: string;
  slug: CategorySlug;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  tagline_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  order: number;
}

/** نسيج بصري لمعاينة AI داخل المتصفح (مجاني) */
export interface VisualizerTexture {
  baseColor: string; // hex
  sheer: boolean; // شفّاف؟
  pattern: 'plain' | 'stripe' | 'damask';
  sheen?: number; // 0..1 لمعان القماش
}

export interface Product {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  category: CategorySlug;
  description_ar: string;
  description_en: string;
  /** السعر الأساسي بالدينار العراقي (للمتر/القطعة/الطقم حسب unit) */
  price: number;
  compareAtPrice?: number;
  unit: SaleUnit;
  images: string[];
  /** ألوان متاحة (أسماء عربية -> hex) */
  colors: { name_ar: string; name_en: string; hex: string }[];
  widthCm?: number; // العرض بالسنتيمتر
  origin_ar?: string; // بلد المنشأ
  origin_en?: string;
  fabric_ar?: string;
  fabric_en?: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
  tags?: string[];
  visualizer: VisualizerTexture; // يُستخدم في معاينة الغرفة
}

export interface CartItem {
  key: string; // productId + variant signature
  productId: string;
  slug: string;
  name_ar: string;
  name_en: string;
  image: string;
  unit: SaleUnit;
  price: number; // unit price snapshot
  qty: number;
  color?: string;
  // للستائر حسب القياس
  widthM?: number;
  heightM?: number;
}

export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'delivering' | 'done' | 'cancelled';
export type PaymentMethod = 'cod' | 'mastercard' | 'whatsapp';

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  governorate: string; // المحافظة
  address: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text_ar: string;
  text_en: string;
  avatarColor: string;
}

export interface Project {
  id: string;
  title_ar: string;
  title_en: string;
  city: string;
  image: string;
  category: CategorySlug;
}

export interface BlogPost {
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  body_ar: string;
  cover: string;
  date: string;
  readMinutes: number;
  tag_ar: string;
}
