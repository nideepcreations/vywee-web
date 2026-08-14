import type { Metadata } from 'next';

import type { Brand, BuyingGuide, Product } from '@/types';

import { DEFAULT_OG_IMAGE, SITE } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
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
    image,
    keywords,
    noIndex = false,
    type = 'website',
    publishedTime,
    modifiedTime,
  } = input;

  const url = absoluteUrl(path, SITE.url);
  /**
   * Product names already carry their brand, so a page passing "Sonova Arc 900"
   * with brand "Sonova" would otherwise render "Sonova Sonova Arc 900". The
   * suffix is also skipped when the title already ends with the site name, so
   * no page ever reads "Vywee · Vywee".
   */
  const resolvedTitle = title
    ? title.endsWith(SITE.name)
      ? title
      : `${title} · ${SITE.name}`
    : `${SITE.name} — ${SITE.tagline}`;

  /**
   * When a page supplies no artwork the image keys are omitted entirely, which
   * lets the generated card from `app/opengraph-image.tsx` apply. Setting them
   * here would override the file convention with a path that does not exist.
   */
  /**
   * SVG artwork is skipped: most social platforms refuse to render an SVG
   * card, so a page passing one falls back to the generated PNG rather than
   * advertising an image that will not display. The default is set explicitly
   * because the opengraph-image file convention is not applied to routes whose
   * `generateMetadata` returns its own `openGraph` object.
   */
  const usableImage = image && !image.toLowerCase().endsWith('.svg') ? image : DEFAULT_OG_IMAGE.url;
  const imageUrl = usableImage.startsWith('http')
    ? usableImage
    : absoluteUrl(usableImage, SITE.url);

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
    /**
     * Twitter images are set here rather than via an app/twitter-image file:
     * the convention cannot see a page's own artwork, and a second image route
     * producing an identical card would be dead configuration.
     */
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

/**
 * Product structured data.
 *
 * Vywee publishes a tracked range rather than a single figure, so the offer
 * node is an `AggregateOffer` with low and high prices. Emitting a made-up
 * exact `price` to satisfy a richer result would misrepresent what we know.
 */
export function createProductJsonLd(
  product: Product,
  brand: Brand | undefined,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.verdict.summary,
    sku: product.slug,
    url: absoluteUrl(ROUTES.product(product.slug), SITE.url),
    image: absoluteUrl(product.image.src, SITE.url),
    ...(brand ? { brand: { '@type': 'Brand', name: brand.name } } : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: product.priceBand.currency,
      lowPrice: product.priceBand.min,
      highPrice: product.priceBand.max,
      availability:
        product.availability === 'out-of-stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
  };
}

/** Editorial structured data for a buying guide. */
export function createArticleJsonLd(guide: BuyingGuide): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.name,
    description: guide.excerpt,
    url: absoluteUrl(ROUTES.guide(guide.slug), SITE.url),
    image: absoluteUrl(guide.cover.src, SITE.url),
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { '@type': 'Organization', name: guide.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    inLanguage: SITE.language,
  };
}
