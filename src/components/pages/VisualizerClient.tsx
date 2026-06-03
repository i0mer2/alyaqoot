'use client';

import PageHeader from '@/components/ui/PageHeader';
import RoomVisualizer from '@/components/visualizer/RoomVisualizer';
import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function VisualizerClient() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  return (
    <>
      <PageHeader eyebrow={L ? 'أداة ذكية' : 'Smart tool'} title={t.visualizer.title} sub={t.sections.visualizerSub} />
      <div className="container-luxe section-pad">
        <RoomVisualizer />
      </div>
    </>
  );
}
