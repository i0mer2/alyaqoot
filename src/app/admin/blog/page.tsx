import { createClient } from '@/lib/supabase/server';
import BlogAdminClient from './BlogAdminClient';

export default async function BlogAdminPage() {
  const sb = createClient();
  const { data } = await sb.from('blog_posts').select('*').order('created_at', { ascending: false });
  return <BlogAdminClient initial={data ?? []} />;
}
