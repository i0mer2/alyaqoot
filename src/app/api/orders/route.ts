import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { DELIVERY } from '@/lib/constants';

/**
 * يحفظ الطلب في Supabase إن كان مُعدّاً، وإلا يكتفي بالنجاح (الطلب يُكمَل عبر واتساب).
 */
export async function POST(req: Request) {
  const order = await req.json();

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ ok: true, saved: false, note: 'Supabase غير مُعدّ — الطلب يُكمَل عبر واتساب.' });
  }

  try {
    const supabase = createAdminClient();
    const subtotal = (order.items ?? []).reduce(
      (n: number, i: { price: number; qty: number }) => n + i.price * i.qty,
      0,
    );
    const delivery = subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.fee;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: order.customer_name,
        phone: order.phone,
        governorate: order.governorate,
        address: order.address,
        note: order.note ?? null,
        items: order.items ?? [],
        subtotal,
        delivery_fee: delivery,
        total: subtotal + delivery,
        status: 'new',
        payment_method: order.payment_method ?? 'cod',
      })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, saved: true, id: data.id });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'order failed' },
      { status: 500 },
    );
  }
}
