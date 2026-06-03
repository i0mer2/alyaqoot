'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';

type Post = { id?: string; slug: string; title_ar: string; excerpt_ar: string; body_ar: string; tag_ar: string; read_minutes: number; published: boolean };

const empty = (): Post => ({ slug: '', title_ar: '', excerpt_ar: '', body_ar: '', tag_ar: 'مقال', read_minutes: 3, published: true });

export default function BlogAdminClient({ initial }: { initial: Post[] }) {
  const [items, setItems] = useState<Post[]>(initial);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [msg, setMsg] = useState('');
  const sb = createClient();

  const save = async (item: Post) => {
    if (!item.slug) { setMsg('أدخل الرابط (slug) أولاً'); return; }
    if (item.id) {
      await sb.from('blog_posts').update(item).eq('id', item.id);
    } else {
      const { data } = await sb.from('blog_posts').insert(item).select().single();
      if (data) setItems((p) => p.map((x) => (x === item ? data : x)));
    }
    setMsg('تم الحفظ ✓'); setTimeout(() => setMsg(''), 2000);
  };

  const remove = async (item: Post) => {
    if (item.id) await sb.from('blog_posts').delete().eq('id', item.id);
    setItems((p) => p.filter((x) => x !== item));
  };

  const update = (idx: number, field: keyof Post, val: any) =>
    setItems((p) => p.map((x, i) => (i === idx ? { ...x, [field]: val } : x)));

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        {msg && <span className="text-green-400 text-sm">{msg}</span>}
        <button onClick={() => { setItems((p) => [...p, empty()]); setExpanded(items.length); }}
          className="flex items-center gap-2 rounded-xl bg-ruby-700 px-4 py-2 text-sm text-white hover:bg-ruby-600">
          <Plus size={16} /> مقال جديد
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={item.id ?? idx} className="rounded-2xl border border-white/10 bg-[#1a1a1f] overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="flex w-full items-center justify-between p-4 text-white hover:bg-white/5"
          >
            <span className="font-medium">{item.title_ar || 'مقال جديد'}</span>
            {expanded === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {expanded === idx && (
            <div className="border-t border-white/10 p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50">العنوان</label>
                  <input value={item.title_ar} onChange={(e) => update(idx, 'title_ar', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
                </div>
                <div>
                  <label className="text-xs text-white/50">الرابط (slug) — بالإنجليزي</label>
                  <input value={item.slug} onChange={(e) => update(idx, 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500 font-mono" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50">مقتطف قصير</label>
                <textarea value={item.excerpt_ar} onChange={(e) => update(idx, 'excerpt_ar', e.target.value)} rows={2}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
              </div>
              <div>
                <label className="text-xs text-white/50">المحتوى الكامل</label>
                <textarea value={item.body_ar} onChange={(e) => update(idx, 'body_ar', e.target.value)} rows={8}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-xs text-white/50">التصنيف</label>
                  <input value={item.tag_ar} onChange={(e) => update(idx, 'tag_ar', e.target.value)}
                    className="mt-1 w-24 rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
                </div>
                <div>
                  <label className="text-xs text-white/50">وقت القراءة (دقائق)</label>
                  <input type="number" value={item.read_minutes} onChange={(e) => update(idx, 'read_minutes', +e.target.value)}
                    className="mt-1 w-20 rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none focus:border-ruby-500" />
                </div>
                <label className="flex items-center gap-2 text-sm text-white/60 mt-4">
                  <input type="checkbox" checked={item.published} onChange={(e) => update(idx, 'published', e.target.checked)} /> منشور
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
          )}
        </div>
      ))}
    </div>
  );
}
