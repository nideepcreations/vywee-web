import type { Brand, BuyingGuide, Category, Offer, Product } from '@/types';

import { brandById, brands } from './brands';
import { buyingGuides } from './buying-guides';
import { categories, categoryById } from './categories';
import { offers } from './offers';
import { products } from './products';

export * from './brands';
export * from './buying-guides';
export * from './categories';
export * from './offers';
export * from './products';

/**
 * Read-side helpers. Pages call these instead of filtering raw arrays, so the
 * same call sites keep working when this module starts talking to a real API.
 */
/**
 * Every category at or below the given slug, parent first.
 *
 * Departments hold no products directly — products attach to leaf categories —
 * so any lookup starting from a department has to walk down before it can
 * match. The walk is breadth-first and guards against a cycle in the data,
 * which a hand-edited `parentId` can easily introduce.
 */
export function getCategoryDescendants(categorySlug: string): readonly Category[] {
  const root = categories.find((entry) => entry.slug === categorySlug);
  if (!root) return [];

  const collected: Category[] = [root];
  const seen = new Set<string>([root.id]);
  const queue: Category[] = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    for (const candidate of categories) {
      if (candidate.parentId !== current.id || seen.has(candidate.id)) continue;
      seen.add(candidate.id);
      collected.push(candidate);
      queue.push(candidate);
    }
  }

  return collected;
}

/** Direct children only. Used to render a department's sub-navigation. */
export function getChildCategories(categorySlug: string): readonly Category[] {
  const parent = categories.find((entry) => entry.slug === categorySlug);
  if (!parent) return [];
  return categories.filter((entry) => entry.parentId === parent.id);
}

/**
 * Products in a category, including everything nested beneath it. Asking for
 * `electronics` returns the headphones, laptops and monitors under it.
 */
export function getProductsByCategory(categorySlug: string): readonly Product[] {
  const branch = getCategoryDescendants(categorySlug);
  if (branch.length === 0) return [];

  const ids = new Set(branch.map((category) => category.id));
  return products.filter((product) => ids.has(product.categoryId));
}

export function getProductsByBrand(brandSlug: string): readonly Product[] {
  const brand = brands.find((entry) => entry.slug === brandSlug);
  if (!brand) return [];
  return products.filter((product) => product.brandId === brand.id);
}

export function getBrandForProduct(product: Product): Brand | undefined {
  return brandById.get(product.brandId);
}

export function getCategoryForProduct(product: Product): Category | undefined {
  return categoryById.get(product.categoryId);
}

export function getGuidesForCategory(categorySlug: string): readonly BuyingGuide[] {
  const category = categories.find((entry) => entry.slug === categorySlug);
  if (!category) return [];
  return buyingGuides.filter((guide) => guide.categoryId === category.id);
}

export function getOffersForProduct(productId: Product['id']): readonly Offer[] {
  return offers.filter((offer) => offer.productIds.includes(productId));
}

export function getActiveOffers(now: Date = new Date()): readonly Offer[] {
  return offers.filter(
    (offer) => new Date(offer.startsAt) <= now && new Date(offer.expiresAt) >= now,
  );
}

/** Number of products in a category branch. Cheaper than materialising the list. */
export function countProductsInCategory(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

/**
 * Products a reader is likely to want next: same category first, then the same
 * brand, then the wider department. Sorting by rating within each tier stops a
 * weak product surfacing purely because it shares a category.
 */
export function getRelatedProducts(product: Product, limit = 4): readonly Product[] {
  const byRating = (a: Product, b: Product) => b.rating - a.rating;
  const seen = new Set<string>([product.id]);
  const related: Product[] = [];

  const add = (candidates: readonly Product[]) => {
    for (const candidate of [...candidates].sort(byRating)) {
      if (related.length >= limit || seen.has(candidate.id)) continue;
      seen.add(candidate.id);
      related.push(candidate);
    }
  };

  add(products.filter((entry) => entry.categoryId === product.categoryId));
  add(products.filter((entry) => entry.brandId === product.brandId));

  const category = categoryById.get(product.categoryId);
  if (category?.parentId) {
    const department = categories.find((entry) => entry.id === category.parentId);
    if (department) add(getProductsByCategory(department.slug));
  }

  return related.slice(0, limit);
}

/**
 * Lookups the catalogue filters need. Passed into `filterProducts` so that the
 * pure logic in lib/ never imports mock data.
 */
export const productLookups = {
  categorySlugOf: (product: Product): string | undefined =>
    categoryById.get(product.categoryId)?.slug,
  brandSlugOf: (product: Product): string | undefined => brandById.get(product.brandId)?.slug,
} as const;
