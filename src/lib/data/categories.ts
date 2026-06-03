import type { Category } from '@/types';

/** الفئات — مرتّبة بالشكل المطلوب */
export const categories: Category[] = [
  {
    id: 'cat-modern', slug: 'modern', order: 1,
    name_ar: 'ستائر مودرن', name_en: 'Modern Curtains',
    tagline_ar: 'خطوط بسيطة وأناقة عصرية', tagline_en: 'Clean lines, modern elegance',
    description_ar: 'تصاميم عصرية بألوان هادئة وخامات خفيفة تناسب البيوت والمكاتب الحديثة.',
    description_en: 'Contemporary designs in calm tones for modern homes and offices.',
    image: '',
  },
  {
    id: 'cat-classic', slug: 'classic', order: 2,
    name_ar: 'ستائر كلاسيك', name_en: 'Classic Curtains',
    tagline_ar: 'فخامة لا تخرج عن الموضة', tagline_en: 'Timeless luxury',
    description_ar: 'كسرات غنية وأقمشة فخمة بلمسة تقليدية تعطي غرفتك دفء وهيبة.',
    description_en: 'Rich pleats and luxurious fabrics with a traditional touch.',
    image: '',
  },
  {
    id: 'cat-luxury', slug: 'luxury', order: 3,
    name_ar: 'ستائر فاخرة', name_en: 'Luxury Curtains',
    tagline_ar: 'قمّة الترف للنوافذ المميّزة', tagline_en: 'The peak of opulence',
    description_ar: 'مخمل وحرير وتطريز يدوي — لمن يريد لمسة قصور حقيقية.',
    description_en: 'Velvet, silk and hand embroidery for a palatial feel.',
    image: '',
  },
  {
    id: 'cat-blackout', slug: 'blackout', order: 4,
    name_ar: 'ستائر العتمة', name_en: 'Blackout Curtains',
    tagline_ar: 'تعتيم كامل ونوم مريح', tagline_en: 'Full blackout, restful sleep',
    description_ar: 'تحجب الضوء والحرارة بالكامل، مثالية لغرف النوم وقاعات السينما المنزلية.',
    description_en: 'Block light and heat fully — ideal for bedrooms & home cinemas.',
    image: '',
  },
  {
    id: 'cat-sheer', slug: 'sheer', order: 5,
    name_ar: 'ستائر شفّافة (تول)', name_en: 'Sheer Curtains',
    tagline_ar: 'إضاءة ناعمة وخصوصية', tagline_en: 'Soft light, gentle privacy',
    description_ar: 'تول خفيف يمرّر النور بنعومة ويحافظ على خصوصيتك نهاراً.',
    description_en: 'Light tulle that diffuses daylight while keeping privacy.',
    image: '',
  },
  {
    id: 'cat-fabric', slug: 'fabric', order: 6,
    name_ar: 'مجموعات الأقمشة', name_en: 'Fabric Collections',
    tagline_ar: 'اختر قماشك بالمتر', tagline_en: 'Choose your fabric by the meter',
    description_ar: 'تشكيلة واسعة من الأقمشة تُباع بالمتر لمشاريع التفصيل والديكور.',
    description_en: 'A wide range of fabrics sold by the meter for tailoring projects.',
    image: '',
  },
  {
    id: 'cat-custom', slug: 'custom', order: 7,
    name_ar: 'طلبات مخصّصة', name_en: 'Custom Orders',
    tagline_ar: 'صمّمها مثل ما تتخيّلها', tagline_en: 'Designed exactly your way',
    description_ar: 'عندك فكرة خاصة؟ نفصّلها لك حسب القياس واللون والخامة اللي تريدها.',
    description_en: 'Have a special idea? We tailor it to your size, color and fabric.',
    image: '',
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
