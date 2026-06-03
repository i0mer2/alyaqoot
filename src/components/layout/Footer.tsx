'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, MessageCircle, Mail } from 'lucide-react';
import { BRAND, NAV, waLink } from '@/lib/constants';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function Footer() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="mt-24 bg-ink text-platinum-200">
      <div className="gold-divider" />
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">
        {/* العلامة */}
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-white">{L ? BRAND.name_ar : BRAND.name_en}</h3>
          <p className="mt-1 text-sm tracking-[0.2em] text-champagne-400">
            {L ? BRAND.tagline_ar : BRAND.tagline_en}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-platinum-300">{t.footer.about}</p>
          <p className="mt-4 text-sm text-platinum-400">{L ? BRAND.manager_ar : BRAND.manager_en}</p>
        </div>

        {/* روابط */}
        <div>
          <h4 className="mb-4 font-display text-lg text-champagne-400">{t.footer.links}</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-platinum-300 transition hover:text-white">
                  {L ? n.label_ar : n.label_en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* تواصل */}
        <div>
          <h4 className="mb-4 font-display text-lg text-champagne-400">{t.footer.contact}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={waLink(L ? 'مرحباً، أرغب بالاستفسار' : 'Hello, I have a question')} target="_blank" className="flex items-center gap-2 hover:text-white">
                <MessageCircle size={16} className="text-champagne-400" /> {BRAND.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-champagne-400" /> {BRAND.phoneDisplay}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-champagne-400" /> {L ? BRAND.location_ar : BRAND.location_en}
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={16} className="text-champagne-400" /> {BRAND.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-platinum-400 sm:flex-row">
          <span>© {new Date().getFullYear()} {L ? BRAND.name_ar : BRAND.name_en} — {t.footer.rights}</span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
