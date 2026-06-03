'use client';

import Link from 'next/link';
import { Target, Eye, Gem, Sparkles } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import CurtainArt from '@/components/art/CurtainArt';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { BRAND } from '@/lib/constants';

export default function AboutClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';

  const stats = [
    { n: '+10', ar: 'سنوات خبرة', en: 'Years' },
    { n: '+2000', ar: 'عميل سعيد', en: 'Clients' },
    { n: '18', ar: 'محافظة نخدمها', en: 'Governorates' },
    { n: '+50', ar: 'تشكيلة قماش', en: 'Fabrics' },
  ];

  return (
    <>
      <PageHeader eyebrow={L ? 'تعرّف علينا' : 'About'} title={L ? 'قصّة الياقوت' : 'Our Story'} sub={L ? BRAND.manager_ar : BRAND.manager_en} />

      <section className="container-luxe section-pad grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl text-ink md:text-4xl">{L ? 'فخامة تبدأ من نافذتك' : 'Luxury starts at your window'}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {L
              ? 'من قلب كركوك – السوق الكبير، انطلقت ستائر الياقوت لتكون عنواناً للأناقة والجودة في عالم الستائر والأقمشة. نؤمن أن الستارة ليست مجرد قطعة قماش، بل لمسة تكمّل جمال البيت وتعكس ذوق أصحابه. نختار خاماتنا بعناية، ونفصّل كل ستارة على مقاس نافذتك بأيدٍ ماهرة.'
              : 'From the heart of Kirkuk’s Grand Bazaar, Al-Yaqoot Curtains began as a symbol of elegance and quality. We believe a curtain is more than fabric — it completes a home’s beauty. We hand-pick our materials and tailor every curtain to your exact window.'}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {L
              ? 'واليوم نقدّم تجربة تسوّق عصرية: تصفّح، احسب، وجرّب الستارة داخل غرفتك قبل الشراء — مع توصيل لكل محافظات العراق.'
              : 'Today we offer a modern experience: browse, calculate, and preview curtains in your own room before buying — with Iraq-wide delivery.'}
          </p>
          <Link href="/products" className="btn-ruby mt-6">{L ? 'تصفّح التشكيلة' : 'Browse collection'}</Link>
        </Reveal>
        <Reveal i={1} className="aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe">
          <CurtainArt color="#7a1f33" pattern="damask" variant="double" />
        </Reveal>
      </section>

      {/* أرقام */}
      <section className="bg-ink py-14 text-white">
        <div className="container-luxe grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} i={i}>
              <div className="font-display text-4xl text-champagne-400">{s.n}</div>
              <div className="mt-1 text-sm text-platinum-300">{L ? s.ar : s.en}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* الرؤية والرسالة والقيم */}
      <section className="container-luxe section-pad grid gap-6 md:grid-cols-3">
        {[
          { icon: Eye, t: L ? 'رؤيتنا' : 'Vision', d: L ? 'أن نكون الخيار الأول للستائر الفاخرة في العراق.' : 'To be Iraq’s first choice for luxury curtains.' },
          { icon: Target, t: L ? 'رسالتنا' : 'Mission', d: L ? 'تقديم جودة عالية وخدمة صادقة بأسعار في متناول الجميع.' : 'High quality and honest service at fair prices.' },
          { icon: Gem, t: L ? 'قيمنا' : 'Values', d: L ? 'الإتقان، الصدق، والاهتمام بأدقّ التفاصيل.' : 'Craft, honesty, and attention to detail.' },
        ].map((v, i) => (
          <Reveal key={i} i={i} className="card-luxe p-7 text-center">
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-ruby-gradient text-white"><v.icon size={26} /></span>
            <h3 className="font-display text-xl">{v.t}</h3>
            <p className="mt-2 text-sm text-ink-muted">{v.d}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
