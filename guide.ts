import type { CategoryId } from './category';
import type { Entity, Id, ImageAsset, ISODateString } from './common';
import type { ProductId } from './product';

export type GuideId = Id<'guide'>;

export interface GuideSection {
  readonly heading: string;
  readonly body: string;
}

export interface BuyingGuide extends Entity<'guide'> {
  readonly id: GuideId;
  readonly categoryId: CategoryId;
  readonly excerpt: string;
  readonly cover: ImageAsset;
  readonly author: string;
  readonly readingMinutes: number;
  readonly sections: readonly GuideSection[];
  readonly recommendedProductIds: readonly ProductId[];
  readonly publishedAt: ISODateString;
  readonly updatedAt: ISODateString;
}
