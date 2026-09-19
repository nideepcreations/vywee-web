import type { LucideIcon } from 'lucide-react';

import type { Entity, Id } from './common';

export type CategoryId = Id<'category'>;

export interface Category extends Entity<'category'> {
  readonly id: CategoryId;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly productCount: number;
  readonly featured: boolean;
  readonly parentId?: CategoryId;
}
