import type { Entity, Id } from './common';

export type BrandId = Id<'brand'>;

export interface Brand extends Entity<'brand'> {
  readonly id: BrandId;
  readonly tagline: string;
  readonly logoText: string;
  /** Optional: not every real brand in the catalogue has published, verifiable
   *  origin/founding facts — a marketplace-only label may have none. Omit
   *  rather than invent; the brand page hides the row when absent instead of
   *  showing a fabricated value. */
  readonly originCountry?: string;
  readonly foundedYear?: number;
  /** Categories this brand is genuinely known for, by category slug. */
  readonly strongIn: readonly string[];
  readonly featured: boolean;
}
