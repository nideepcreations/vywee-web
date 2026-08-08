'use client';

import { mediaQuery } from '@/constants/breakpoints';

import { useMediaQuery } from './use-media-query';

/**
 * Motion components read this before animating. Respecting it is a hard
 * accessibility requirement, not an enhancement.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(mediaQuery.reducedMotion);
}
