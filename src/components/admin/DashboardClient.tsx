'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Tags, ShoppingCart, TrendingUp, Plus, Sparkles, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { formatPrice } from '@/lib/utils';

type OrderRow = { id: string; customer_name: string; total: number; status: string; created_at: string; governorate: string };

export default function DashboardClient() {
  const enabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('orders').select('id,customer_name,total,status,created_at,governorate').order('created_at', { ascending: false }).limit(8);
        if (data) {
          setOrders(data as OrderRow[]);
          setRevenue((data as OrderRow[]).reduce((n, o) => n + (o.total || 0), 0));
        }
      } catch {}
    })();
  }, [enabled]);

  const stats = [
    { icon: Package, label: 'المنتجات', value: products.length, href: '/admin/products', color: 'bg-ruby-gradient' },
    { icon: Tags, label: 'الفئات', value: categories.length, href: '/admin/categories', color: 'bg-gradient-to-br from-[#1f3a5f] to-[#0d1b2e]' },
    { icon: ShoppingCart, label: 'الطلبات', value: orders.length, href: '/admin/orders', color: 'bg-gradient-to-br from-[#4a5d4a] to-[#26332a]' },
    { icon: TrendingUp, label: 'إيراد آخر الطلبات', value: formatPrice(revenue), href: '/admin/orders', color: 'bg-gradient-to-br from-[#b0723a] to-[#643c2a]' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">أهلاً بك 👋</h1>
          <p className="text-ink-muted">نظرة عامة على متجر ستائر الياقوت</p>
        </div>
        <Link href="/admin/products" className="btn-ruby"><Plus size={18} /> منتج جديد</Link>
      </div>

      {!enabled && (
        <div className="flex items-center gap-2 rounded-2xl border border-champagne-200 bg-champagne-50 p-4 text-sm text-champagne-800">
          <Sparkles size={18} /> أنت في وضع التطوير. اربط Supabase (راجع <code className="mx-1">docs/04-DEPLOYMENT.md</code>) لتفعيل إدارة المنتجات والطلبات الحقيقية.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Link key={i} href={s.href} className="group rounded-3xl bg-white p-6 shadow-soft transition hover:shadow-luxe">
            <span className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white ${s.color}`}><s.icon size={22} /></span>
            <div className="font-display text-3xl text-ink">{s.value}</div>
            <div className="mt-1 flex items-center justify-between text-sm text-ink-muted">{s.label} <ArrowLeft size={14} className="opacity-0 transition group-hover:opacity-100" /></div>
          </Link>
        ))}
      </div>

      {/* أحدث الطلبات */}
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="mb-4 font-display text-xl text-ink">أحدث الطلبات</h2>
        {orders.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-ink-muted">
                <tr className="border-b border-platinum-200 text-start">
                  <th className="p-2 text-start">العميل</th><th className="p-2 text-start">المحافظة</th><th className="p-2 text-start">المبلغ</th><th className="p-2 text-start">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-platinum-100">
                    <td className="p-2 font-medium text-ink">{o.customer_name}</td>
                    <td className="p-2 text-ink-muted">{o.governorate}</td>
                    <td className="p-2 text-ruby-700">{formatPrice(o.total)}</td>
                    <td className="p-2"><span className="rounded-full bg-platinum-100 px-2 py-0.5 text-xs">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-8 text-center text-ink-muted">{enabled ? 'لا توجد طلبات بعد' : 'ستظهر الطلبات هنا بعد ربط Supabase'}</p>
        )}
      </div>
    </div>
  );
}
