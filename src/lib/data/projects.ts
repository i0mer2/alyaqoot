import type { Project } from '@/types';

/** معرض الأعمال (صور تُضاف لاحقاً من اللوحة؛ نعرضها برسومات إجرائية الآن) */
export const projects: Project[] = [
  { id: 'g1', title_ar: 'صالة كلاسيك – فيلا',  title_en: 'Classic living room – Villa', city: 'كركوك', category: 'classic', image: '' },
  { id: 'g2', title_ar: 'غرفة نوم – عتمة كاملة', title_en: 'Bedroom – full blackout', city: 'بغداد', category: 'blackout', image: '' },
  { id: 'g3', title_ar: 'مكتب مودرن', title_en: 'Modern office', city: 'أربيل', category: 'modern', image: '' },
  { id: 'g4', title_ar: 'مجلس فاخر – مخمل', title_en: 'Luxury majlis – velvet', city: 'النجف', category: 'luxury', image: '' },
  { id: 'g5', title_ar: 'مطبخ – تول ناعم', title_en: 'Kitchen – soft sheer', city: 'كركوك', category: 'sheer', image: '' },
  { id: 'g6', title_ar: 'استقبال فندق', title_en: 'Hotel reception', city: 'البصرة', category: 'luxury', image: '' },
  { id: 'g7', title_ar: 'شقة عصرية', title_en: 'Modern apartment', city: 'كركوك', category: 'modern', image: '' },
  { id: 'g8', title_ar: 'غرفة أطفال', title_en: 'Kids room', city: 'السليمانية', category: 'blackout', image: '' },
];
