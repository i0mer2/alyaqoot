'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Save, Upload } from 'lucide-react';

type G = { id?: string; title_ar: string; city: string; category: string; image: string; active: boolean; sort_order: number };

const empty = (): G => ({ title_ar: '', city: '', category: 'modern', image: '', active: true, sort_order: 99 });

const CATS = ['modern', 'classic', 'luxury', 'blackout', 'sheer', 'fabric', 'custom'];

export default function GalleryAdminClient({ initial }: { initial: G[] }) {
  const [items, setItems] = useState<G[]>(initial);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);
  const sb = createClient();

  const uploadImage = async (idx: number, file: File) => {
    setUploading(idx);
    const path = `gallery/${Date.now()}-${file.name}`;
    const { error } = await sb.storage.from('product-images').upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = sb.storage.from('product-images').getPublicUrl(path);
      update(idx, 'image', publicUrl);
    }
    setUploading(null);
  };

  const save = async (item: G) => {
    if (item.id) {
      await sb.from('gallery').update(item).eq('id', item.id);
    } else {
      const { data } = await sb.from('gallery').insert(item).select().single();
      if (data) setItems((p) => p.map((x) => (x === item ? data : x)));
    }
    setMsg('تم الحفظ ✓'); setTimeout(() => setMsg(''), 2000);
  };

  const remove = async (item: G) => {
    if (item.id) await sb.from('gallery').delete().eq('id', item.id);
    setItems((p) => p.filter((x) => x !== item));
  };

  const update = (idx: number, field: keyof G, val: any) =>
    setItems((p) => p.map((x, i) => (i === idx ? { ...x, [field]: val } : x)));

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        {msg && <span className="text-green-400 text-sm">{msg}</span>}
        <button onClick={() => setItems((p) => [...p, empty()])}
          className="flex items-center gap-2 rounded-xl bg-ruby-700 px-4 py-2 text-sm text-white hover:bg-ruby-600">
          <Plus size={16} /> إضافة صورة
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, idx) => (
          <div key={item.id ?? idx} className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-4 space-y-3">
            {/* معاينة الصورة */}
            <div className="relative aspect-video rounded-xl bg-[#0f0f10] overflow-hidden">
              {item.image ? (
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/20">
                  <Upload size={32} />
                </div>
              )}
              <label className="absolute bottom-2 left-2 cursor-pointer rounded-lg bg-black/60 px-2 py-1 text-xs text-white hover:bg-ruby-800">
                {uploading === idx ? 'جاري الرفع...' : '📸 رفع صورة'}
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadImage(idx, e.target.files[0])} />
              </label>
            </div>

            <input value={item.title_ar} onChange={(e) => update(idx, 'title_ar', e.target.value)}
              placeholder="عنوان المشروع" className="w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />

            <div className="grid grid-cols-2 gap-2">
              <input value={item.city} onChange={(e) => update(idx, 'city', e.target.value)}
                placeholder="المدينة" className="rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
              <select value={item.category} onChange={(e) => update(idx, 'category', e.target.value)}
                className="rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500">
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs text-white/50">
                <input type="checkbox" checked={item.active} onChange={(e) => update(idx, 'active', e.target.checked)} /> ظاهر
              </label>
              <div className="flex gap-2 mr-auto">
                <button onClick={() => save(item)} className="flex items-center gap-1 rounded-xl bg-ruby-700 px-3 py-1.5 text-xs text-white hover:bg-ruby-600">
                  <Save size={13} /> حفظ
                </button>
                <button onClick={() => remove(item)} className="rounded-xl bg-red-900/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/60">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
