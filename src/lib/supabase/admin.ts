import { createClient } from '@supabase/supabase-js';

/**
 * عميل صلاحيات كاملة (service role) — للخادم فقط، يتجاوز RLS.
 * لا تستوردْه أبداً في كود يصل للمتصفح.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
