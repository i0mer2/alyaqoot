'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Save } from 'lucide-react';

type B = { id?: string; title_ar: string; subtitle_ar: string; badge_ar: string; cta_ar: string; cta_url: string; bg_color: string; active: boolean; sort_order: number };

const empty = (): B => ({ title_ar: '', subtitle_ar: '', badge_ar: '', cta_ar: 'اطلب الآن', cta_url: '/products', bg_color: '#8a1b3d', active: true, sort_order: 99 });

export default function BannersClient({ initial }: { initial: B[] }) {
  const [items, setItems] = useState<B[]>(initial);
  const [msg, setMsg] = useState('');
  const sb = createClient();

  const save = async (item: B) => {
    if (item.id) {
      await sb.from('banners').update(item).eq('id', item.id);
    } else {
      const { data } = await sb.from('banners').insert(item).select().single();
      if (data) setItems((p) => p.map((x) => (x === item ? data : x)));
    }
    setMsg('تم الحفظ ✓'); setTimeout(() => setMsg(''), 2000);
  };

  const remove = async (item: B) => {
    if (item.id) await sb.from('banners').delete().eq('id', item.id);
    setItems((p) => p.filter((x) => x !== item));
  };

  const update = (idx: number, field: keyof B, val: any) =>
    setItems((p) => p.map((x, i) => (i === idx ? { ...x, [field]: val } : x)));

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        {msg && <span className="text-green-400 text-sm">{msg}</span>}
        <button onClick={() => setItems((p) => [...p, empty()])}
          className="flex items-center gap-2 rounded-xl bg-ruby-700 px-4 py-2 text-sm text-white hover:bg-ruby-600">
          <Plus size={16} /> بانر جديد
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={item.id ?? idx} className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-5 space-y-3">
          {/* معاينة */}
          <div className="rounded-xl p-4 text-white text-center" style={{ background: item.bg_color }}>
            {item.badge_ar && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{item.badge_ar}</span>}
            <p className="font-bold mt-1">{item.title_ar || 'عنوان البانر'}</p>
            <p className="text-sm opacity-80">{item.subtitle_ar}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50">العنوان الرئيسي</label>
              <input value={item.title_ar} onChange={(e) => update(idx, 'title_ar', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
            <div>
              <label className="text-xs text-white/50">العنوان الفرعي</label>
              <input value={item.subtitle_ar} onChange={(e) => update(idx, 'subtitle_ar', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
            <div>
              <label className="text-xs text-white/50">الشارة (badge)</label>
              <input value={item.badge_ar} onChange={(e) => update(idx, 'badge_ar', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
            <div>
              <label className="text-xs text-white/50">نص الزر</label>
              <input value={item.cta_ar} onChange={(e) => update(idx, 'cta_ar', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
            <div>
              <label className="text-xs text-white/50">رابط الزر</label>
              <input value={item.cta_url} onChange={(e) => update(idx, 'cta_url', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" dir="ltr" />
            </div>
            <div>
              <label className="text-xs text-white/50">لون الخلفية</label>
              <div className="flex gap-2 mt-1">
                <input type="color" value={item.bg_color} onChange={(e) => update(idx, 'bg_color', e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent" />
                <input value={item.bg_color} onChange={(e) => update(idx, 'bg_color', e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500 font-mono" dir="ltr" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/60">
              <input type="checkbox" checked={item.active} onChange={(e) => update(idx, 'active', e.target.checked)} /> ظاهر
            </label>
            <div className="flex gap-2 mr-auto">
              <button onClick={() => save(item)} className="flex items-center gap-1 rounded-xl bg-ruby-700 px-3 py-1.5 text-xs text-white hover:bg-ruby-600">
                <Save size={14} /> حفظ
              </button>
              <button onClick={() => remove(item)} className="rounded-xl bg-red-900/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/60">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
