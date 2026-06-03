// ===========================================================================
//  ثوابت العلامة التجارية — Brand & site constants
// ===========================================================================

export const BRAND = {
  name_ar: 'ستائر الياقوت',
  name_en: 'Al-Yaqoot Curtains',
  tagline_ar: 'للأقمشة والستائر',
  tagline_en: 'Fabrics & Curtains',
  manager_ar: 'بإدارة أحمد ترزي',
  manager_en: 'Managed by Ahmed Tarzi',
  phoneDisplay: '0770 916 4206',
  // رقم واتساب بصيغة دولية بدون + (يُقرأ من البيئة مع قيمة افتراضية)
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9647709164206',
  location_ar: 'كركوك – السوق الكبير',
  location_en: 'Kirkuk – Grand Bazaar',
  email: 'trukmenogulu@gmail.com',
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://alyaqoot.vercel.app';

export const DELIVERY = {
  /** رسوم التوصيل لكل المحافظات (دينار عراقي) */
  fee: 5000,
  freeAbove: 250000, // توصيل مجاني فوق هذا المبلغ (قابل للتعديل من اللوحة لاحقاً)
  installCity_ar: 'كركوك',
  currency_ar: 'د.ع',
  currency_en: 'IQD',
} as const;

/** محافظات العراق — Iraqi governorates */
export const GOVERNORATES = [
  'بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء', 'كركوك',
  'السليمانية', 'دهوك', 'الأنبار', 'ديالى', 'واسط', 'ميسان',
  'ذي قار', 'المثنى', 'القادسية', 'بابل', 'صلاح الدين', 'حلبجة',
] as const;

/** روابط التنقّل — Navigation */
export const NAV = [
  { href: '/', label_ar: 'الرئيسية', label_en: 'Home' },
  { href: '/products', label_ar: 'المنتجات', label_en: 'Products' },
  { href: '/visualizer', label_ar: 'جرّب الستارة بغرفتك', label_en: 'Room Visualizer' },
  { href: '/gallery', label_ar: 'معرض الأعمال', label_en: 'Gallery' },
  { href: '/blog', label_ar: 'المدوّنة', label_en: 'Blog' },
  { href: '/about', label_ar: 'من نحن', label_en: 'About' },
  { href: '/contact', label_ar: 'تواصل معنا', label_en: 'Contact' },
] as const;

/** بناء رابط واتساب مع رسالة جاهزة */
export function waLink(message: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
