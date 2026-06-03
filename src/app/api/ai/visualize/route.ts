import { NextResponse } from 'next/server';
import { visualize } from '@/lib/ai/service';

export const runtime = 'nodejs';
export const maxDuration = 60; // توليد الصورة قد يستغرق عدة ثوانٍ

/**
 * نقطة دخول معاينة الستائر — طبقة خدمة معيارية.
 * • مع مفتاح GEMINI_API_KEY → دمج واقعي بالذكاء الاصطناعي (يُعيد صورة).
 * • بدونه → وضع المتصفح المجاني (معاينة سريعة بالـCanvas).
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
      apiKey: body.apiKey,
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'visualize failed' },
      { status: 500 },
    );
  }
}
