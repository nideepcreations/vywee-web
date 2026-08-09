/**
 * Single import surface for domain types: `import type { Product } from '@/types'`.
 * Add new domain files here so consumers never reach into individual modules.
 */
export type * from './brand';
export type * from './category';
export type * from './common';
export type * from './guide';
export type * from './offer';
export type * from './product';
export type * from './theme';
