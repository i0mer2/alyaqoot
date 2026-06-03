import type { AIProvider, VisualizeRequest, VisualizeResult } from '../types';

/**
 * الوضع المجاني الافتراضي: لا يستهلك أي API.
 * يخبر العميل أن يقوم بالتركيب (compositing) داخل المتصفح بالـCanvas،
 * فتكون المعاينة فورية، مجانية، وبخصوصية تامة (الصورة لا تغادر جهاز المستخدم).
 */
export const browserProvider: AIProvider = {
  name: 'browser',
  async visualize(_req: VisualizeRequest): Promise<VisualizeResult> {
    return {
      provider: 'browser',
      mode: 'client-composite',
      message: 'المعالجة تتم داخل متصفحك مجاناً وبخصوصية تامة.',
    };
  },
};
