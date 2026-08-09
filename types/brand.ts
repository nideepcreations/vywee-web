import type { Entity, Id } from './common';

export type BrandId = Id<'brand'>;

export interface Brand extends Entity<'brand'> {
  readonly id: BrandId;
  readonly tagline: string;
  readonly logoText: string;
  readonly originCountry: string;
  readonly foundedYear: number;
  /** Categories this brand is genuinely known for, by category slug. */
  readonly strongIn: readonly string[];
  readonly featured: boolean;
}
