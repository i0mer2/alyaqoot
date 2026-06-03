import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { posts, getPost } from '@/lib/data/blog';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return { title: 'غير موجود' };
  return { title: p.title_ar, description: p.excerpt_ar, alternates: { canonical: `/blog/${p.slug}` } };
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();

  return (
    <>
      <PageHeader eyebrow={p.tag_ar} title={p.title_ar} />
      <article className="container-luxe section-pad max-w-3xl">
        <div className="mb-6 flex items-center gap-2 text-sm text-ink-muted">
          <Clock size={14} /> {p.readMinutes} دقائق قراءة · {p.date}
        </div>
        <div className="space-y-4 text-lg leading-loose text-ink-soft">
          {p.body_ar.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="whitespace-pre-line">{para}</p>
          ))}
        </div>
        <div className="mt-10 border-t border-platinum-200 pt-6">
          <Link href="/blog" className="inline-flex items-center gap-1 font-semibold text-ruby-700">
            <ArrowRight size={16} /> العودة للمدوّنة
          </Link>
        </div>
      </article>
    </>
  );
}
