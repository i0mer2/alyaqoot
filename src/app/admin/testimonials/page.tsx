import { createClient } from '@/lib/supabase/server';
import TestimonialsClient from './TestimonialsClient';

export default async function TestimonialsPage() {
  const sb = createClient();
  const { data } = await sb.from('testimonials').select('*').order('sort_order');
  return <TestimonialsClient initial={data ?? []} />;
}
