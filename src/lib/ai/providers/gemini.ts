import type { AIProvider, VisualizeRequest, VisualizeResult } from '../types';

/**
 * مزوّد Google Gemini (Nano Banana) — تعديل صورة واقعي مجاني.
 * يضيف الستارة المختارة إلى صورة الغرفة بشكل احترافي وواقعي.
 *
 * يتطلّب مفتاحاً مجانياً من Google AI Studio في متغيّر البيئة GEMINI_API_KEY.
 * النموذج قابل للتعديل عبر GEMINI_IMAGE_MODEL (افتراضي: gemini-2.5-flash-image).
 */

function buildPrompt(req: VisualizeRequest): string {
  const pattern =
    req.pattern === 'damask'
      ? 'an elegant damask-patterned'
      : req.pattern === 'stripe'
        ? 'a subtly vertically-striped'
        : 'a solid, smooth';
  const fabric = req.sheer
    ? 'sheer, light, semi-transparent voile/tulle'
    : 'rich, opaque, premium velvet-like';
  const style = req.prompt ? ` Style reference: "${req.prompt}".` : '';

  return [
    'You are a professional interior-design photo editor.',
    'Edit the provided real photo of a room: add elegant, realistic curtains to the window (or the most suitable wall opening).',
    `The curtains are ${fabric} fabric, ${pattern} texture, in this exact color: ${req.color} (hex).`,
    'They hang from the top, drape naturally to the floor with realistic vertical folds, soft fabric shading, and a gentle sheen.',
    'Match the room lighting, perspective, shadows and white balance so the result looks like a real photograph.',
    'Keep everything else in the room (walls, furniture, floor, view) unchanged and photorealistic.',
    style,
    'Return ONLY the edited photo, no text.',
  ].join(' ');
}

export const geminiProvider: AIProvider = {
  name: 'gemini' as any,
  async visualize(req: VisualizeRequest): Promise<VisualizeResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        provider: 'browser',
        mode: 'client-composite',
        message: 'مفتاح Gemini غير مضبوط — يُستخدم وضع المعاينة المجاني داخل المتصفح.',
      };
    }

    const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

    // فصل ترويسة data URL عن البيانات
    const m = /^data:(.+?);base64,([\s\S]*)$/.exec(req.roomImage);
    const mimeType = m ? m[1] : 'image/jpeg';
    const data = m ? m[2] : req.roomImage;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: buildPrompt(req) },
              { inlineData: { mimeType, data } },
            ],
          },
        ],
        generationConfig: { responseModalities: ['IMAGE'], temperature: 0.4 },
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      // رسائل عربية واضحة لأكثر الأخطاء شيوعاً
      if (res.status === 429) {
        throw new Error(
          'تجاوزت الحصة المجانية لنموذج الصور في Gemini. لتشغيل الدمج الواقعي بثبات، فعّل الفوترة في Google AI Studio (رخيص جداً ~٤ سنت/صورة)، أو انتظر تجديد الحصة المجانية يومياً.',
        );
      }
      if (res.status === 403) {
        throw new Error(
          'المفتاح غير مخوّل لاستخدام نموذج الصور. فعّل خدمة Generative Language API والفوترة لهذا المشروع.',
        );
      }
      if (res.status === 404) {
        throw new Error(
          'اسم النموذج غير متاح لمفتاحك. جرّب تغيير GEMINI_IMAGE_MODEL إلى gemini-2.0-flash-preview-image-generation.',
        );
      }
      throw new Error(`خطأ Gemini ${res.status}: ${errTxt.slice(0, 200)}`);
    }

    const json: any = await res.json();
    const parts = json?.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p: any) => p?.inlineData?.data);

    if (!imgPart) {
      throw new Error('لم يُرجِع النموذج صورة. جرّب صورة غرفة أوضح أو أعد المحاولة.');
    }

    const outMime = imgPart.inlineData.mimeType || 'image/png';
    return {
      provider: 'gemini' as any,
      mode: 'image',
      imageUrl: `data:${outMime};base64,${imgPart.inlineData.data}`,
      message: 'تم الدمج الواقعي بنجاح ✨',
    };
  },
};
