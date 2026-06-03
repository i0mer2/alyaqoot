import { createClient } from '@/lib/supabase/server';
import GalleryAdminClient from './GalleryAdminClient';

export default async function GalleryAdminPage() {
  const sb = createClient();
  const { data } = await sb.from('gallery').select('*').order('sort_order');
  return <GalleryAdminClient initial={data ?? []} />;
}
