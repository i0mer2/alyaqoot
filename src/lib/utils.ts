import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** دمج أصناف Tailwind بأمان */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** تنسيق السعر بالدينار العراقي */
export function formatPrice(value: number, locale: 'ar' | 'en' = 'ar'): string {
  const n = new Intl.NumberFormat(locale === 'ar' ? 'ar-IQ' : 'en-US').format(
    Math.round(value),
  );
  return locale === 'ar' ? `${n} د.ع` : `${n} IQD`;
}

/** نص وحدة البيع */
export function unitLabel(unit: string, locale: 'ar' | 'en' = 'ar'): string {
  const map: Record<string, [string, string]> = {
    meter: ['للمتر', '/ meter'],
    piece: ['للقطعة', '/ piece'],
    set: ['للطقم', '/ set'],
    custom: ['حسب القياس', 'by measurement'],
  };
  const v = map[unit] ?? ['', ''];
  return locale === 'ar' ? v[0] : v[1];
}

/** اختصار نص */
export function truncate(s: string, n = 120): string {
  return s.length > n ? `${s.slice(0, n).trim()}…` : s;
}

/** تأخير */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
