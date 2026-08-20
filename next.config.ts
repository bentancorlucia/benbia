import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Las cards nunca pasan de ~50vw: no hace falta generar variantes gigantes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    // Tree-shaking real de framer-motion (lo importan 9 componentes).
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
