import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع ستائر الياقوت عبر واتساب 07709164206 — كركوك، السوق الكبير. نخدم كل محافظات العراق.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactClient />;
}
