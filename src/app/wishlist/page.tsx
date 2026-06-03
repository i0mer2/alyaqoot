import type { Metadata } from 'next';
import WishlistClient from '@/components/pages/WishlistClient';

export const metadata: Metadata = { title: 'المفضّلة', robots: { index: false } };

export default function Page() {
  return <WishlistClient />;
}
