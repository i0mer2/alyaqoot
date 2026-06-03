import { createClient } from '@/lib/supabase/server';
import BannersClient from './BannersClient';

export default async function BannersPage() {
  const sb = createClient();
  const { data } = await sb.from('banners').select('*').order('sort_order');
  return <BannersClient initial={data ?? []} />;
}
