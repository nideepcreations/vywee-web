import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { brands } from '@/data/brands';
import { buyingGuides } from '@/data/buying-guides';
import { categories } from '@/data/categories';
import { products } from '@/data/products';

const url = (path: string) => `${SITE.url}${path}`;

/**
 * Generated from the catalogue, so new entities appear in search without a
 * manual step. Swap the data imports for a fetch when the API lands.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url(ROUTES.home), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: url(ROUTES.categories), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url(ROUTES.guides), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url(ROUTES.brands), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: url(ROUTES.offers), lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: url(ROUTES.about), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...staticRoutes,
    ...categories.map((category) => ({
      url: url(ROUTES.category(category.slug)),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: url(ROUTES.product(product.slug)),
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...buyingGuides.map((guide) => ({
      url: url(ROUTES.guide(guide.slug)),
      lastModified: new Date(guide.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...brands.map((brand) => ({
      url: url(ROUTES.brand(brand.slug)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
