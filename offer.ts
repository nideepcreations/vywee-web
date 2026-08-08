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
}
