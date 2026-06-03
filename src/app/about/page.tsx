import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'ستائر الياقوت من كركوك – السوق الكبير، بإدارة أحمد ترزي. خبرة وجودة في عالم الستائر والأقمشة الفاخرة.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutClient />;
}
