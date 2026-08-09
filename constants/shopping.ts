import type { Availability, OfferKind } from '@/types';
import type { ColorToken } from '@/types/theme';

import { type IconName } from './icons';

interface OfferKindMeta {
  readonly label: string;
  readonly icon: IconName;
  /** Badge variant. `deal` is reserved for money-saving signals. */
  readonly variant: 'deal' | 'brand' | 'accent' | 'neutral';
}

/**
 * Display metadata for each offer kind. Keeping labels here rather than in the
 * component means the wording of "Bank offer" is decided once, and the same
 * string appears wherever offers surface.
 */
export const OFFER_KIND_META = {
  coupon: { label: 'Coupon', icon: 'category', variant: 'deal' },
  'bank-offer': { label: 'Bank offer', icon: 'deal', variant: 'brand' },
  'price-drop': { label: 'Price drop', icon: 'priceDrop', variant: 'deal' },
  bundle: { label: 'Bundle', icon: 'add', variant: 'accent' },
  exchange: { label: 'Exchange', icon: 'retry', variant: 'accent' },
} as const satisfies Record<OfferKind, OfferKindMeta>;

interface AvailabilityMeta {
  readonly label: string;
  /** Text colour token. Availability is never signalled by colour alone. */
  readonly tone: Extract<ColorToken, 'success' | 'warning' | 'muted-foreground'>;
}

export const AVAILABILITY_META = {
  'in-stock': { label: 'In stock', tone: 'success' },
  limited: { label: 'Low stock', tone: 'warning' },
  'out-of-stock': { label: 'Out of stock', tone: 'muted-foreground' },
} as const satisfies Record<Availability, AvailabilityMeta>;

/**
 * Corner badge on a product card. `vywee-choice` is the recommendation mark;
 * `editors-pick` is the older editorial flag carried on the product itself.
 */
export type ProductHighlight = 'none' | 'editors-pick' | 'vywee-choice' | 'trending';

interface ProductHighlightMeta {
  readonly label: string;
  readonly icon: IconName;
  readonly variant: 'brand' | 'accent' | 'deal' | 'neutral';
}

export const PRODUCT_HIGHLIGHT_META = {
  'editors-pick': { label: "Editors' pick", icon: 'editorsPick', variant: 'brand' },
  'vywee-choice': { label: 'Vywee Choice', icon: 'verified', variant: 'brand' },
  trending: { label: 'Trending', icon: 'trending', variant: 'accent' },
} as const satisfies Record<Exclude<ProductHighlight, 'none'>, ProductHighlightMeta>;

/** Maximum stars on the rating scale. */
export const RATING_MAX = 5;
