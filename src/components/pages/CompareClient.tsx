'use client';

import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import CurtainArt from '@/components/art/CurtainArt';
import { useCompare } from '@/store/compare';
import { products } from '@/lib/data/products';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { formatPrice, unitLabel } from '@/lib/utils';

export default function CompareClient() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const { ids, toggle } = useCompare();
  const list = products.filter((p) => ids.includes(p.id));

  if (!list.length) {
    return (
      <>
        <PageHeader title={L ? 'مقارنة المنتجات' : 'Compare'} />
        <div className="container-luxe flex flex-col items-center gap-5 py-20 text-center">
          <GitCompare size={64} className="text-platinum-300" />
          <p className="text-ink-muted">{L ? 'أضف منتجات للمقارنة من صفحة المنتج' : 'Add products to compare'}</p>
          <Link href="/products" className="btn-ruby">{L ? 'تصفّح المنتجات' : 'Browse products'}</Link>
        </div>
      </>
    );
  }

  const rows: { label: string; render: (p: (typeof list)[number]) => string }[] = [
    { label: t.product.unitPrice, render: (p) => `${formatPrice(p.price, locale)} ${unitLabel(p.unit, locale)}` },
    { label: t.product.fabric, render: (p) => (L ? p.fabric_ar : p.fabric_en) ?? '-' },
    { label: t.product.origin, render: (p) => (L ? p.origin_ar : p.origin_en) ?? '-' },
    { label: t.product.width, render: (p) => (p.widthCm ? `${p.widthCm} ${L ? 'سم' : 'cm'}` : '-') },
    { label: L ? 'التوفّر' : 'Stock', render: (p) => (p.inStock ? t.common.inStock : t.common.outOfStock) },
  ];

  return (
    <>
      <PageHeader title={L ? 'مقارنة المنتجات' : 'Compare'} />
      <div className="container-luxe section-pad overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-x-3">
          <thead>
            <tr>
              <th />
              {list.map((p) => (
                <th key={p.id} className="w-56 align-top">
                  <div className="relative rounded-2xl bg-white p-3 shadow-soft">
                    <button onClick={() => toggle(p.id)} className="absolute end-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-platinum-100 hover:bg-ruby-50"><X size={14} /></button>
                    <div className="mb-2 aspect-[4/5] overflow-hidden rounded-xl">
                      <CurtainArt color={p.visualizer.baseColor} pattern={p.visualizer.pattern} sheer={p.visualizer.sheer} variant="tieback" />
                    </div>
                    <Link href={`/products/${p.slug}`} className="font-display text-base text-ink hover:text-ruby-800">{L ? p.name_ar : p.name_en}</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="py-3 text-sm font-semibold text-ink-muted">{r.label}</td>
                {list.map((p) => (
                  <td key={p.id} className="py-3 text-center text-sm text-ink">{r.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
