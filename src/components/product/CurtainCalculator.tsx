'use client';

import { useMemo, useState } from 'react';
import { Calculator, ShoppingBag } from 'lucide-react';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { formatPrice } from '@/lib/utils';

/**
 * حاسبة كمية القماش المطلوبة للستائر.
 * المتر المطلوب = عرض النافذة × معامل الكثافة (الكسرات).
 */
export default function CurtainCalculator({
  pricePerMeter,
  onAdd,
  compact = false,
}: {
  pricePerMeter?: number;
  onAdd?: (data: { meters: number; widthM: number; heightM: number; total: number }) => void;
  compact?: boolean;
}) {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const [widthM, setWidthM] = useState(2);
  const [heightM, setHeightM] = useState(2.6);
  const [fullness, setFullness] = useState(2.5);

  const { meters, total } = useMemo(() => {
    const m = Math.max(1, Math.ceil(widthM * fullness));
    return { meters: m, total: pricePerMeter ? m * pricePerMeter : 0 };
  }, [widthM, fullness, pricePerMeter]);

  return (
    <div className={`rounded-3xl border border-platinum-200 bg-ivory-soft p-5 ${compact ? '' : 'md:p-6'}`}>
      <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-ink">
        <Calculator size={20} className="text-ruby-700" /> {L ? 'حاسبة كمية القماش' : 'Fabric calculator'}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <Field label={L ? 'عرض النافذة (متر)' : 'Window width (m)'}>
          <input type="number" min={0.5} step={0.1} value={widthM} onChange={(e) => setWidthM(parseFloat(e.target.value) || 0)} className="num" />
        </Field>
        <Field label={L ? 'ارتفاع النافذة (متر)' : 'Height (m)'}>
          <input type="number" min={0.5} step={0.1} value={heightM} onChange={(e) => setHeightM(parseFloat(e.target.value) || 0)} className="num" />
        </Field>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm text-ink-muted">{L ? 'كثافة الكسرات' : 'Fullness'}</label>
        <div className="flex gap-2">
          {[2, 2.5, 3].map((f) => (
            <button
              key={f}
              onClick={() => setFullness(f)}
              className={`flex-1 rounded-lg border px-2 py-2 text-sm transition ${fullness === f ? 'border-ruby-700 bg-ruby-50 text-ruby-800' : 'border-platinum-200'}`}
            >
              ×{f} {f === 2 ? (L ? 'عادي' : 'Std') : f === 3 ? (L ? 'فخم' : 'Lux') : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft">
        <div>
          <div className="text-sm text-ink-muted">{L ? 'الكمية المطلوبة' : 'Required'}</div>
          <div className="font-display text-2xl text-ink">{meters} {L ? 'متر' : 'm'}</div>
        </div>
        {pricePerMeter ? (
          <div className="text-end">
            <div className="text-sm text-ink-muted">{L ? 'التكلفة التقديرية' : 'Estimated'}</div>
            <div className="font-display text-2xl text-ruby-800">{formatPrice(total, locale)}</div>
          </div>
        ) : null}
      </div>

      {onAdd && (
        <button onClick={() => onAdd({ meters, widthM, heightM, total })} className="btn-ruby mt-4 w-full">
          <ShoppingBag size={18} /> {L ? `أضف ${meters} متر للسلة` : `Add ${meters}m to cart`}
        </button>
      )}

      <style jsx>{`
        .num {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e4e4e8;
          background: #fff;
          padding: 0.6rem 0.8rem;
          outline: none;
          font-weight: 600;
        }
        .num:focus { border-color: #d0a35e; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink-muted">{label}</label>
      {children}
    </div>
  );
}
