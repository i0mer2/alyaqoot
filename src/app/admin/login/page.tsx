import { Suspense } from 'react';
import LoginClient from '@/components/admin/LoginClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-ink text-white">…</div>}>
      <LoginClient />
    </Suspense>
  );
}
