import { NextResponse, type NextRequest } from 'next/server';

/**
 * يحمي مسارات /admin بفحص خفيف لوجود كوكي جلسة Supabase (دون استيراد مكتبة
 * ثقيلة داخل Edge Runtime). التحقّق الفعلي من الصلاحية يجري عبر RLS عند الاستعلام.
 * إن لم تُضبط Supabase بعد، يسمح بالمرور (وضع تطوير).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return NextResponse.next();

  const hasSession = request.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-') && c.name.includes('-auth-token'));

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
