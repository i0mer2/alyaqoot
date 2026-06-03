'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { categories as mockCats } from '@/lib/data/categories';
import CurtainArt from '@/components/art/CurtainArt';

type Row = { id?: string; slug: string; name_ar: string; name_en: string; tagline_ar: string; description_ar: string; order: number };

const toRow = (c: (typeof mockCats)[number]): Row => ({ id: c.id, slug: c.slug, name_ar: c.name_ar, name_en: c.name_en, tagline_ar: c.tagline_ar, description_ar: c.description_ar, order: c.order });
const blank: Row = { slug: '', name_ar: '', name_en: '', tagline_ar: '', description_ar: '', order: 99 };

export default function CategoriesAdmin() {
  const enabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [msg, setMsg] = useState('');

  const load = async () => {
    if (!enabled) { setRows(mockCats.map(toRow)); return; }
    try {
      const { data, error } = await createClient().from('categories').select('*').order('order');
      if (error) throw error;
      setRows((data as Row[]) ?? []);
    } catch { setRows(mockCats.map(toRow)); setMsg('عرض تجريبي — أنشئ جدول categories في Supabase.'); }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const save = async (r: Row) => {
    if (!enabled) { setMsg('اربط Supabase للحفظ.'); setEditing(null); return; }
    try {
      const supabase = createClient();
      if (r.id) await supabase.from('categories').update(r).eq('id', r.id);
      else { const { id, ...ins } = r; await supabase.from('categories').insert(ins); }
      setEditing(null); await load();
    } catch (e) { setMsg(e instanceof Error ? e.message : 'فشل'); }
  };
  const remove = async (id?: string) => {
    if (!enabled || !id) { setMsg('اربط Supabase للحذف.'); return; }
    if (!confirm('حذف الفئة؟')) return;
    await createClient().from('categories').delete().eq('id', id); await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">الفئات</h1>
        <button onClick={() => setEditing({ ...blank })} className="btn-ruby"><Plus size={18} /> إضافة</button>
      </div>
      {(!enabled || msg) && <div className="rounded-2xl border border-champagne-200 bg-champagne-50 p-3 text-sm text-champagne-800">{msg || 'وضع المعاينة: اربط Supabase للتعديل.'}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-3xl bg-white shadow-soft">
            <div className="h-28"><CurtainArt color="#8a1b3d" pattern="damask" variant="tieback" /></div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div><div className="font-display text-lg">{c.name_ar}</div><div className="text-xs text-ink-muted">{c.tagline_ar}</div></div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(c)} className="rounded-lg p-2 hover:bg-ruby-50 hover:text-ruby-700"><Pencil size={15} /></button>
                  <button onClick={() => remove(c.id)} className="rounded-lg p-2 hover:bg-ruby-50 hover:text-ruby-700"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-luxe">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-2xl">{editing.id ? 'تعديل فئة' : 'فئة جديدة'}</h2><button onClick={() => setEditing(null)}><X /></button></div>
            <div className="space-y-3">
              <input className="cinp" placeholder="الاسم بالعربي" value={editing.name_ar} onChange={(e) => setEditing({ ...editing, name_ar: e.target.value })} />
              <input className="cinp" placeholder="Name (English)" value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} />
              <input className="cinp" placeholder="slug (modern)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              <input className="cinp" placeholder="وصف مختصر" value={editing.tagline_ar} onChange={(e) => setEditing({ ...editing, tagline_ar: e.target.value })} />
              <textarea rows={2} className="cinp resize-none" placeholder="الوصف" value={editing.description_ar} onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })} />
            </div>
            <div className="mt-5 flex justify-end gap-2"><button onClick={() => setEditing(null)} className="btn-outline">إلغاء</button><button onClick={() => save(editing)} className="btn-ruby"><Save size={16} /> حفظ</button></div>
            <style jsx>{`.cinp{width:100%;border-radius:0.75rem;border:1px solid #e4e4e8;padding:0.6rem 0.8rem;outline:none}.cinp:focus{border-color:#d0a35e}`}</style>
          </div>
        </div>
      )}
    </div>
  );
}
