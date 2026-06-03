import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/pages/ProductsClient';

export const metadata: Metadata = {
  title: 'المنتجات — ستائر وأقمشة فاخرة',
  description: 'تصفّح تشكيلة ستائر الياقوت: مودرن، كلاسيك، فاخرة، عتمة، شفّافة، وأقمشة بالمتر. أسعار اقتصادية وتوصيل لكل العراق.',
  alternates: { canonical: '/products' },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
