'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Package, Tags, ShoppingCart, LogOut, ExternalLink, Menu, X, Gem } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { BRAND } from '@/lib/constants';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/admin', label: 'لوحة المعلومات', icon: LayoutDashboard },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
  { href: '/admin/categories', label: 'الفئات', icon: Tags },
  { href: '/admin/orders', label: 'الطلبات', icon: ShoppingCart },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // صفحة الدخول بدون الهيكل
  if (pathname === '/admin/login') return <>{children}</>;

  const logout = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) await createClient().auth.signOut();
    } catch {}
    router.push('/admin/login');
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-platinum-50 font-arabic">
      {/* الشريط الجانبي */}
      <aside className={cn('fixed inset-y-0 right-0 z-40 w-64 transform bg-ink text-platinum-200 transition-transform lg:static lg:translate-x-0', open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0')}>
        <div className="flex items-center gap-2 border-b border-white/10 p-5">
          <Gem className="text-ruby-500" />
          <span className="font-display text-xl text-white">{BRAND.name_ar}</span>
        </div>
        <nav className="space-y-1 p-3">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={cn('flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition', active ? 'bg-ruby-gradient text-white' : 'hover:bg-white/5')}>
                <l.icon size={18} /> {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 space-y-1 border-t border-white/10 p-3">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-white/5"><ExternalLink size={18} /> زيارة الموقع</Link>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-ruby-300 hover:bg-white/5"><LogOut size={18} /> تسجيل الخروج</button>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      {/* المحتوى */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-platinum-200 bg-white/80 px-5 py-3 backdrop-blur">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-platinum-100 lg:hidden"><Menu size={22} /></button>
          <span className="text-sm text-ink-muted">{BRAND.email}</span>
          <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-platinum-100 lg:hidden"><X size={22} /></button>
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
