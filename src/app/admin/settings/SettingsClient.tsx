'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, CheckCircle } from 'lucide-react';

const GROUPS = [
  {
    title: '🏷️ هوية العلامة',
    keys: [
      { key: 'brand_name_ar',    label: 'اسم العلامة (عربي)',       type: 'text' },
      { key: 'brand_name_en',    label: 'اسم العلامة (إنجليزي)',    type: 'text' },
      { key: 'tagline_ar',       label: 'الشعار الفرعي',            type: 'text' },
    ],
  },
  {
    title: '📞 معلومات التواصل',
    keys: [
      { key: 'phone',        label: 'رقم الهاتف',         type: 'text' },
      { key: 'whatsapp',     label: 'واتساب (بدون +)',    type: 'text' },
      { key: 'location_ar',  label: 'الموقع / العنوان',   type: 'text' },
    ],
  },
  {
    title: '🚚 التوصيل',
    keys: [
      { key: 'delivery_fee', label: 'رسوم التوصيل (دينار)',         type: 'number' },
      { key: 'free_above',   label: 'توصيل مجاني فوق (دينار)',      type: 'number' },
    ],
  },
  {
    title: '🏠 الصفحة الرئيسية',
    keys: [
      { key: 'hero_title_ar',    label: 'عنوان الهيرو الرئيسي',   type: 'text' },
      { key: 'hero_subtitle_ar', label: 'العنوان الفرعي للهيرو',  type: 'text' },
      { key: 'hero_desc_ar',     label: 'وصف الهيرو',             type: 'textarea' },
    ],
  },
  {
    title: '🏢 من نحن',
    keys: [
      { key: 'about_story_ar',   label: 'قصة الشركة',   type: 'textarea' },
      { key: 'about_vision_ar',  label: 'الرؤية',        type: 'textarea' },
      { key: 'about_mission_ar', label: 'الرسالة',       type: 'textarea' },
    ],
  },
  {
    title: '🔍 SEO',
    keys: [
      { key: 'meta_title_ar', label: 'عنوان الصفحة (SEO)',  type: 'text' },
      { key: 'meta_desc_ar',  label: 'وصف الصفحة (SEO)',    type: 'textarea' },
    ],
  },
];

export default function SettingsClient({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const save = async (key: string) => {
    setSaving(key);
    const sb = createClient();
    await sb.from('site_settings')
      .upsert({ key, value: values[key], updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const saveAll = async () => {
    setSaving('all');
    const sb = createClient();
    const rows = Object.entries(values).map(([key, value]) => ({
      key, value, updated_at: new Date().toISOString(),
    }));
    await sb.from('site_settings').upsert(rows, { onConflict: 'key' });
    setSaving(null);
    setSaved('all');
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-sm">كل تعديل يُطبَّق على الموقع فوراً</p>
        <button
          onClick={saveAll}
          disabled={saving === 'all'}
          className="flex items-center gap-2 rounded-xl bg-ruby-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ruby-600 disabled:opacity-50"
        >
          {saved === 'all' ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved === 'all' ? 'تم الحفظ!' : 'حفظ كل شيء'}
        </button>
      </div>

      {GROUPS.map((group) => (
        <div key={group.title} className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-5">
          <h3 className="mb-4 font-semibold text-white">{group.title}</h3>
          <div className="space-y-4">
            {group.keys.map(({ key, label, type }) => (
              <div key={key}>
                <label className="mb-1 block text-xs text-white/50">{label}</label>
                <div className="flex gap-2">
                  {type === 'textarea' ? (
                    <textarea
                      value={values[key] ?? ''}
                      onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                      rows={3}
                      className="flex-1 rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500"
                    />
                  ) : (
                    <input
                      type={type}
                      value={values[key] ?? ''}
                      onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                      className="flex-1 rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500"
                    />
                  )}
                  <button
                    onClick={() => save(key)}
                    disabled={saving === key}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white/60 hover:bg-ruby-800 hover:text-white"
                    title="حفظ"
                  >
                    {saved === key ? <CheckCircle size={16} className="text-green-400" /> : <Save size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
