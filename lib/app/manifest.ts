import type { MetadataRoute } from 'next';

import { SITE } from '@/constants/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: SITE.themeColor.light,
    theme_color: SITE.themeColor.light,
    lang: SITE.language,
    /**
     * The SVG scales to any size, but installability on Android still expects
     * raster 192 and 512 icons, and the maskable variant carries the padding
     * Android needs when it crops the icon to the launcher's shape. All four
     * are generated from the same symbol-only mark.
     */
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
