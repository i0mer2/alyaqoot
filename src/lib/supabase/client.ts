'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * عميل Supabase للمتصفح (مكوّنات العميل / لوحة التحكم).
 * يُستخدم فقط في صفحات الأدمن — الموقع العام يعمل ببيانات تجريبية بدون Supabase.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
