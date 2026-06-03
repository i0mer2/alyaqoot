'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Gem, Lock, Mail, LogIn, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { BRAND } from '@/lib/constants';

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const enabled = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  const [email, setEmail] = useState<string>(BRAND.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!enabled) {
      router.push('/admin');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="grid min-h-screen place-items-center bg-ink p-5 font-arabic">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ruby-600/30 blur-3xl" />
      <form onSubmit={submit} className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-luxe">
        <div className="mb-6 flex flex-col items-center text-center">
          <Gem className="mb-2 text-ruby-700" size={36} />
          <h1 className="font-display text-2xl text-ink">{BRAND.name_ar}</h1>
          <p className="text-sm text-ink-muted">لوحة التحكم</p>
        </div>

        {!enabled && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-champagne-50 p-3 text-xs text-champagne-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>Supabase غير مُعدّ بعد. اضغط دخول لمعاينة اللوحة بوضع التطوير، أو أضف مفاتيح Supabase في <code>.env.local</code> لتفعيل الحماية.</span>
          </div>
        )}

        <label className="mb-1 block text-sm text-ink-muted">البريد الإلكتروني</label>
        <div className="relative mb-4">
          <Mail size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-platinum-200 py-3 ps-9 pe-3 outline-none focus:border-champagne" required />
        </div>

        <label className="mb-1 block text-sm text-ink-muted">كلمة المرور</label>
        <div className="relative mb-5">
          <Lock size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-platinum-200 py-3 ps-9 pe-3 outline-none focus:border-champagne" placeholder="••••••••" />
        </div>

        {error && <p className="mb-4 rounded-lg bg-ruby-50 p-2 text-center text-sm text-ruby-700">{error}</p>}

        <button type="submit" disabled={loading} className="btn-ruby w-full disabled:opacity-60">
          <LogIn size={18} /> {loading ? 'جارٍ الدخول…' : 'دخول'}
        </button>
      </form>
    </div>
  );
}
