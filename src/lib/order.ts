import type { CartItem, Locale } from '@/types';
import { BRAND, DELIVERY, waLink } from './constants';
import { formatPrice, unitLabel } from './utils';

export interface CustomerInfo {
  name: string;
  phone: string;
  governorate: string;
  address: string;
  note?: string;
}

/** يبني رسالة طلب منسّقة لواتساب */
export function buildOrderMessage(
  items: CartItem[],
  locale: Locale = 'ar',
  customer?: CustomerInfo,
): string {
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const delivery = subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.fee;
  const total = subtotal + delivery;
  const L = locale === 'ar';

  const lines: string[] = [];
  lines.push(L ? `🛒 طلب جديد من موقع ${BRAND.name_ar}` : `🛒 New order — ${BRAND.name_en}`);
  lines.push('━━━━━━━━━━━━━━');

  items.forEach((it, idx) => {
    const name = L ? it.name_ar : it.name_en;
    const dims =
      it.unit === 'custom' && it.widthM && it.heightM
        ? L
          ? ` (قياس: ${it.widthM}م × ${it.heightM}م)`
          : ` (size: ${it.widthM}m × ${it.heightM}m)`
        : '';
    const color = it.color ? (L ? ` - لون: ${it.color}` : ` - color: ${it.color}`) : '';
    lines.push(
      `${idx + 1}) ${name}${dims}${color}\n   ${it.qty} × ${formatPrice(it.price, locale)} ${unitLabel(it.unit, locale)}`,
    );
  });

  lines.push('━━━━━━━━━━━━━━');
  lines.push(`${L ? 'المجموع الفرعي' : 'Subtotal'}: ${formatPrice(subtotal, locale)}`);
  lines.push(
    `${L ? 'التوصيل' : 'Delivery'}: ${delivery === 0 ? (L ? 'مجاني' : 'Free') : formatPrice(delivery, locale)}`,
  );
  lines.push(`${L ? 'الإجمالي' : 'Total'}: ${formatPrice(total, locale)}`);

  if (customer) {
    lines.push('━━━━━━━━━━━━━━');
    lines.push(L ? '📋 معلومات التوصيل:' : '📋 Delivery details:');
    lines.push(`${L ? 'الاسم' : 'Name'}: ${customer.name}`);
    lines.push(`${L ? 'الهاتف' : 'Phone'}: ${customer.phone}`);
    lines.push(`${L ? 'المحافظة' : 'Governorate'}: ${customer.governorate}`);
    lines.push(`${L ? 'العنوان' : 'Address'}: ${customer.address}`);
    if (customer.note) lines.push(`${L ? 'ملاحظة' : 'Note'}: ${customer.note}`);
    lines.push(L ? '💵 الدفع: عند الاستلام' : '💵 Payment: Cash on delivery');
  }

  return lines.join('\n');
}

export function orderWhatsAppLink(
  items: CartItem[],
  locale: Locale = 'ar',
  customer?: CustomerInfo,
): string {
  return waLink(buildOrderMessage(items, locale, customer));
}
