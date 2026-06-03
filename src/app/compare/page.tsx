import type { Metadata } from 'next';
import CompareClient from '@/components/pages/CompareClient';

export const metadata: Metadata = { title: 'مقارنة المنتجات', robots: { index: false } };

export default function Page() {
  return <CompareClient />;
}
