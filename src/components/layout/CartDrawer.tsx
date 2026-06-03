'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { formatPrice, unitLabel } from '@/lib/utils';
import { orderWhatsAppLink } from '@/lib/order';
import { DELIVERY } from '@/lib/constants';
import CurtainArt from '@/components/art/CurtainArt';
import { getProduct } from '@/lib/data/products';

export default function CartDrawer() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const { items, isOpen, close, setQty, remove } = useCart();
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const delivery = subtotal >= DELIVERY.freeAbove || subtotal === 0 ? 0 : DELIVERY.fee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={L ? 'rtl' : 'ltr'}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ivory-soft shadow-luxe"
          >
            <div className="flex items-center justify-between border-b border-platinum-200 p-5">
              <h3 className="flex items-center gap-2 font-display text-2xl text-ink">
                <ShoppingBag size={22} className="text-ruby-700" /> {t.cart.title}
              </h3>
              <button onClick={close} className="rounded-full p-2 hover:bg-platinum-100">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag size={56} className="text-platinum-300" />
                <p className="text-ink-muted">{t.cart.empty}</p>
                <Link href="/products" onClick={close} className="btn-ruby">
                  {t.cart.emptyCta}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {items.map((it) => {
                    const p = getProduct(it.slug);
                    return (
                      <div key={it.key} className="flex gap-3 rounded-2xl bg-white p-3 shadow-soft">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                          <CurtainArt
                            color={p?.visualizer.baseColor ?? '#8a1b3d'}
                            pattern={p?.visualizer.pattern}
                            sheer={p?.visualizer.sheer}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <span className="font-semibold text-ink">{L ? it.name_ar : it.name_en}</span>
                          {it.color && <span className="text-xs text-ink-muted">{t.product.color}: {it.color}</span>}
                          {it.widthM && it.heightM && (
                            <span className="text-xs text-ink-muted">{it.widthM}م × {it.heightM}م</span>
                          )}
                          <span className="mt-0.5 text-sm font-bold text-ruby-700">
                            {formatPrice(it.price, locale)} <span className="text-xs font-normal text-ink-muted">{unitLabel(it.unit, locale)}</span>
                          </span>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-platinum-200">
                              <button onClick={() => setQty(it.key, it.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-platinum-100"><Minus size={14} /></button>
                              <span className="w-6 text-center text-sm font-semibold">{it.qty}</span>
                              <button onClick={() => setQty(it.key, it.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-platinum-100"><Plus size={14} /></button>
                            </div>
                            <button onClick={() => remove(it.key)} className="rounded-full p-2 text-ink-muted hover:bg-ruby-50 hover:text-ruby-700"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 border-t border-platinum-200 bg-white p-5">
                  <div className="flex justify-between text-sm text-ink-muted">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-semibold text-ink">{formatPrice(subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-ink-muted">
                    <span>{t.cart.delivery}</span>
                    <span className="font-semibold text-ink">{delivery === 0 ? (L ? 'مجاني' : 'Free') : formatPrice(delivery, locale)}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-platinum-200 pt-3 text-lg">
                    <span className="font-display">{t.cart.total}</span>
                    <span className="font-display text-ruby-800">{formatPrice(subtotal + delivery, locale)}</span>
                  </div>
                  <a
                    href={orderWhatsAppLink(items, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ruby w-full"
                  >
                    <MessageCircle size={18} /> {t.cart.checkout}
                  </a>
                  <Link href="/cart" onClick={close} className="btn-outline w-full">
                    {L ? 'إكمال بيانات التوصيل' : 'Enter delivery details'}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
