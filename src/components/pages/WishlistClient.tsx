'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ProductGrid from '@/components/product/ProductGrid';
import { useWishlist } from '@/store/wishlist';
import { products } from '@/lib/data/products';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function WishlistClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const ids = useWishlist((s) => s.ids);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <PageHeader eyebrow={L ? 'محفوظاتك' : 'Saved'} title={L ? 'المفضّلة' : 'Wishlist'} />
      <div className="container-luxe section-pad">
        {list.length ? (
          <ProductGrid products={list} />
        ) : (
          <div className="flex flex-col items-center gap-5 py-20 text-center">
            <Heart size={64} className="text-platinum-300" />
            <p className="text-ink-muted">{L ? 'لا توجد منتجات في المفضّلة بعد' : 'No favorites yet'}</p>
            <Link href="/products" className="btn-ruby">{L ? 'تصفّح المنتجات' : 'Browse products'}</Link>
          </div>
        )}
      </div>
    </>
  );
}
