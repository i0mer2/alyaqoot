'use client';

import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/lib/data/blog';
import { useLocale } from '@/lib/i18n/LocaleProvider';

const covers = ['#8a1b3d', '#1f3a5f', '#4a5d4a', '#b0723a'];

export default function BlogClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';

  return (
    <>
      <PageHeader eyebrow={L ? 'مقالات' : 'Articles'} title={L ? 'المدوّنة' : 'Blog'} sub={L ? 'نصائح ديكور وأدلة عملية للستائر والأقمشة' : 'Décor tips & practical curtain guides'} />
      <div className="container-luxe section-pad grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} i={i} className="card-luxe group flex flex-col overflow-hidden">
            <Link href={`/blog/${p.slug}`}>
              <div className="flex aspect-[16/10] items-end p-5" style={{ background: `linear-gradient(135deg, ${covers[i % covers.length]}, #1a1718)` }}>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{p.tag_ar}</span>
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-xs text-ink-muted"><Clock size={13} /> {p.readMinutes} {L ? 'دقائق' : 'min'} · {p.date}</div>
              <Link href={`/blog/${p.slug}`} className="mt-2 font-display text-lg text-ink hover:text-ruby-800">{L ? p.title_ar : p.title_en}</Link>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{L ? p.excerpt_ar : p.excerpt_en}</p>
              <Link href={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ruby-700">{L ? 'اقرأ المزيد' : 'Read'} <ArrowLeft size={14} /></Link>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
