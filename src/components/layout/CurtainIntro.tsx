'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { BRAND } from '@/lib/constants';

/**
 * مقدّمة افتتاحية: ستارتان مخمليتان تتفتّحان للجانبين لتكشفا الموقع.
 * تظهر مرة واحدة في الجلسة (sessionStorage) حتى لا تتكرر مع كل تنقّل.
 */
export default function CurtainIntro() {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname.startsWith('/admin')) return;
    const seen = sessionStorage.getItem('intro_seen');
    if (!seen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
      sessionStorage.setItem('intro_seen', '1');
      const t = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = '';
      }, 3200);
      return () => { clearTimeout(t); document.body.style.overflow = ''; };
    }
  }, [pathname]);

  // نسيج مخملي بكسرات (تدرّج متكرّر) لكل لوح
  const fold =
    'repeating-linear-gradient(90deg, #5b1228 0px, #8a1b3d 14px, #a51f46 26px, #6e1b30 40px, #5b1228 54px)';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden
        >
          {/* لوح يمين */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 shadow-2xl"
            style={{ background: fold, transformOrigin: 'right center' }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.7, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* رباط جانبي ذهبي */}
            <div className="absolute left-0 top-1/2 h-24 w-3 -translate-y-1/2 bg-gold-line opacity-70" />
            <div className="absolute inset-y-0 left-0 w-px bg-champagne/40" />
          </motion.div>

          {/* لوح يسار */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 shadow-2xl"
            style={{ background: fold, transformOrigin: 'left center' }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 1.7, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute right-0 top-1/2 h-24 w-3 -translate-y-1/2 bg-gold-line opacity-70" />
            <div className="absolute inset-y-0 right-0 w-px bg-champagne/40" />
          </motion.div>

          {/* القضيب العلوي */}
          <motion.div
            className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-platinum-100 via-platinum-400 to-platinum-700"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 2.6 }}
          />

          {/* الاسم في المنتصف */}
          <motion.div
            className="absolute inset-0 grid place-items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 1.05] }}
            transition={{ duration: 2.6, times: [0, 0.2, 0.7, 1] }}
          >
            <div>
              <motion.span
                className="mx-auto mb-3 block h-px w-16 bg-champagne"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              />
              <h1 className="font-display text-5xl text-white drop-shadow-lg md:text-7xl">
                {L ? BRAND.name_ar : BRAND.name_en}
              </h1>
              <p className="mt-2 text-sm tracking-[0.35em] text-champagne-300 md:text-base">
                {L ? BRAND.tagline_ar : BRAND.tagline_en}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
