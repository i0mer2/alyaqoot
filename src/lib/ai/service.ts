import type { AIProvider, AIProviderName, VisualizeRequest, VisualizeResult } from './types';
import { browserProvider } from './providers/browser';
import { geminiProvider } from './providers/gemini';
import { replicateProvider, stabilityProvider, openaiProvider } from './providers/paid-stubs';

const registry: Record<string, AIProvider> = {
  browser: browserProvider,
  mock: browserProvider,
  gemini: geminiProvider,
  replicate: replicateProvider,
  stability: stabilityProvider,
  openai: openaiProvider,
  flux: replicateProvider, // Flux يُشغَّل عادةً عبر Replicate
};

/**
 * اختيار المزوّد:
 * 1) إن ضُبط AI_PROVIDER استخدمه.
 * 2) وإلا إن وُجد مفتاح Gemini مجاني → فعّل الدمج الواقعي تلقائياً.
 * 3) وإلا → وضع المتصفح المجاني (معاينة سريعة).
 */
export function getProvider(): AIProvider {
  const explicit = process.env.AI_PROVIDER as AIProviderName | undefined;
  if (explicit && registry[explicit]) return registry[explicit];
  if (process.env.GEMINI_API_KEY) return geminiProvider;
  return browserProvider;
}

export async function visualize(req: VisualizeRequest): Promise<VisualizeResult> {
  const provider = getProvider();
  const t0 = Date.now();
  const res = await provider.visualize(req);
  return { ...res, latencyMs: Date.now() - t0 };
}
