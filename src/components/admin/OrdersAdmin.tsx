'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, ChevronDown, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';

type Item = { name_ar: string; qty: number; price: number; color?: string };
type Order = {
  id: string; created_at: string; customer_name: string; phone: string; governorate: string;
  address: string; note?: string; items: Item[]; total: number; status: string; payment_method: string;
};

const STATUSES: { v: string; l: string }[] = [
  { v: 'new', l: 'جديد' }, { v: 'confirmed', l: 'مؤكّد' }, { v: 'preparing', l: 'قيد التجهيز' },
  { v: 'delivering', l: 'قيد التوصيل' }, { v: 'done', l: 'مكتمل' }, { v: 'cancelled', l: 'ملغي' },
];
const color: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700', confirmed: 'bg-indigo-100 text-indigo-700',
  preparing: 'bg-amber-100 text-amber-700', delivering: 'bg-purple-100 text-purple-700',
  done: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersAdmin() {
  const enabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!enabled) { setLoading(false); return; }
    try {
      const { data } = await createClient().from('orders').select('*').order('created_at', { ascending: false });
      setOrders((data as Order[]) ?? []);
    } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const setStatus = async (id: string, status: string) => {
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
    if (enabled) { try { await createClient().from('orders').update({ status }).eq('id', id); } catch {} }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-ink">الطلبات</h1>

      {!enabled && <div className="rounded-2xl border border-champagne-200 bg-champagne-50 p-3 text-sm text-champagne-800">اربط Supabase لاستقبال الطلبات هنا. حالياً الطلبات تصلك عبر واتساب مباشرة.</div>}

      {loading ? (
        <p className="py-10 text-center text-ink-muted">…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <ShoppingCart size={48} className="mx-auto mb-3 text-platinum-300" />
          <p className="text-ink-muted">لا توجد طلبات محفوظة بعد.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <button onClick={() => setOpen(open === o.id ? null : o.id)} className="flex items-center gap-2 text-start">
                  <ChevronDown size={18} className={`transition ${open === o.id ? 'rotate-180' : ''}`} />
                  <div>
                    <div className="font-medium text-ink">{o.customer_name}</div>
                    <div className="text-xs text-ink-muted">{o.governorate} · {new Date(o.created_at).toLocaleDateString('ar-IQ')}</div>
                  </div>
                </button>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-ruby-700">{formatPrice(o.total)}</span>
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className={`rounded-full px-3 py-1 text-xs font-semibold outline-none ${color[o.status] ?? 'bg-platinum-100'}`}>
                    {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                  </select>
                </div>
              </div>
              {open === o.id && (
                <div className="border-t border-platinum-100 bg-platinum-50 p-4 text-sm">
                  <div className="mb-3 flex items-center gap-4 text-ink-muted">
                    <a href={`tel:${o.phone}`} className="flex items-center gap-1 text-ruby-700"><Phone size={14} /> {o.phone}</a>
                    <span>{o.address}</span>
                  </div>
                  {o.note && <p className="mb-2 text-ink-muted">ملاحظة: {o.note}</p>}
                  <ul className="space-y-1">
                    {(o.items ?? []).map((it, i) => (
                      <li key={i} className="flex justify-between border-b border-platinum-100 py-1">
                        <span>{it.name_ar} {it.color ? `(${it.color})` : ''} × {it.qty}</span>
                        <span className="text-ink-muted">{formatPrice(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
