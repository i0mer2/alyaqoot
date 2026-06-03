import Hero from '@/components/home/Hero';
import Collections from '@/components/home/Collections';
import ProductSection from '@/components/home/ProductSection';
import WhyUs from '@/components/home/WhyUs';
import VisualizerCTA from '@/components/home/VisualizerCTA';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import JsonLd from '@/components/seo/JsonLd';
import { featuredProducts, onSaleProducts } from '@/lib/data/products';

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Collections />
      <ProductSection section="featured" products={featuredProducts()} />
      <VisualizerCTA />
      <ProductSection section="offers" products={onSaleProducts()} tinted />
      <WhyUs />
      <Testimonials />
      <BlogPreview />
    </>
  );
}
