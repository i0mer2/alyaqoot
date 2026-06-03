import type { Metadata } from 'next';
import GalleryClient from '@/components/pages/GalleryClient';

export const metadata: Metadata = {
  title: 'معرض الأعمال',
  description: 'شاهد مشاريع ستائر الياقوت المنفّذة في بيوت ومكاتب عراقية — كلاسيك، مودرن، فاخرة، وعتمة.',
  alternates: { canonical: '/gallery' },
};

export default function Page() {
  return <GalleryClient />;
}
