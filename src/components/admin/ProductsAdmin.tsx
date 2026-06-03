'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Search, Package } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { products as mockProducts } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import CurtainArt from '@/components/art/CurtainArt';
import { formatPrice, unitLabel, cn } from '@/lib/utils';

type Row = {
  id: string; slug: string; name_ar: string; name_en: string; category: string;
  description_ar: string; price: number; compare_at_price: number | null; unit: string;
  width_cm: number | null; origin_ar: string; fabric_ar: string;
  base_color: string; pattern: string; sheer: boolean; in_stock: boolean; featured: boolean;
  images: string[];
};

const blank: Row = {
  id: '', slug: '', name_ar: '', name_en: '', category: 'modern', description_ar: '',
  price: 0, compare_at_price: null, unit: 'meter', width_cm: 280, origin_ar: '', fabric_ar: '',
  base_color: '#8a1b3d', pattern: 'plain', sheer: false, in_stock: true, featured: false, images: [],
};

const mapMock = (p: (typeof mockProducts)[number]): Row => ({
  id: p.id, slug: p.slug, name_ar: p.name_ar, name_en: p.name_en, category: p.category,
  description_ar: p.description_ar, price: p.price, compare_at_price: p.compareAtPrice ?? null,
  unit: p.unit, width_cm: p.widthCm ?? null, origin_ar: p.origin_ar ?? '', fabric_ar: p.fabric_ar ?? '',
  base_color: p.visualizer.baseColor, pattern: p.visualizer.pattern, sheer: p.visualizer.sheer,
  in_stock: p.inStock, featured: !!p.featured, images: p.images,
});

const slugify = (en: string, ar: string) =>
  (en || ar).toLowerCase().trim().replace(/[^a-z0-9؀-ۿ]+/g, '-').replace(/(^-|-$)/g, '') || `p-${Date.now()}`;

export default function ProductsAdmin() {
  const enabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    if (!enabled) {
      setRows(mockProducts.map(mapMock));
      setLoading(false);
      return;
    }
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setRows((data as Row[]) ?? []);
    } catch (e) {
      setMsg('تعذّر الجلب من Supabase — تأكد من إنشاء جدول products. عرض بيانات تجريبية.');
      setRows(mockProducts.map(mapMock));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const filtered = useMemo(
    () => rows.filter((r) => r.name_ar.includes(q) || r.name_en.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  );

  const save = async (row: Row) => {
    if (!enabled) { setMsg('اربط Supabase أولاً لحفظ التعديلات.'); setEditing(null); return; }
    const payload = { ...row, slug: row.slug || slugify(row.name_en, row.name_ar) };
    try {
      const supabase = createClient();
      if (row.id) {
        const { error } = await supabase.from('products').update(payload).eq('id', row.id);
        if (error) throw error;
      } else {
        const { id, ...insert } = payload;
        const { error } = await supabase.from('products').insert(insert);
        if (error) throw error;
      }
      setEditing(null);
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحفظ');
    }
  };

  const remove = async (id: string) => {
    if (!enabled) { setMsg('اربط Supabase أولاً للحذف.'); return; }
    if (!confirm('تأكيد حذف المنتج؟')) return;
    try {
      await createClient().from('products').delete().eq('id', id);
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'فشل الحذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-ink">المنتجات</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث…" className="rounded-full border border-platinum-200 bg-white py-2.5 ps-9 pe-4 text-sm outline-none focus:border-champagne" />
          </div>
          <button onClick={() => setEditing({ ...blank })} className="btn-ruby"><Plus size={18} /> إضافة</button>
        </div>
      </div>

      {(!enabled || msg) && (
        <div className="rounded-2xl border border-champagne-200 bg-champagne-50 p-3 text-sm text-champagne-800">
          {msg || 'وضع المعاينة: اربط Supabase لتفعيل الإضافة والتعديل والحذف.'}
        </div>
      )}

      <div className="overflow-x-auto rounded-3xl bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum-200 text-ink-muted">
            <tr>
              <th className="p-3 text-start">المنتج</th>
              <th className="p-3 text-start">الفئة</th>
              <th className="p-3 text-start">السعر</th>
              <th className="p-3 text-start">التوفّر</th>
              <th className="p-3 text-start">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center text-ink-muted">جارٍ التحميل…</td></tr>
            ) : filtered.map((r) => (
              <tr key={r.id || r.slug} className="border-b border-platinum-100 hover:bg-platinum-50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-10 shrink-0 overflow-hidden rounded-lg"><CurtainArt color={r.base_color} pattern={r.pattern as 'plain'} sheer={r.sheer} /></div>
                    <div>
                      <div className="font-medium text-ink">{r.name_ar}</div>
                      <div className="text-xs text-ink-muted">{r.name_en}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-ink-muted">{categories.find((c) => c.slug === r.category)?.name_ar ?? r.category}</td>
                <td className="p-3 text-ruby-700">{formatPrice(r.price)} <span className="text-xs text-ink-muted">{unitLabel(r.unit)}</span></td>
                <td className="p-3"><span className={cn('rounded-full px-2 py-0.5 text-xs', r.in_stock ? 'bg-green-100 text-green-700' : 'bg-platinum-100 text-ink-muted')}>{r.in_stock ? 'متوفر' : 'غير متوفر'}</span></td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(r)} className="rounded-lg p-2 text-ink-muted hover:bg-ruby-50 hover:text-ruby-700"><Pencil size={16} /></button>
                    <button onClick={() => remove(r.id)} className="rounded-lg p-2 text-ink-muted hover:bg-ruby-50 hover:text-ruby-700"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && !filtered.length && (
              <tr><td colSpan={5} className="p-10 text-center text-ink-muted"><Package className="mx-auto mb-2" /> لا توجد منتجات</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && <ProductForm row={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}

function ProductForm({ row, onClose, onSave }: { row: Row; onClose: () => void; onSave: (r: Row) => void }) {
  const [f, setF] = useState<Row>(row);
  const up = (patch: Partial<Row>) => setF((s) => ({ ...s, ...patch }));

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-luxe">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">{row.id ? 'تعديل منتج' : 'منتج جديد'}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-platinum-100"><X size={20} /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <F label="الاسم (عربي)"><input className="inp" value={f.name_ar} onChange={(e) => up({ name_ar: e.target.value })} /></F>
          <F label="الاسم (إنجليزي)"><input className="inp" value={f.name_en} onChange={(e) => up({ name_en: e.target.value })} /></F>
          <F label="الفئة">
            <select className="inp" value={f.category} onChange={(e) => up({ category: e.target.value })}>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name_ar}</option>)}
            </select>
          </F>
          <F label="وحدة البيع">
            <select className="inp" value={f.unit} onChange={(e) => up({ unit: e.target.value })}>
              <option value="meter">بالمتر</option><option value="piece">قطعة</option><option value="set">طقم</option><option value="custom">حسب القياس</option>
            </select>
          </F>
          <F label="السعر (د.ع)"><input type="number" className="inp" value={f.price} onChange={(e) => up({ price: +e.target.value })} /></F>
          <F label="سعر قبل الخصم (اختياري)"><input type="number" className="inp" value={f.compare_at_price ?? ''} onChange={(e) => up({ compare_at_price: e.target.value ? +e.target.value : null })} /></F>
          <F label="العرض (سم)"><input type="number" className="inp" value={f.width_cm ?? ''} onChange={(e) => up({ width_cm: e.target.value ? +e.target.value : null })} /></F>
          <F label="بلد المنشأ"><input className="inp" value={f.origin_ar} onChange={(e) => up({ origin_ar: e.target.value })} /></F>
          <F label="الخامة"><input className="inp" value={f.fabric_ar} onChange={(e) => up({ fabric_ar: e.target.value })} /></F>
          <F label="اللون (لمعاينة الغرفة)"><input type="color" className="h-11 w-full rounded-xl border border-platinum-200" value={f.base_color} onChange={(e) => up({ base_color: e.target.value })} /></F>
          <F label="النقشة">
            <select className="inp" value={f.pattern} onChange={(e) => up({ pattern: e.target.value })}>
              <option value="plain">سادة</option><option value="stripe">مخطّط</option><option value="damask">دمشقي</option>
            </select>
          </F>
          <F label="صورة (رابط اختياري)"><input className="inp" value={f.images[0] ?? ''} onChange={(e) => up({ images: e.target.value ? [e.target.value] : [] })} placeholder="https://…" /></F>
        </div>

        <F label="الوصف (عربي)"><textarea rows={3} className="inp resize-none" value={f.description_ar} onChange={(e) => up({ description_ar: e.target.value })} /></F>

        <div className="mt-3 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-ruby-700" checked={f.in_stock} onChange={(e) => up({ in_stock: e.target.checked })} /> متوفر</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-ruby-700" checked={f.featured} onChange={(e) => up({ featured: e.target.checked })} /> مميّز (يظهر بالرئيسية)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-ruby-700" checked={f.sheer} onChange={(e) => up({ sheer: e.target.checked })} /> شفّاف</label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="btn-outline">إلغاء</button>
          <button onClick={() => onSave(f)} className="btn-ruby"><Save size={18} /> حفظ</button>
        </div>

        <style jsx>{`.inp{width:100%;border-radius:0.75rem;border:1px solid #e4e4e8;background:#fff;padding:0.6rem 0.8rem;outline:none}.inp:focus{border-color:#d0a35e}`}</style>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mt-3"><label className="mb-1 block text-sm text-ink-muted">{label}</label>{children}</div>;
}
