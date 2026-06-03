import { BRAND, SITE_URL } from '@/lib/constants';

/** بيانات منظّمة (Schema.org) لتحسين الظهور في جوجل */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Store', 'HomeGoodsStore', 'LocalBusiness'],
        '@id': `${SITE_URL}/#store`,
        name: BRAND.name_ar,
        alternateName: BRAND.name_en,
        description: 'ستائر وأقمشة فاخرة، تفصيل حسب القياس، توصيل لكل محافظات العراق.',
        url: SITE_URL,
        telephone: '+9647709164206',
        priceRange: '$$',
        image: `${SITE_URL}/og.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'كركوك',
          addressRegion: 'كركوك',
          addressCountry: 'IQ',
          streetAddress: 'السوق الكبير',
        },
        areaServed: 'IQ',
        currenciesAccepted: 'IQD',
        paymentAccepted: 'Cash on Delivery, Mastercard',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND.name_ar,
        inLanguage: 'ar',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/products?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
