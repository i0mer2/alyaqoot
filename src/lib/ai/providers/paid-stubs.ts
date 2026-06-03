import type { AIProvider, VisualizeRequest, VisualizeResult } from '../types';

/**
 * نماذج جاهزة للتفعيل لاحقاً — تعرض «شكل» التكامل دون تكلفة الآن.
 * عند توفّر مفتاح API، استبدل جسم الدالة بنداء المزوّد الحقيقي (inpainting/img2img).
 */

function notConfigured(name: string): never {
  throw new Error(
    `مزوّد ${name} غير مُفعّل. أضف مفتاح الـAPI في متغيّرات البيئة وفعّل الكود في paid-stubs.ts`,
  );
}

export const replicateProvider: AIProvider = {
  name: 'replicate',
  async visualize(req: VisualizeRequest): Promise<VisualizeResult> {
    // مثال مستقبلي:
    // const out = await fetch('https://api.replicate.com/v1/predictions', {
    //   method: 'POST',
    //   headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
    //   body: JSON.stringify({ version: 'sdxl-inpaint-...', input: { image: req.roomImage, prompt: req.prompt } }),
    // });
    if (!process.env.REPLICATE_API_TOKEN) notConfigured('Replicate');
    return { provider: 'replicate', mode: 'image', imageUrl: '' };
  },
};

export const stabilityProvider: AIProvider = {
  name: 'stability',
  async visualize(req: VisualizeRequest): Promise<VisualizeResult> {
    if (!process.env.STABILITY_API_KEY) notConfigured('Stability');
    return { provider: 'stability', mode: 'image', imageUrl: '' };
  },
};

export const openaiProvider: AIProvider = {
  name: 'openai',
  async visualize(req: VisualizeRequest): Promise<VisualizeResult> {
    if (!process.env.OPENAI_API_KEY) notConfigured('OpenAI');
    return { provider: 'openai', mode: 'image', imageUrl: '' };
  },
};
