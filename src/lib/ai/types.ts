// ===========================================================================
//  طبقة الذكاء الاصطناعي — عقد موحّد (Provider-agnostic contract)
//  يسمح بالتبديل بين: browser (مجاني) | replicate | stability | openai | flux
// ===========================================================================

export type AIProviderName = 'browser' | 'mock' | 'gemini' | 'replicate' | 'stability' | 'openai' | 'flux';

export interface VisualizeRequest {
  /** صورة الغرفة (base64 data URL أو رابط) */
  roomImage: string;
  /** معرّف المنتج/الستارة المختارة */
  productId?: string;
  /** لون القماش hex */
  color: string;
  /** نوع النقشة */
  pattern: 'plain' | 'stripe' | 'damask';
  sheer: boolean;
  /** نص إرشادي للمزوّدات النصية (OpenAI/Flux) */
  prompt?: string;
}

export interface VisualizeResult {
  provider: AIProviderName;
  /** إذا 'browser' فالمعالجة تتم في العميل بالـCanvas (لا صورة من الخادم) */
  mode: 'client-composite' | 'image';
  imageUrl?: string;
  message?: string;
  latencyMs?: number;
}

export interface AIProvider {
  name: AIProviderName;
  visualize(req: VisualizeRequest): Promise<VisualizeResult>;
}
