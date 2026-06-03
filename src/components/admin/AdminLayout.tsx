'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Star, BookOpen,
  Image, Megaphone, Settings, LogOut, ChevronLeft, Menu, X,
  Globe, BarChart3,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin',              icon: LayoutDashboard, label: 'لوحة المعلومات' },
  { href: '/admin/products',     icon: Package,         label: 'المنتجات' },
  { href: '/admin/categories',   icon: Tag,             label: 'الفئات' },
  { href: '/admin/orders',       icon: ShoppingCart,    label: 'الطلبات' },
  { href: '/admin/testimonials', icon: Star,            label: 'آراء الزبائن' },
  { href: '/admin/blog',         icon: BookOpen,        label: 'المدوّنة' },
  { href: '/admin/gallery',      icon: Image,           label: 'معرض الأعمال' },
  { href: '/admin/banners',      icon: Megaphone,       label: 'البانرات والعروض' },
  { href: '/admin/settings',     icon: Settings,        label: 'إعدادات الموقع' },
];

export default function AdminLayout({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sideOpen, setSideOpen] = useState(true);

  const handleLogout = async () => {
    const sb = createClient();
    await sb.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f10]" dir="rtl">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-l border-white/10 bg-[#1a1a1f] transition-all duration-300',
          sideOpen ? 'w-64' : 'w-16',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          {sideOpen && (
            <div className="flex items-center gap-2">
              <span className="text-2xl text-ruby-400">♦</span>
              <span className="font-display text-lg text-white">ستائر الياقوت</span>
            </div>
          )}
          <button
            onClick={() => setSideOpen((v) => !v)}
            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            {sideOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={label}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'bg-ruby-900/60 text-ruby-300 shadow-inner'
                    : 'text-white/60 hover:bg-white/8 hover:text-white',
                )}
              >
                <Icon size={18} className="shrink-0" />
                {sideOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/50 hover:bg-white/8 hover:text-white"
          >
            <Globe size={16} className="shrink-0" />
            {sideOpen && <span>زيارة الموقع</span>}
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400/70 hover:bg-red-900/20 hover:text-red-400"
          >
            <LogOut size={16} className="shrink-0" />
            {sideOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1f] px-6 py-3">
          <h1 className="font-display text-xl text-white">
            {NAV_ITEMS.find((n) => n.href === pathname)?.label ?? 'لوحة التحكم'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40">{email}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ruby-800 text-xs font-bold text-white">
              {email?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#0f0f10] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
