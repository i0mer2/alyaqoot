'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Upload, MousePointerClick, Download } from 'lucide-react';
import CurtainArt from '@/components/art/CurtainArt';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function VisualizerCTA() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const steps = [
    { icon: Upload, text: t.visualizer.step1 },
    { icon: MousePointerClick, text: t.visualizer.step2 },
    { icon: Download, text: t.visualizer.step3 },
  ];

  return (
    <section className="section-pad">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-4xl bg-ink p-8 text-white md:p-14">
          {/* وهج */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ruby-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-champagne-500/20 blur-3xl" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-white/5 px-4 py-1.5 text-sm text-champagne-300">
                <Sparkles size={15} /> {L ? 'حصري ومجاني' : 'Exclusive & free'}
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">{t.sections.visualizer}</h2>
              <p className="mt-4 text-platinum-200">{t.sections.visualizerSub}</p>

              <div className="mt-7 space-y-3">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-champagne-300">
                      <s.icon size={17} />
                    </span>
                    <span className="text-sm text-platinum-100">{s.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/visualizer" className="btn-white mt-8">
                <Sparkles size={16} /> {t.hero.cta2}
              </Link>
            </div>

            {/* معاينة وهمية */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-luxe"
            >
              {/* غرفة وهمية */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#d9cfc0] to-[#b9ad9a]" />
              <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-xl bg-[#e9e2d6]" />
              {/* الستارة المركّبة */}
              <div className="absolute inset-y-0 right-6 w-2/5">
                <CurtainArt color="#7a1f33" pattern="damask" variant="tieback" />
              </div>
              <div className="absolute inset-y-0 left-6 w-2/5">
                <CurtainArt color="#7a1f33" pattern="damask" variant="tieback" />
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs backdrop-blur">
                {L ? 'معاينة داخل غرفتك' : 'Preview in your room'}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
