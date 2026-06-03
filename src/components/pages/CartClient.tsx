'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import CurtainArt from '@/components/art/CurtainArt';
import { useCart } from '@/store/cart';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { getProduct } from '@/lib/data/products';
import { formatPrice, unitLabel } from '@/lib/utils';
import { orderWhatsAppLink, type CustomerInfo } from '@/lib/order';
import { DELIVERY, GOVERNORATES } from '@/lib/constants';

export default function CartClient() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const { items, setQty, remove } = useCart();
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const delivery = subtotal >= DELIVERY.freeAbove || subtotal === 0 ? 0 : DELIVERY.fee;
  const total = subtotal + delivery;

  const [info, setInfo] = useState<CustomerInfo>({ name: '', phone: '', governorate: 'كركوك', address: '', note: '' });
  const valid = info.name.trim() && info.phone.trim() && info.address.trim();

  if (items.length === 0) {
    return (
      <>
        <PageHeader title={t.cart.title} />
        <div className="container-luxe flex flex-col items-center gap-5 py-24 text-center">
          <ShoppingBag size={64} className="text-platinum-300" />
          <p className="text-lg text-ink-muted">{t.cart.empty}</p>
          <Link href="/products" className="btn-ruby">{t.cart.emptyCta}</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={t.cart.title} />
      <div className="container-luxe section-pad grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* العناصر */}
        <div className="space-y-4">
          {items.map((it) => {
            const p = getProduct(it.slug);
            return (
              <div key={it.key} className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft">
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl">
                  <CurtainArt color={p?.visualizer.baseColor ?? '#8a1b3d'} pattern={p?.visualizer.pattern} sheer={p?.visualizer.sheer} />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <Link href={`/products/${it.slug}`} className="font-display text-lg text-ink hover:text-ruby-800">{L ? it.name_ar : it.name_en}</Link>
                    <button onClick={() => remove(it.key)} className="text-ink-muted hover:text-ruby-700"><Trash2 size={18} /></button>
                  </div>
                  {it.color && <span className="text-sm text-ink-muted">{t.product.color}: {it.color}</span>}
                  {it.widthM && it.heightM && <span className="text-sm text-ink-muted">{L ? 'القياس' : 'Size'}: {it.widthM}م × {it.heightM}م</span>}
                  <span className="text-sm font-bold text-ruby-700">{formatPrice(it.price, locale)} {unitLabel(it.unit, locale)}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-platinum-200">
                      <button onClick={() => setQty(it.key, it.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-platinum-100"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                      <button onClick={() => setQty(it.key, it.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-platinum-100"><Plus size={14} /></button>
                    </div>
                    <span className="font-display text-lg text-ink">{formatPrice(it.price * it.qty, locale)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* الملخّص + التوصيل */}
        <aside className="space-y-5">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="mb-4 font-display text-xl">{t.cart.yourInfo}</h3>
            <div className="space-y-3">
              <Input label={t.cart.name} value={info.name} onChange={(v) => setInfo({ ...info, name: v })} />
              <Input label={t.cart.phone} value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} type="tel" />
              <div>
                <label className="mb-1 block text-sm text-ink-muted">{t.cart.gov}</label>
                <select value={info.governorate} onChange={(e) => setInfo({ ...info, governorate: e.target.value })} className="field">
                  {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <Input label={t.cart.address} value={info.address} onChange={(v) => setInfo({ ...info, address: v })} />
              <Input label={t.cart.note} value={info.note ?? ''} onChange={(v) => setInfo({ ...info, note: v })} />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="space-y-2 text-sm">
              <Line k={t.cart.subtotal} v={formatPrice(subtotal, locale)} />
              <Line k={t.cart.delivery} v={delivery === 0 ? (L ? 'مجاني' : 'Free') : formatPrice(delivery, locale)} />
              <div className="flex justify-between border-t border-dashed border-platinum-200 pt-3 text-lg">
                <span className="font-display">{t.cart.total}</span>
                <span className="font-display text-ruby-800">{formatPrice(total, locale)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-ivory-deep p-3 text-sm text-ink-soft">
              <ShieldCheck size={18} className="text-ruby-700" /> {t.cart.cod} — {L ? 'تدفع عند وصول الطلب' : 'Pay on delivery'}
            </div>

            <a
              href={valid ? orderWhatsAppLink(items, locale, info) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!valid}
              className={`btn-ruby mt-4 w-full ${!valid ? 'pointer-events-none opacity-50' : ''}`}
            >
              <MessageCircle size={18} /> {t.cart.checkout}
            </a>
            {!valid && <p className="mt-2 text-center text-xs text-ink-muted">{L ? 'يرجى إكمال الاسم والهاتف والعنوان' : 'Please fill name, phone & address'}</p>}
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .field { width:100%; border-radius:0.75rem; border:1px solid #e4e4e8; background:#fff; padding:0.6rem 0.8rem; outline:none; }
        .field:focus { border-color:#d0a35e; }
      `}</style>
    </>
  );
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-ink-muted">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="field" />
    </div>
  );
}
function Line({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between text-ink-muted"><span>{k}</span><span className="font-semibold text-ink">{v}</span></div>;
}
