/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Supabase Storage (replace <project-ref> after you create the project)
      { protocol: 'https', hostname: '*.supabase.co' },
      // Allow Unsplash placeholders used in seed/mock data
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
