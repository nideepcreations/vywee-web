import type { NextConfig } from 'next';

/**
 * Framework configuration.
 * Security headers are defined once here so every route inherits them.
 */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  eslint: {
    dirs: ['app', 'components', 'hooks', 'lib', 'constants', 'data', 'types'],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    /**
     * Retailer image CDNs. Product photos are referenced at the retailer's
     * own URL rather than copied into this repo: Next.js fetches and caches
     * them through its optimiser, so a visitor never requests the retailer
     * directly, and a product needs no manual image upload.
     *
     * Only the image hosts are listed — the retailers' HTML pages block
     * automated requests, but their CDNs serve images to anyone.
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
