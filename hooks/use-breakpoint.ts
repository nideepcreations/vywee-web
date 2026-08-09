'use client';

import { mediaQuery, type Breakpoint } from '@/constants/breakpoints';

import { useMediaQuery } from './use-media-query';

/** True once the viewport is at or above the given breakpoint. */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(mediaQuery.up(breakpoint));
}
