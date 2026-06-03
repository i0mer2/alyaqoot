'use client';

import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import CartDrawer from '@/components/layout/CartDrawer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      {children}
      <CartDrawer />
      <WhatsAppFab />
    </LocaleProvider>
  );
}
