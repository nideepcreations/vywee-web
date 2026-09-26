import type { BrandId } from './brand';
import type { CategoryId } from './category';
import type { Entity, Id, ImageAsset, ISODateString, PriceBand, Rating } from './common';

export type ProductId = Id<'product'>;

export type Availability = 'in-stock' | 'limited' | 'out-of-stock';

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface ProductVerdict {
  /** One line a reader can act on without reading the full review. */
  readonly summary: string;
  readonly pros: readonly string[];
  readonly cons: readonly string[];
  readonly bestFor: string;
}

export interface Product extends Entity<'product'> {
  readonly id: ProductId;
  readonly brandId: BrandId;
  readonly categoryId: CategoryId;
  readonly headline: string;
  /** The single representative shot, used in cards, search results and the
   *  social card. Always present. */
  readonly image: ImageAsset;
  /** Optional: the remaining views a retailer publishes — back, detail,
   *  fabric close-up. Shown only on the product page, where someone deciding
   *  whether a shirt's print actually looks right needs more than one angle.
   *  `image` is the first frame; these follow it. */
  readonly gallery?: readonly ImageAsset[];
  readonly priceBand: PriceBand;
  readonly rating: Rating;
  /** Optional: a listing shows a star rating without ever stating how many
   *  ratings produced it. Inventing a count to fill this field would be a
   *  fabricated number on a page whose whole claim is that its numbers are
   *  checked, so it stays absent instead. `Rating` hides the count when it
   *  is missing, and the product's structured data omits the rating block
   *  entirely rather than publishing an incomplete one. */
  readonly reviewCount?: number;
  readonly availability: Availability;
  readonly specs: readonly ProductSpec[];
  readonly verdict: ProductVerdict;
  readonly tags: readonly string[];
  readonly editorsPick: boolean;
  readonly updatedAt: ISODateString;
}
