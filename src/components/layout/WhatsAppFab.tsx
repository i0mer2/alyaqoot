'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/constants';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function WhatsAppFab() {
  const { locale } = useLocale();
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  const msg = locale === 'ar' ? 'مرحباً ستائر الياقوت 👋 أرغب بالاستفسار عن' : 'Hello Al-Yaqoot 👋 I would like to ask about';

  return (
    <a
      href={waLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-5 start-5 z-40 flex items-center gap-2"
    >
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition-transform group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle size={26} className="relative" />
      </span>
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft sm:block">
        {locale === 'ar' ? 'تواصل واتساب' : 'WhatsApp us'}
      </span>
    </a>
  );
}
