'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, ChevronDown } from 'lucide-react';
import { useLocale } from '@/lib/i18n/LocaleProvider';

const CurtainCloth = dynamic(() => import('@/components/three/CurtainCloth'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ruby-gradient" />,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { locale, t } = useLocale();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowLeft;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* خلفية احتياطية فاخرة (تظهر إن لم يتوفّر WebGL) */}
      <div className="absolute inset-0 -z-20 bg-ruby-gradient" />
      {/* المشهد ثلاثي الأبعاد */}
      <div className="absolute inset-0 -z-10">
        <CurtainCloth />
      </div>
      {/* طبقات تعتيم للنص */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/50 via-transparent to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/40 to-transparent" />

      <div className="container-luxe">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl text-white">
          <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            <Sparkles size={15} className="text-champagne-300" />
            {t.hero.eyebrow}
          </motion.div>

          <motion.h1 variants={item} className="font-display text-5xl leading-[1.05] sm:text-7xl">
            {t.hero.title}
          </motion.h1>

          <motion.p variants={item} className="mt-3 font-display text-2xl text-champagne-200 sm:text-3xl">
            {t.hero.subtitle}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-platinum-100/90 sm:text-lg">
            {t.hero.desc}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <Link href="/products" className="btn-white">
              {t.hero.cta1} <Arrow size={18} />
            </Link>
            <Link href="/visualizer" className="btn-outline border-white/50 !text-white hover:!bg-white/10">
              <Sparkles size={16} /> {t.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* مؤشّر التمرير */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
