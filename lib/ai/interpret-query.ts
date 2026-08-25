import type { Availability } from '@/types';

import type { ProductFilters, ProductSortKey } from '@/lib/catalogue';

/**
 * A search query resolved into something the catalogue can act on.
 *
 * `source` records how the interpretation was produced. `rule-based` means no
 * AI provider is configured (or the call failed) and the query was parsed with
 * plain heuristics; `ai` means a language model read the query. The UI is
 * honest about which one produced the summary the person is looking at —
 * Principle 5 in the product doc: users should know the difference between
 * verified data, AI analysis and a rule-based guess.
 */
export interface SearchInterpretation {
  readonly summary: string;
  readonly filters: ProductFilters;
  readonly sort: ProductSortKey;
  readonly categorySlugs?: readonly string[];
  readonly source: 'ai' | 'rule-based';
}

const BUDGET_PATTERN = /(?:under|below|less than|within)\s*₹?\s*([\d,]+)\s*(k|thousand|lakh|lac)?/i;

const CATEGORY_KEYWORDS: Record<string, readonly string[]> = {
  headphones: ['headphone', 'headphones', 'earbud', 'earbuds', 'earphone'],
  smartphones: ['phone', 'smartphone', 'mobile'],
  laptops: ['laptop', 'notebook'],
  wearables: ['watch', 'smartwatch', 'band', 'fitness tracker'],
  monitors: ['monitor', 'display', 'screen'],
  'home-appliances': ['ac', 'air conditioner', 'purifier', 'washing machine'],
  gaming: ['gaming', 'controller', 'console'],
  footwear: ['shoe', 'shoes', 'sneaker', 'running shoe'],
  skincare: ['skincare', 'moisturiser', 'moisturizer', 'sunscreen'],
  cookware: ['pan', 'skillet', 'cookware', 'pot'],
  luggage: ['luggage', 'suitcase', 'cabin bag'],
};

function parseBudget(query: string): number | undefined {
  const match = query.match(BUDGET_PATTERN);
  if (!match) return undefined;
  const raw = Number(match[1]!.replace(/,/g, ''));
  const unit = match[2]?.toLowerCase();
  if (unit === 'k' || unit === 'thousand') return raw * 1_000;
  if (unit === 'lakh' || unit === 'lac') return raw * 100_000;
  return raw;
}

function escapeForRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Matches whole words only. A plain `includes('phone')` also matches inside
 * "headphones", which put headphones and smartphones into the same result set
 * for a query that only meant one of them.
 */
function parseCategories(query: string): string[] {
  const lower = query.toLowerCase();
  const matched: string[] = [];
  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const isMatch = keywords.some((word) => {
      const pattern = new RegExp(`\\b${escapeForRegex(word)}\\b`, 'i');
      return pattern.test(lower);
    });
    if (isMatch) matched.push(slug);
  }
  return matched;
}

function parseAvailability(query: string): Availability | undefined {
  return /in stock|available now/i.test(query) ? 'in-stock' : undefined;
}

function parseSort(query: string): ProductSortKey {
  const lower = query.toLowerCase();
  if (/cheap|budget|affordable|low.?cost/.test(lower)) return 'price-low';
  if (/best|top|highest rated|recommend/.test(lower)) return 'rating';
  if (/newest|latest|recent/.test(lower)) return 'newest';
  return 'relevance';
}

/**
 * Interprets a query without a language model.
 *
 * This is not a placeholder to be replaced later — it is the permanent
 * fallback. Search must keep working if an AI provider is unreachable, over
 * quota, or simply not configured yet. `interpretQuery` in `route.ts` tries an
 * AI provider first when one is configured, and always falls back to this.
 */
export function interpretQueryWithRules(query: string): SearchInterpretation {
  const trimmed = query.trim();
  const budget = parseBudget(trimmed);
  const categorySlugs = parseCategories(trimmed);
  const availability = parseAvailability(trimmed);
  const sort = parseSort(trimmed);

  const parts: string[] = [];
  if (categorySlugs.length > 0) parts.push(`Showing ${categorySlugs.join(', ')} results`);
  if (budget) parts.push(`under ₹${budget.toLocaleString('en-IN')}`);
  parts.push(`for "${trimmed}"`);
  if (sort === 'rating') parts.push('sorted by rating');
  if (sort === 'price-low') parts.push('sorted by price');

  return {
    summary: parts.join(', ') + '.',
    filters: {
      maxPrice: budget,
      availability,
      categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
    },
    sort,
    categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
    source: 'rule-based',
  };
}
