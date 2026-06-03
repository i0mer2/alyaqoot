'use client';

import type { Product } from '@/types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} i={i} />
      ))}
    </div>
  );
}
