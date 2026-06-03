'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import CurtainArt from '@/components/art/CurtainArt';
import { projects } from '@/lib/data/projects';
import { categories } from '@/lib/data/categories';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

const colorByCat: Record<string, string> = {
  modern: '#b8bcc4', classic: '#1f3a5f', luxury: '#7a1f33', blackout: '#26262a', sheer: '#ece7da', fabric: '#4a5d4a', custom: '#8a1b3d',
};

export default function GalleryClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      <PageHeader eyebrow={L ? 'أعمالنا' : 'Our work'} title={L ? 'معرض الأعمال' : 'Gallery'} sub={L ? 'مشاريع نفّذناها في بيوت ومكاتب عراقية' : 'Projects across Iraqi homes & offices'} />

      <div className="container-luxe section-pad">
        {/* فلاتر */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Chip active={cat === 'all'} onClick={() => setCat('all')}>{L ? 'الكل' : 'All'}</Chip>
          {categories.filter((c) => c.slug !== 'fabric' && c.slug !== 'custom').map((c) => (
            <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{L ? c.name_ar : c.name_en}</Chip>
          ))}
        </div>

        {/* شبكة */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 4) * 0.05 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <CurtainArt color={colorByCat[p.category]} pattern={p.category === 'classic' || p.category === 'luxury' ? 'damask' : 'plain'} variant="tieback" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="font-display text-lg">{L ? p.title_ar : p.title_en}</div>
                <div className="text-xs text-platinum-200">{p.city}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* عرض فيديو */}
        <div className="mt-14 grid items-center gap-8 rounded-4xl bg-ink p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-display text-3xl">{L ? 'شاهد طريقة عرض منتجاتنا' : 'Watch our showcase'}</h2>
            <p className="mt-3 text-platinum-200">{L ? 'فيديوهات قصيرة تُبرز حركة الستائر وانسدالها وفخامة الأقمشة عن قرب.' : 'Short videos highlighting fabric movement and texture.'}</p>
            <p className="mt-3 text-sm text-champagne-300">{L ? '↻ ارفع فيديوهاتك من لوحة التحكم لتظهر هنا.' : '↻ Upload your videos from the dashboard.'}</p>
          </div>
          <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-ruby-800 to-ink">
            <button className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ruby-800 shadow-luxe transition hover:scale-110"><Play size={26} className="ms-1" /></button>
          </div>
        </div>
      </div>
    </>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn('rounded-full border px-4 py-2 text-sm font-medium transition', active ? 'border-ruby-700 bg-ruby-gradient text-white' : 'border-platinum-200 bg-white hover:border-champagne')}>{children}</button>
  );
}
