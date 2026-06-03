'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import CurtainCalculator from '@/components/product/CurtainCalculator';
import { useCart } from '@/store/cart';
import { products } from '@/lib/data/products';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { formatPrice } from '@/lib/utils';

export default function CalculatorClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const meterFabrics = products.filter((p) => p.unit === 'meter');
  const [pid, setPid] = useState(meterFabrics[0]?.id);
  const product = products.find((p) => p.id === pid);
  const add = useCart((s) => s.add);

  return (
    <>
      <PageHeader eyebrow={L ? 'أداة' : 'Tool'} title={L ? 'حاسبة الستائر' : 'Curtain Calculator'} sub={L ? 'احسب كمية القماش والتكلفة التقديرية بثوانٍ' : 'Estimate fabric & cost in seconds'} />
      <div className="container-luxe section-pad grid max-w-3xl gap-6">
        <div className="rounded-3xl bg-white p-5 shadow-soft">
          <label className="mb-1.5 block text-sm text-ink-muted">{L ? 'اختر القماش' : 'Choose fabric'}</label>
          <select value={pid} onChange={(e) => setPid(e.target.value)} className="w-full rounded-xl border border-platinum-200 bg-white p-3 outline-none focus:border-champagne">
            {meterFabrics.map((p) => (
              <option key={p.id} value={p.id}>{(L ? p.name_ar : p.name_en)} — {formatPrice(p.price, locale)}/{L ? 'م' : 'm'}</option>
            ))}
          </select>
        </div>

        <CurtainCalculator
          pricePerMeter={product?.price}
          onAdd={(d) => product && add({
            key: `${product.id}-calc-${d.widthM}x${d.heightM}`, productId: product.id, slug: product.slug,
            name_ar: product.name_ar, name_en: product.name_en, image: '', unit: 'custom',
            price: product.price, qty: d.meters, widthM: d.widthM, heightM: d.heightM,
          })}
        />

        <div className="rounded-3xl border border-platinum-200 bg-ivory-soft p-5 text-sm leading-relaxed text-ink-soft">
          <h3 className="mb-2 font-display text-lg text-ink">{L ? 'كيف تحسب؟' : 'How it works'}</h3>
          {L
            ? 'الكمية المطلوبة = عرض النافذة × معامل الكثافة. الكثافة العادية ×٢، والفخمة حتى ×٣ لكسرات أغنى. ننصح بإضافة ١٠ سم للخياطة من الأعلى والأسفل.'
            : 'Required fabric = window width × fullness. Standard fullness ×2, luxury up to ×3 for richer pleats.'}
        </div>
      </div>
    </>
  );
}
