'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { NAV } from '@/lib/constants';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { cn } from '@/lib/utils';

export default function Header() {
  const { locale, toggle, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const openCart = useCart((s) => s.open);
  const wishCount = useWishlist((s) => s.ids.length);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass shadow-soft py-2' : 'bg-transparent py-4',
      )}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active ? 'text-ruby-800' : 'text-ink hover:text-ruby-700',
                )}
              >
                {locale === 'ar' ? item.label_ar : item.label_en}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ruby-50"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-platinum-100"
            aria-label="language"
          >
            <Globe size={16} /> {t.nav.lang}
          </button>

          <Link
            href="/wishlist"
            className="relative rounded-full p-2.5 hover:bg-platinum-100"
            aria-label={t.nav.wishlist}
          >
            <Heart size={20} />
            {mounted && wishCount > 0 && <Badge n={wishCount} />}
          </Link>

          <button
            onClick={openCart}
            className="relative rounded-full p-2.5 hover:bg-platinum-100"
            aria-label={t.nav.cart}
          >
            <ShoppingBag size={20} />
            {mounted && cartCount > 0 && <Badge n={cartCount} />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2.5 hover:bg-platinum-100 lg:hidden"
            aria-label={t.nav.menu}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mt-2 overflow-hidden lg:hidden"
          >
            <div className="container-luxe flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-ruby-50 hover:text-ruby-800"
                >
                  {locale === 'ar' ? item.label_ar : item.label_en}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 end-0 grid h-5 min-w-5 place-items-center rounded-full bg-ruby-gradient px-1 text-[11px] font-bold text-white">
      {n}
    </span>
  );
}
