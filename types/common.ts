import type { LucideIcon } from 'lucide-react';

/** Branded identifier so a ProductId can never be passed where a BrandId is expected. */
export type Id<TEntity extends string> = string & { readonly __entity: TEntity };

export type Slug = string;

export type ISODateString = string;

/** Every catalogue entity shares this shape, which keeps list rendering generic. */
export interface Entity<TEntity extends string> {
  readonly id: Id<TEntity>;
  readonly slug: Slug;
  readonly name: string;
}

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Tiny base64 placeholder used while the full image streams in. */
  readonly blurDataURL?: string;
}

export interface LinkItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly external?: boolean;
}

export interface NavGroup {
  readonly title: string;
  readonly items: readonly LinkItem[];
}

export type Currency = 'INR' | 'USD' | 'GBP';

export interface Money {
  readonly amount: number;
  readonly currency: Currency;
}

/**
 * Vywee shows a band rather than a hard price: affiliate prices move hourly and
 * a stale number is worse than an honest range.
 */
export interface PriceBand {
  readonly min: number;
  readonly max: number;
  readonly currency: Currency;
}

export type Rating = number;

export interface Paginated<TItem> {
  readonly items: readonly TItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
}

export type AsyncState = 'idle' | 'loading' | 'success' | 'error';
