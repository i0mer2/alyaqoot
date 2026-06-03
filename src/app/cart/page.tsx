import type { Metadata } from 'next';
import CartClient from '@/components/pages/CartClient';

export const metadata: Metadata = { title: 'سلة التسوّق', robots: { index: false } };

export default function Page() {
  return <CartClient />;
}
