'use client';

import { Quote } from 'lucide-react';
import SectionTitle from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Stars from '@/components/ui/Stars';
import { testimonials } from '@/lib/data/testimonials';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function Testimonials() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';

  return (
    <section className="section-pad bg-ivory-deep">
      <div className="container-luxe">
        <SectionTitle eyebrow={L ? 'آراء' : 'Reviews'} title={t.sections.testimonials} sub={t.sections.testimonialsSub} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((r, i) => (
            <Reveal key={r.id} i={i} className="card-luxe relative flex flex-col p-7">
              <Quote className="absolute end-6 top-6 text-platinum-200" size={40} />
              <Stars value={r.rating} />
              <p className="mt-4 flex-1 leading-relaxed text-ink-soft">“{L ? r.text_ar : r.text_en}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full font-display text-lg text-white" style={{ background: r.avatarColor }}>
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-xs text-ink-muted">{r.city}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
