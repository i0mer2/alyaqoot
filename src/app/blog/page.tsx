import type { Metadata } from 'next';
import BlogClient from '@/components/pages/BlogClient';

export const metadata: Metadata = {
  title: 'المدوّنة — نصائح وأدلة الستائر',
  description: 'مقالات ونصائح من ستائر الياقوت: كيف تختار الستارة، قياس النوافذ، أحدث صيحات الديكور.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogClient />;
}
