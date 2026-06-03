import type { AIProvider, AIProviderName, VisualizeRequest, VisualizeResult } from './types';
import { browserProvider } from './providers/browser';
import { replicateProvider, stabilityProvider, openaiProvider } from './providers/paid-stubs';

const registry: Record<string, AIProvider> = {
  browser: browserProvider,
  mock: browserProvider,
  replicate: replicateProvider,
  stability: stabilityProvider,
  openai: openaiProvider,
  flux: replicateProvider, // Flux يُشغَّل عادةً عبر Replicate
};

/** المزوّد الحالي (افتراضي: browser المجاني) — يُضبط عبر AI_PROVIDER */
export function getProvider(): AIProvider {
  const name = (process.env.AI_PROVIDER as AIProviderName) || 'browser';
  return registry[name] ?? browserProvider;
}

export async function visualize(req: VisualizeRequest): Promise<VisualizeResult> {
  const provider = getProvider();
  const t0 = Date.now();
  const res = await provider.visualize(req);
  return { ...res, latencyMs: Date.now() - t0 };
}
