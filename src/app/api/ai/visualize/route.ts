import { NextResponse } from 'next/server';
import { visualize } from '@/lib/ai/service';

/**
 * نقطة دخول معاينة الستائر — تستخدم طبقة الخدمة المعيارية.
 * الوضع الافتراضي (browser) يخبر العميل بالتركيب محلياً مجاناً.
 * عند تفعيل مزوّد مدفوع، تُعيد رابط صورة مولّدة.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await visualize({
      roomImage: body.roomImage ?? '',
      color: body.color ?? '#8a1b3d',
      pattern: body.pattern ?? 'plain',
      sheer: Boolean(body.sheer),
      productId: body.productId,
      prompt: body.prompt,
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'visualize failed' },
      { status: 500 },
    );
  }
}
