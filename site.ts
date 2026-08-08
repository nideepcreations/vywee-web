import { env } from '@/lib/env';

/** Brand-level facts used by metadata, structured data and the layout chrome. */
export const SITE = {
  name: 'Vywee',
  shortName: 'Vywee',
  tagline: 'Worth buying, or not.',
  description:
    'Vywee compares products across retailers and tells you which one is actually worth your money — with honest verdicts, real price bands and no filler.',
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: 'en_IN',
  language: 'en-IN',
  themeColor: {
    light: '#ffffff',
    dark: '#070b16',
  },
  social: {
    x: 'https://x.com/vywee',
    instagram: 'https://instagram.com/vywee',
    youtube: 'https://youtube.com/@vywee',
  },
  contactEmail: 'hello@vywee.com',
  organisation: {
    legalName: 'Vywee Media',
    foundingYear: 2026,
  },
} as const;

/** Anchor the header search link points at. */
export const AI_SEARCH_ANCHOR = '#ai-search';

export const DEFAULT_OG_IMAGE = {
  url: '/images/og-default.png',
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.tagline}`,
} as const;
