'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, GitCompare, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { useCompare } from '@/store/compare';
import { formatPrice, unitLabel, cn } from '@/lib/utils';
import CurtainArt from '@/components/art/CurtainArt';

export default function ProductCard({ product: p, i = 0 }: { product: Product; i?: number }) {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const add = useCart((s) => s.add);
  const wish = useWishlist();
  const compare = useCompare();

  const name = L ? p.name_ar : p.name_en;

  const quickAdd = () => {
    if (p.unit === 'custom') return; // يحتاج قياس → صفحة المنتج
    add({
      key: p.id,
      productId: p.id,
      slug: p.slug,
      name_ar: p.name_ar,
      name_en: p.name_en,
      image: p.images[0] ?? '',
      unit: p.unit,
      price: p.price,
      qty: 1,
      color: L ? p.colors[0]?.name_ar : p.colors[0]?.name_en,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="card-luxe group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        <Link href={`/products/${p.slug}`} className="absolute inset-0">
          {p.images[0] ? (
            <Image src={p.images[0]} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
          ) : (
            <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
              <CurtainArt color={p.visualizer.baseColor} pattern={p.visualizer.pattern} sheer={p.visualizer.sheer} variant="tieback" />
            </div>
          )}
        </Link>

        {/* شارات */}
        <div className="absolute start-3 top-3 flex flex-col gap-1.5">
          {p.isNew && <span className="rounded-full bg-ruby-gradient px-2.5 py-1 text-[11px] font-bold text-white shadow">{t.common.new}</span>}
          {p.compareAtPrice && <span className="rounded-full bg-champagne px-2.5 py-1 text-[11px] font-bold text-ink shadow">{t.common.sale}</span>}
          {!p.inStock && <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-bold text-white">{t.common.outOfStock}</span>}
        </div>

        {/* أدوات سريعة */}
        <div className="absolute end-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <IconBtn active={wish.has(p.id)} onClick={() => wish.toggle(p.id)} label={t.product.addWishlist}>
            <Heart size={17} className={wish.has(p.id) ? 'fill-ruby-600 text-ruby-600' : ''} />
          </IconBtn>
          <IconBtn active={compare.has(p.id)} onClick={() => compare.toggle(p.id)} label={t.nav.compare}>
            <GitCompare size={17} />
          </IconBtn>
          <Link href={`/products/${p.slug}`}>
            <IconBtn label={t.common.details}><Eye size={17} /></IconBtn>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-champagne-600">
          {L ? p.fabric_ar : p.fabric_en}
        </span>
        <Link href={`/products/${p.slug}`} className="mt-1 font-display text-lg leading-tight text-ink hover:text-ruby-800">
          {name}
        </Link>

        {/* ألوان */}
        <div className="mt-2 flex gap-1.5">
          {p.colors.slice(0, 5).map((c) => (
            <span key={c.hex} title={L ? c.name_ar : c.name_en} className="h-4 w-4 rounded-full border border-platinum-300" style={{ background: c.hex }} />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {p.compareAtPrice && (
              <span className="block text-xs text-ink-muted line-through">{formatPrice(p.compareAtPrice, locale)}</span>
            )}
            <span className="font-display text-xl text-ruby-800">{formatPrice(p.price, locale)}</span>
            <span className="text-xs text-ink-muted"> {unitLabel(p.unit, locale)}</span>
          </div>

          {p.unit === 'custom' ? (
            <Link href={`/products/${p.slug}`} className="grid h-10 w-10 place-items-center rounded-full bg-ruby-gradient text-white shadow-luxe transition hover:scale-110">
              <Eye size={18} />
            </Link>
          ) : (
            <button
              onClick={quickAdd}
              disabled={!p.inStock}
              aria-label={t.common.addToCart}
              className="grid h-10 w-10 place-items-center rounded-full bg-ruby-gradient text-white shadow-luxe transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShoppingBag size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function IconBtn({
  children, onClick, label, active,
}: {
  children: React.ReactNode; onClick?: () => void; label: string; active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition hover:scale-110 hover:text-ruby-700',
        active && 'text-ruby-700',
      )}
    >
      {children}
    </button>
  );
}
