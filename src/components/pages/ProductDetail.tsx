'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, GitCompare, ShoppingBag, Sparkles, MessageCircle, Minus, Plus, Truck, ShieldCheck, ChevronLeft } from 'lucide-react';
import type { Product } from '@/types';
import CurtainArt from '@/components/art/CurtainArt';
import CurtainCalculator from '@/components/product/CurtainCalculator';
import ProductCard from '@/components/product/ProductCard';
import Stars from '@/components/ui/Stars';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { useCompare } from '@/store/compare';
import { formatPrice, unitLabel, cn } from '@/lib/utils';
import { waLink, DELIVERY } from '@/lib/constants';

export default function ProductDetail({ product: p, related }: { product: Product; related: Product[] }) {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const add = useCart((s) => s.add);
  const wish = useWishlist();
  const compare = useCompare();

  const [color, setColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);
  const [artColor, setArtColor] = useState(p.visualizer.baseColor);

  const name = L ? p.name_ar : p.name_en;

  const pickColor = (c: typeof p.colors[number]) => { setColor(c); setArtColor(c.hex); };

  const addStandard = () => {
    add({
      key: `${p.id}-${color.hex}`, productId: p.id, slug: p.slug,
      name_ar: p.name_ar, name_en: p.name_en, image: p.images[0] ?? '',
      unit: p.unit, price: p.price, qty, color: L ? color.name_ar : color.name_en,
    });
  };

  const addCustom = (d: { meters: number; widthM: number; heightM: number }) => {
    add({
      key: `${p.id}-${color.hex}-${d.widthM}x${d.heightM}`, productId: p.id, slug: p.slug,
      name_ar: p.name_ar, name_en: p.name_en, image: '',
      unit: p.unit, price: p.price, qty: d.meters, color: L ? color.name_ar : color.name_en,
      widthM: d.widthM, heightM: d.heightM,
    });
  };

  const waMsg = L
    ? `مرحباً، أرغب بالاستفسار/الطلب عن: ${p.name_ar}\nاللون: ${color.name_ar}\nالسعر: ${formatPrice(p.price, locale)} ${unitLabel(p.unit, locale)}`
    : `Hello, I'm interested in: ${p.name_en}\nColor: ${color.name_en}`;

  return (
    <div className="container-luxe pb-10 pt-28">
      {/* مسار */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-ink-muted">
        <Link href="/" className="hover:text-ruby-700">{L ? 'الرئيسية' : 'Home'}</Link>
        <ChevronLeft size={14} className="rtl:rotate-180" />
        <Link href="/products" className="hover:text-ruby-700">{L ? 'المنتجات' : 'Products'}</Link>
        <ChevronLeft size={14} className="rtl:rotate-180" />
        <span className="text-ink">{name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* المعرض */}
        <div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="aspect-[4/5] overflow-hidden rounded-3xl bg-ivory-deep shadow-soft">
            <CurtainArt color={artColor} pattern={p.visualizer.pattern} sheer={p.visualizer.sheer} variant="double" />
          </motion.div>
          <div className="mt-4 flex gap-3">
            {p.colors.map((c) => (
              <button key={c.hex} onClick={() => pickColor(c)} className={cn('h-16 flex-1 overflow-hidden rounded-xl border-2 transition', color.hex === c.hex ? 'border-ruby-700' : 'border-transparent')}>
                <CurtainArt color={c.hex} pattern={p.visualizer.pattern} variant="tieback" />
              </button>
            ))}
          </div>
        </div>

        {/* المعلومات */}
        <div>
          <span className="text-sm font-medium uppercase tracking-wider text-champagne-600">{L ? p.fabric_ar : p.fabric_en}</span>
          <h1 className="mt-1 font-display text-4xl text-ink">{name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Stars value={p.rating ?? 5} />
            <span className="text-sm text-ink-muted">({p.reviews ?? 0} {L ? 'تقييم' : 'reviews'})</span>
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', p.inStock ? 'bg-green-100 text-green-700' : 'bg-platinum-100 text-ink-muted')}>
              {p.inStock ? t.common.inStock : t.common.outOfStock}
            </span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="font-display text-4xl text-ruby-800">{formatPrice(p.price, locale)}</span>
            <span className="mb-1 text-sm text-ink-muted">{unitLabel(p.unit, locale)}</span>
            {p.compareAtPrice && <span className="mb-1 text-lg text-ink-muted line-through">{formatPrice(p.compareAtPrice, locale)}</span>}
          </div>

          <p className="mt-4 leading-relaxed text-ink-soft">{L ? p.description_ar : p.description_en}</p>

          {/* الألوان */}
          <div className="mt-6">
            <span className="mb-2 block text-sm font-semibold text-ink">{t.product.color}: <span className="text-ink-muted">{L ? color.name_ar : color.name_en}</span></span>
            <div className="flex flex-wrap gap-2">
              {p.colors.map((c) => (
                <button key={c.hex} onClick={() => pickColor(c)} title={L ? c.name_ar : c.name_en} className={cn('h-9 w-9 rounded-full border', color.hex === c.hex ? 'ring-2 ring-ruby-700 ring-offset-2' : 'border-platinum-300')} style={{ background: c.hex }} />
              ))}
            </div>
          </div>

          {/* الشراء */}
          <div className="mt-7">
            {p.unit === 'custom' ? (
              <CurtainCalculator pricePerMeter={p.price} onAdd={addCustom} />
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-platinum-200 px-2 py-1.5">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-platinum-100"><Minus size={16} /></button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-platinum-100"><Plus size={16} /></button>
                  <span className="pe-2 text-xs text-ink-muted">{unitLabel(p.unit, locale)}</span>
                </div>
                <button onClick={addStandard} disabled={!p.inStock} className="btn-ruby flex-1 disabled:opacity-40">
                  <ShoppingBag size={18} /> {t.common.addToCart}
                </button>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1"><MessageCircle size={16} /> {t.common.orderWhatsapp}</a>
              <Link href="/visualizer" className="btn-outline"><Sparkles size={16} /> {t.product.tryRoom}</Link>
              <button onClick={() => wish.toggle(p.id)} className={cn('grid h-12 w-12 place-items-center rounded-full border', wish.has(p.id) ? 'border-ruby-700 text-ruby-700' : 'border-platinum-200')}><Heart size={18} className={wish.has(p.id) ? 'fill-ruby-600' : ''} /></button>
              <button onClick={() => compare.toggle(p.id)} className={cn('grid h-12 w-12 place-items-center rounded-full border', compare.has(p.id) ? 'border-ruby-700 text-ruby-700' : 'border-platinum-200')}><GitCompare size={18} /></button>
            </div>
          </div>

          {/* مزايا التوصيل */}
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-ivory-deep p-4 text-sm">
            <span className="flex items-center gap-2"><Truck size={16} className="text-ruby-700" /> {L ? `توصيل لكل العراق بـ ${DELIVERY.fee.toLocaleString()} د.ع` : 'Iraq-wide delivery'}</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-ruby-700" /> {L ? 'أقمشة أصلية مضمونة' : 'Authentic fabrics'}</span>
          </div>

          {/* المواصفات */}
          <div className="mt-6">
            <h3 className="mb-2 font-display text-lg">{t.product.specs}</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-platinum-200">
                <Row k={t.product.color} v={L ? color.name_ar : color.name_en} />
                {p.widthCm && <Row k={t.product.width} v={`${p.widthCm} ${L ? 'سم' : 'cm'}`} />}
                <Row k={t.product.origin} v={(L ? p.origin_ar : p.origin_en) ?? '-'} />
                <Row k={t.product.fabric} v={(L ? p.fabric_ar : p.fabric_en) ?? '-'} />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* مشابهات */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-display text-3xl text-ink">{t.product.related}</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((r, i) => <ProductCard key={r.id} product={r} i={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <tr>
      <td className="py-2.5 text-ink-muted">{k}</td>
      <td className="py-2.5 text-end font-medium text-ink">{v}</td>
    </tr>
  );
}
