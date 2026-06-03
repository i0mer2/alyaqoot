'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Save, Star } from 'lucide-react';

type T = { id?: string; name: string; city: string; rating: number; text_ar: string; avatar_color: string; active: boolean; sort_order: number };

const empty = (): T => ({ name: '', city: '', rating: 5, text_ar: '', avatar_color: '#8a1b3d', active: true, sort_order: 99 });

export default function TestimonialsClient({ initial }: { initial: T[] }) {
  const [items, setItems] = useState<T[]>(initial);
  const [msg, setMsg] = useState('');
  const sb = createClient();

  const save = async (item: T) => {
    if (item.id) {
      await sb.from('testimonials').update(item).eq('id', item.id);
    } else {
      const { data } = await sb.from('testimonials').insert(item).select().single();
      if (data) setItems((p) => p.map((x) => (x === item ? data : x)));
    }
    setMsg('تم الحفظ ✓'); setTimeout(() => setMsg(''), 2000);
  };

  const remove = async (item: T) => {
    if (item.id) await sb.from('testimonials').delete().eq('id', item.id);
    setItems((p) => p.filter((x) => x !== item));
  };

  const add = () => setItems((p) => [...p, empty()]);

  const update = (idx: number, field: keyof T, val: any) =>
    setItems((p) => p.map((x, i) => (i === idx ? { ...x, [field]: val } : x)));

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        {msg && <span className="text-green-400 text-sm">{msg}</span>}
        <button onClick={add} className="flex items-center gap-2 rounded-xl bg-ruby-700 px-4 py-2 text-sm text-white hover:bg-ruby-600">
          <Plus size={16} /> إضافة رأي جديد
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={item.id ?? idx} className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50">الاسم</label>
              <input value={item.name} onChange={(e) => update(idx, 'name', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
            <div>
              <label className="text-xs text-white/50">المدينة</label>
              <input value={item.city} onChange={(e) => update(idx, 'city', e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50">نص الرأي</label>
            <textarea value={item.text_ar} onChange={(e) => update(idx, 'text_ar', e.target.value)} rows={3}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-white/50">التقييم</label>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} onClick={() => update(idx, 'rating', s)}>
                    <Star size={18} className={s <= item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50">لون الأفاتار</label>
              <input type="color" value={item.avatar_color} onChange={(e) => update(idx, 'avatar_color', e.target.value)}
                className="mt-1 h-8 w-14 cursor-pointer rounded border-0 bg-transparent" />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/60 mt-4">
              <input type="checkbox" checked={item.active} onChange={(e) => update(idx, 'active', e.target.checked)} />
              ظاهر
            </label>
            <div className="flex gap-2 mr-auto mt-4">
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
