import type { BrandId } from './brand';
import type { Entity, Id, ISODateString } from './common';
import type { ProductId } from './product';

export type OfferId = Id<'offer'>;

export type OfferKind = 'coupon' | 'bank-offer' | 'price-drop' | 'bundle' | 'exchange';

export interface Offer extends Entity<'offer'> {
  readonly id: OfferId;
  readonly kind: OfferKind;
  readonly retailer: string;
  readonly description: string;
  readonly discountPercent?: number;
  readonly flatDiscount?: number;
  readonly code?: string;
  readonly brandId?: BrandId;
  readonly productIds: readonly ProductId[];
  readonly startsAt: ISODateString;
  readonly expiresAt: ISODateString;
  /** Optional: the real destination a shopper lands on to actually buy —
   *  typically an affiliate-tracked retailer link. Nothing in the catalogue
   *  had this field until the first real (non-mock) product needed it, so it
   *  stays optional rather than forcing every existing mock offer to grow a
   *  fake URL. `OfferCard` only renders an external "Buy at ..." link when
   *  this is present; otherwise it falls back to the internal offers page,
   *  exactly as it always has. */
  readonly buyUrl?: string;
}
