import type { Metadata } from 'next';
import CalculatorClient from '@/components/pages/CalculatorClient';

export const metadata: Metadata = {
  title: 'حاسبة الستائر — احسب كمية القماش',
  description: 'احسب كمية القماش المطلوبة لستائرك والتكلفة التقديرية بسهولة مع ستائر الياقوت.',
  alternates: { canonical: '/calculator' },
};

export default function Page() {
  return <CalculatorClient />;
}
