/**
 * Mirrors the `--breakpoint-*` values in globals.css.
 * Use these for JavaScript media queries so CSS and JS never disagree.
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const mediaQuery = {
  up: (key: Breakpoint) => `(min-width: ${BREAKPOINTS[key]}px)`,
  down: (key: Breakpoint) => `(max-width: ${BREAKPOINTS[key] - 0.02}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  pointerCoarse: '(pointer: coarse)',
} as const;
