'use client';

import { Scissors, Truck, BadgeCheck, Wrench } from 'lucide-react';
import SectionTitle from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function WhyUs() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const icons = [Scissors, Truck, BadgeCheck, Wrench];
  const keys: Array<'a' | 'b' | 'c' | 'd'> = ['a', 'b', 'c', 'd'];

  return (
    <section className="section-pad">
      <div className="container-luxe">
        <SectionTitle eyebrow={L ? 'مزايانا' : 'Our edge'} title={t.sections.why} sub={t.sections.whySub} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((k, i) => {
            const Icon = icons[i];
            const [title, desc] = t.why[k];
            return (
              <Reveal key={k} i={i} className="card-luxe flex flex-col items-center p-8 text-center">
                <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-ruby-gradient text-white shadow-luxe">
                  <Icon size={28} />
                </span>
                <h3 className="font-display text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
