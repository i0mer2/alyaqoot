import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { posts } from '@/lib/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/products', '/visualizer', '/calculator', '/gallery', '/blog', '/about', '/contact'].map(
    (r) => ({ url: `${SITE_URL}${r}`, lastModified: now, changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.8 }),
  );
  const productRoutes = products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 }));
  const categoryRoutes = categories.map((c) => ({ url: `${SITE_URL}/category/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 }));
  const blogRoutes = posts.map((b) => ({ url: `${SITE_URL}/blog/${b.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
