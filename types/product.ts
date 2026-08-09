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
  readonly image: ImageAsset;
  readonly priceBand: PriceBand;
  readonly rating: Rating;
  readonly reviewCount: number;
  readonly availability: Availability;
  readonly specs: readonly ProductSpec[];
  readonly verdict: ProductVerdict;
  readonly tags: readonly string[];
  readonly editorsPick: boolean;
  readonly updatedAt: ISODateString;
}
