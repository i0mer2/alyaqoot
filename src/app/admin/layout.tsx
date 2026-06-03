import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'لوحة التحكم | ستائر الياقوت',
  robots: { index: false, follow: false },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  // جلب بريد المشرف لعرضه في الـheader
  let email: string | undefined;
  try {
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser();
    email = user?.email ?? undefined;
  } catch {
    // وضع تطوير بدون Supabase
  }

  return <AdminLayout email={email}>{children}</AdminLayout>;
}
