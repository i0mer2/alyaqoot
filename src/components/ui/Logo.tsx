'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { BRAND } from '@/lib/constants';

/**
 * شعار نصّي فاخر (Wordmark) — بديل أنيق إلى أن ترفع شعارك الرسمي إلى /public/logo.png
 * يستخدم الخط الفخم + جوهرة الياقوت الحمراء كرمز للعلامة.
 */
export default function Logo({ light = false }: { light?: boolean }) {
  const { locale } = useLocale();
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={BRAND.name_ar}>
      {/* رمز الجوهرة */}
      <span className="relative grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 40 40" className="h-10 w-10">
          <defs>
            <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dc4a72" />
              <stop offset="55%" stopColor="#8a1b3d" />
              <stop offset="100%" stopColor="#5b1228" />
            </linearGradient>
          </defs>
          <g className="transition-transform duration-500 group-hover:rotate-[18deg]" style={{ transformOrigin: 'center' }}>
            <path d="M20 4 L31 14 L20 36 L9 14 Z" fill="url(#gem)" stroke="#d0a35e" strokeWidth="1.2" />
            <path d="M9 14 H31 M20 4 L14 14 L20 36 M20 4 L26 14" fill="none" stroke="#f3a9ba" strokeWidth="0.7" opacity="0.7" />
          </g>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl ${light ? 'text-white' : 'text-ruby-800'}`}>
          {BRAND.name_ar}
        </span>
        <span className={`mt-0.5 text-[10px] tracking-[0.25em] ${light ? 'text-platinum-200' : 'text-champagne-600'}`}>
          {locale === 'ar' ? BRAND.tagline_ar : BRAND.tagline_en.toUpperCase()}
        </span>
      </span>
    </Link>
  );
}
