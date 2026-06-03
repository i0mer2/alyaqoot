'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Locale } from '@/types';
import { getDict, type Dict } from './dictionary';

type Ctx = {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: Dict;
  toggle: () => void;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');

  useEffect(() => {
    const saved = (localStorage.getItem('locale') as Locale) || 'ar';
    setLocaleState(saved);
  }, []);

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem('locale', locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(
    () => setLocaleState((p) => (p === 'ar' ? 'en' : 'ar')),
    [],
  );

  return (
    <LocaleContext.Provider
      value={{ locale, dir: locale === 'ar' ? 'rtl' : 'ltr', t: getDict(locale), toggle, setLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

/** اختصار: يختار النص العربي أو الإنجليزي حسب اللغة الحالية */
export function pick<T>(locale: Locale, ar: T, en: T): T {
  return locale === 'ar' ? ar : en;
}
