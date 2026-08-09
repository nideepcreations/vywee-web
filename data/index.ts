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
export function getProductsByCategory(categorySlug: string): readonly Product[] {
  const category = categories.find((entry) => entry.slug === categorySlug);
  if (!category) return [];
  return products.filter((product) => product.categoryId === category.id);
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
