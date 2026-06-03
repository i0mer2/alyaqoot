import type { Metadata } from 'next';
import VisualizerClient from '@/components/pages/VisualizerClient';

export const metadata: Metadata = {
  title: 'مُصمّم الستائر الذكي — جرّب الستارة بغرفتك مجاناً',
  description:
    'حمّل صورة غرفتك، اختر ستارة من ستائر الياقوت، وشاهد الشكل النهائي داخل غرفتك مباشرةً — أداة مجانية بالكامل وبخصوصية تامة.',
  alternates: { canonical: '/visualizer' },
};

export default function Page() {
  return <VisualizerClient />;
}
