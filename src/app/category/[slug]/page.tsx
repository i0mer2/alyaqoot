import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryClient from '@/components/pages/CategoryClient';
import { categories, getCategory } from '@/lib/data/categories';
import { productsByCategory } from '@/lib/data/products';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCategory(params.slug);
  if (!c) return { title: 'غير موجود' };
  return {
    title: c.name_ar,
    description: c.description_ar,
    alternates: { canonical: `/category/${c.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getCategory(params.slug);
  if (!c) notFound();
  return <CategoryClient category={c} products={productsByCategory(c.slug)} />;
}
