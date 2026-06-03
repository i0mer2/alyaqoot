'use client';

import type { Category, Product } from '@/types';
import PageHeader from '@/components/ui/PageHeader';
import ProductGrid from '@/components/product/ProductGrid';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function CategoryClient({ category, products }: { category: Category; products: Product[] }) {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  return (
    <>
      <PageHeader eyebrow={L ? 'تشكيلة' : 'Collection'} title={L ? category.name_ar : category.name_en} sub={L ? category.description_ar : category.description_en} />
      <div className="container-luxe section-pad">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="py-16 text-center text-ink-muted">{L ? 'سنضيف منتجات هذه الفئة قريباً' : 'Products coming soon'}</p>
        )}
      </div>
    </>
  );
}
