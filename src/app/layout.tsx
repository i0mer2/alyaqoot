import type { Metadata, Viewport } from 'next';
import { Aref_Ruqaa, Tajawal, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BRAND, SITE_URL } from '@/lib/constants';

const display = Aref_Ruqaa({ subsets: ['arabic', 'latin'], weight: ['400', '700'], variable: '--font-display', display: 'swap' });
const arabic = Tajawal({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700'], variable: '--font-arabic', display: 'swap' });
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name_ar} | ستائر وأقمشة فاخرة في كركوك والعراق`,
    template: `%s | ${BRAND.name_ar}`,
  },
  description:
    'ستائر الياقوت — تشكيلة فاخرة من الستائر والأقمشة، تفصيل حسب القياس، توصيل لكل محافظات العراق، وأداة ذكية لمعاينة الستارة داخل غرفتك قبل الشراء. كركوك – السوق الكبير.',
  keywords: [
    'ستائر', 'ستائر كركوك', 'ستائر فاخرة', 'ستائر مودرن', 'ستائر بلاك آوت',
    'أقمشة', 'تفصيل ستائر', 'ستائر العراق', 'ستائر الياقوت', 'curtains Kirkuk Iraq',
  ],
  authors: [{ name: BRAND.name_ar }],
  openGraph: {
    type: 'website',
    locale: 'ar_IQ',
    siteName: BRAND.name_ar,
    title: `${BRAND.name_ar} | ستائر وأقمشة فاخرة`,
    description: 'فخامة تُفصّل على ذوقك — ستائر وأقمشة مع معاينة ذكية داخل غرفتك.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#8a1b3d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${arabic.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
