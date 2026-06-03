'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import ProductGrid from '@/components/product/ProductGrid';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

type Sort = 'new' | 'price-asc' | 'price-desc';

export default function ProductsClient() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const params = useSearchParams();
  const [cat, setCat] = useState<string>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('new');

  useEffect(() => {
    const c = params.get('cat');
    const query = params.get('q');
    if (c) setCat(c);
    if (query) setQ(query);
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name_ar.toLowerCase().includes(s) ||
          p.name_en.toLowerCase().includes(s) ||
          (p.tags ?? []).some((tg) => tg.toLowerCase().includes(s)),
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [cat, q, sort]);

  return (
    <>
      <PageHeader eyebrow={L ? 'المتجر' : 'Shop'} title={L ? 'منتجاتنا' : 'Our Products'} sub={L ? 'تشكيلة فاخرة من الستائر والأقمشة' : 'A premium range of curtains & fabrics'} />

      <div className="container-luxe section-pad">
        {/* شريط الأدوات */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Chip active={cat === 'all'} onClick={() => setCat('all')}>{L ? 'الكل' : 'All'}</Chip>
            {categories.map((c) => (
              <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {L ? c.name_ar : c.name_en}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={L ? 'بحث…' : 'Search…'}
                className="w-44 rounded-full border border-platinum-200 bg-white py-2.5 ps-9 pe-4 text-sm outline-none focus:border-champagne"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-platinum-200 bg-white py-2.5 ps-9 pe-4 text-sm outline-none focus:border-champagne"
              >
                <option value="new">{L ? 'الأحدث' : 'Newest'}</option>
                <option value="price-asc">{L ? 'الأرخص' : 'Price ↑'}</option>
                <option value="price-desc">{L ? 'الأغلى' : 'Price ↓'}</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="py-20 text-center text-ink-muted">{L ? 'لا توجد نتائج' : 'No results'}</p>
        )}
      </div>
    </>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition',
        active ? 'border-ruby-700 bg-ruby-gradient text-white shadow-luxe' : 'border-platinum-200 bg-white text-ink hover:border-champagne',
      )}
    >
      {children}
    </button>
  );
}
