'use client';

import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import CartDrawer from '@/components/layout/CartDrawer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import CurtainIntro from '@/components/layout/CurtainIntro';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <CurtainIntro />
      {children}
      <CartDrawer />
      <WhatsAppFab />
    </LocaleProvider>
  );
}
