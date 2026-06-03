'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types';
import SectionTitle from '@/components/ui/Section';
import ProductGrid from '@/components/product/ProductGrid';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function ProductSection({
  section, products, href = '/products', tinted = false,
}: {
  section: 'featured' | 'offers'; products: Product[]; href?: string; tinted?: boolean;
}) {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const title = section === 'featured' ? t.sections.featured : t.sections.offers;
  const sub = section === 'featured' ? t.sections.featuredSub : t.sections.offersSub;
  const eyebrow = section === 'featured' ? (L ? 'مختارات' : 'Selected') : (L ? 'عروض' : 'Offers');

  return (
    <section className={`section-pad ${tinted ? 'bg-ivory-deep' : ''}`}>
      <div className="container-luxe">
        <SectionTitle eyebrow={eyebrow} title={title} sub={sub} />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
        <div className="mt-10 text-center">
          <Link href={href} className="btn-outline">
            {t.common.viewAll} <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
