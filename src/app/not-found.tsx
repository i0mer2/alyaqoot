import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="font-display text-7xl text-ruby-800">٤٠٤</h1>
      <p className="text-lg text-ink-muted">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link href="/" className="btn-ruby">العودة للرئيسية</Link>
    </div>
  );
}
