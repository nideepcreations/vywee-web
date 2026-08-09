import type { Availability, Product } from '@/types';

/**
 * Pure catalogue query logic.
 *
 * Kept here rather than in `data/` because none of it touches the mock
 * catalogue: these functions operate on whatever list of products they are
 * given, so they keep working unchanged when the data comes from an API.
 */

export const PRODUCT_SORT_KEYS = [
  'relevance',
  'rating',
  'price-low',
  'price-high',
  'newest',
] as const;

export type ProductSortKey = (typeof PRODUCT_SORT_KEYS)[number];

export const DEFAULT_SORT: ProductSortKey = 'relevance';

export const SORT_LABELS: Record<ProductSortKey, string> = {
  relevance: 'Most relevant',
  rating: 'Highest rated',
  'price-low': 'Price: low to high',
  'price-high': 'Price: high to low',
  newest: 'Recently updated',
};

/** Narrows an untrusted query-string value to a sort key. */
export function parseSort(value: string | string[] | undefined): ProductSortKey {
  if (typeof value !== 'string') return DEFAULT_SORT;
  return (PRODUCT_SORT_KEYS as readonly string[]).includes(value)
    ? (value as ProductSortKey)
    : DEFAULT_SORT;
}

export interface ProductFilters {
  /** Category slugs. A product matches if its category is in the list. */
  readonly categorySlugs?: readonly string[];
  readonly brandSlugs?: readonly string[];
  readonly availability?: Availability;
  readonly minRating?: number;
  /** Inclusive bounds tested against the product's tracked price band. */
  readonly maxPrice?: number;
  readonly minPrice?: number;
  readonly editorsPickOnly?: boolean;
}

/** True when no filter would narrow the list. Used to decide canonical vs noindex. */
export function hasActiveFilters(filters: ProductFilters): boolean {
  return Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== undefined && value !== false,
  );
}

interface FilterContext {
  /** Category slug for a product id, supplied by the caller. */
  readonly categorySlugOf: (product: Product) => string | undefined;
  readonly brandSlugOf: (product: Product) => string | undefined;
}

/**
 * Narrows a product list. Every predicate is skipped when its filter is
 * absent, so an empty filter object returns the list untouched.
 */
export function filterProducts(
  products: readonly Product[],
  filters: ProductFilters,
  context: FilterContext,
): readonly Product[] {
  return products.filter((product) => {
    if (filters.categorySlugs && filters.categorySlugs.length > 0) {
      const slug = context.categorySlugOf(product);
      if (!slug || !filters.categorySlugs.includes(slug)) return false;
    }

    if (filters.brandSlugs && filters.brandSlugs.length > 0) {
      const slug = context.brandSlugOf(product);
      if (!slug || !filters.brandSlugs.includes(slug)) return false;
    }

    if (filters.availability && product.availability !== filters.availability) return false;
    if (filters.minRating !== undefined && product.rating < filters.minRating) return false;
    if (filters.minPrice !== undefined && product.priceBand.max < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.priceBand.min > filters.maxPrice) return false;
    if (filters.editorsPickOnly && !product.editorsPick) return false;

    return true;
  });
}

/**
 * Returns a sorted copy — the input is a readonly catalogue and must not be
 * mutated. `relevance` puts editors' picks first, then rating, which is the
 * closest thing to a ranking signal before search exists.
 */
export function sortProducts(
  products: readonly Product[],
  key: ProductSortKey = DEFAULT_SORT,
): readonly Product[] {
  const sorted = [...products];

  switch (key) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'price-low':
      return sorted.sort((a, b) => a.priceBand.min - b.priceBand.min);
    case 'price-high':
      return sorted.sort((a, b) => b.priceBand.max - a.priceBand.max);
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case 'relevance':
    default:
      return sorted.sort(
        (a, b) => Number(b.editorsPick) - Number(a.editorsPick) || b.rating - a.rating,
      );
  }
}
