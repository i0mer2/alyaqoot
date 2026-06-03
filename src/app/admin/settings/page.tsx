import { createClient } from '@/lib/supabase/server';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const sb = createClient();
  const { data: rows } = await sb.from('site_settings').select('*').order('key');
  const settings: Record<string, string> = {};
  (rows ?? []).forEach((r: any) => { settings[r.key] = r.value ?? ''; });
  return <SettingsClient initial={settings} />;
}
