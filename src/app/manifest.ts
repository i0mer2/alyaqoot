import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ستائر الياقوت',
    short_name: 'الياقوت',
    description: 'ستائر وأقمشة فاخرة — تفصيل وتوصيل لكل العراق',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ef',
    theme_color: '#8a1b3d',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
