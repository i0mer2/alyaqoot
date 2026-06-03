import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/pages/ProductDetail';
import { products, getProduct, productsByCategory } from '@/lib/data/products';
import { SITE_URL } from '@/lib/constants';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: 'غير موجود' };
  return {
    title: p.name_ar,
    description: p.description_ar,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name_ar} | ستائر الياقوت`, description: p.description_ar },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = productsByCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name_ar,
    description: p.description_ar,
    category: p.category,
    brand: { '@type': 'Brand', name: 'ستائر الياقوت' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating ?? 5, reviewCount: p.reviews ?? 1 },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'IQD',
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/products/${p.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductDetail product={p} related={related} />
    </>
  );
}
