'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from '@/components/ui/Section';
import CurtainArt from '@/components/art/CurtainArt';
import { categories } from '@/lib/data/categories';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function Collections() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';

  return (
    <section className="section-pad">
      <div className="container-luxe">
        <SectionTitle eyebrow={L ? 'تشكيلاتنا' : 'Collections'} title={t.sections.collections} sub={t.sections.collectionsSub} />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {categories.map((c, i) => {
            // أول فئتين أعرض للحصول على تصميم بنتو أنيق
            const span = i === 0 ? 'col-span-2 md:row-span-2 md:col-span-2' : i === 3 ? 'md:col-span-2' : '';
            const variant = i === 0 ? 'double' : 'tieback';
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-3xl ${span}`}
              >
                <Link href={`/category/${c.slug}`} className="block h-full w-full">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <CurtainArt color={catColor(c.slug)} pattern={catPattern(c.slug)} variant={variant as 'double' | 'tieback'} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-xl md:text-2xl">{L ? c.name_ar : c.name_en}</h3>
                    <p className="mt-1 text-xs text-platinum-200 md:text-sm">{L ? c.tagline_ar : c.tagline_en}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-champagne-300 opacity-0 transition group-hover:opacity-100">
                      {t.common.explore} <ArrowLeft size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function catColor(slug: string): string {
  const map: Record<string, string> = {
    modern: '#b8bcc4', classic: '#1f3a5f', luxury: '#7a1f33', blackout: '#26262a',
    sheer: '#ece7da', fabric: '#4a5d4a', custom: '#8a1b3d',
  };
  return map[slug] ?? '#8a1b3d';
}
function catPattern(slug: string): 'plain' | 'stripe' | 'damask' {
  if (slug === 'classic' || slug === 'luxury') return 'damask';
  if (slug === 'sheer') return 'stripe';
  return 'plain';
}
