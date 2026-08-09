import type { Metadata } from 'next';

import { DEFAULT_OG_IMAGE, SITE } from '@/constants/site';
import { absoluteUrl } from '@/lib/utils';

interface MetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Builds page metadata from one place, so titles, canonicals and social cards
 * stay consistent no matter which route adds them.
 */
export function createMetadata(input: MetadataInput = {}): Metadata {
  const {
    title,
    description = SITE.description,
    path = '/',
    image = DEFAULT_OG_IMAGE.url,
    keywords,
    noIndex = false,
    type = 'website',
    publishedTime,
    modifiedTime,
  } = input;

  const url = absoluteUrl(path, SITE.url);
  const resolvedTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image, SITE.url);

  return {
    title: resolvedTitle,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title: resolvedTitle,
      description,
      locale: SITE.locale,
      images: [
        {
          url: imageUrl,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: resolvedTitle,
        },
      ],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}

/** Organisation and site-level structured data, injected once from the root layout. */
export function createOrganisationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    foundingDate: String(SITE.organisation.foundingYear),
    legalName: SITE.organisation.legalName,
    email: SITE.contactEmail,
    sameAs: Object.values(SITE.social),
  };
}

export function createWebsiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
  };
}

export function createBreadcrumbJsonLd(
  crumbs: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, SITE.url),
    })),
  };
}
