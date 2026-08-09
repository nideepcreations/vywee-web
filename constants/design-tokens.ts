import type {
  ColorToken,
  DurationToken,
  EasingToken,
  FontWeightToken,
  RadiusToken,
  ShadowToken,
  SpaceToken,
  ZIndexToken,
} from '@/types/theme';

/**
 * Typed mirror of styles/tokens.css.
 *
 * CSS stays the source of truth for rendering. This module exists so
 * TypeScript can reference tokens where classes cannot reach — SVG fills,
 * canvas, chart libraries, Framer Motion values and tests — without literal
 * values being copied around the codebase.
 *
 * Each map is asserted against the union in types/theme.ts, so adding a token
 * to only one of the two layers fails the build.
 */

/* ---------------------------------------------------------------- colour */

export const COLOR_TOKENS = [
  'background',
  'foreground',
  'surface',
  'surface-foreground',
  'surface-hover',
  'elevated',
  'elevated-foreground',
  'muted',
  'muted-foreground',
  'muted-hover',
  'border',
  'border-strong',
  'input',
  'input-hover',
  'ring',
  'brand',
  'brand-hover',
  'brand-active',
  'brand-subtle',
  'brand-subtle-hover',
  'brand-foreground',
  'brand-on-subtle',
  'accent',
  'accent-hover',
  'accent-subtle',
  'accent-foreground',
  'accent-on-subtle',
  'highlight',
  'highlight-strong',
  'highlight-subtle',
  'highlight-foreground',
  'highlight-on-subtle',
  'success',
  'success-subtle',
  'success-foreground',
  'success-on-subtle',
  'warning',
  'warning-subtle',
  'warning-foreground',
  'warning-on-subtle',
  'danger',
  'danger-subtle',
  'danger-foreground',
  'danger-on-subtle',
  'info',
  'info-subtle',
  'info-foreground',
  'info-on-subtle',
  'overlay',
  'scrim',
] as const satisfies readonly ColorToken[];

/**
 * Resolves a semantic colour to a CSS value that follows the active theme.
 * Use in inline SVG, canvas and chart configs — never in `className`.
 */
export function colorVar(token: ColorToken): string {
  return `var(--${token})`;
}

/** Ordered palette for data visualisation. Distinguishable in both themes. */
export const CHART_SERIES = [
  'brand',
  'accent',
  'highlight',
  'success',
  'danger',
  'info',
] as const satisfies readonly ColorToken[];

/* ---------------------------------------------------------------- radius */

export const RADIUS = {
  none: '0px',
  xs: '0.25rem',
  sm: '0.375rem',
  md: '0.625rem',
  lg: '0.875rem',
  xl: '1.25rem',
  '2xl': '1.75rem',
  pill: '9999px',
} as const satisfies Record<RadiusToken, string>;

/* --------------------------------------------------------------- spacing */

/** Base step of the numeric scale: `p-4` is 4 × this value. */
export const SPACING_STEP = '0.25rem';

export const SPACE = {
  gutter: 'var(--space-gutter)',
  gutterLg: 'var(--space-gutter-lg)',
  stack: 'var(--space-stack)',
  block: 'var(--space-block)',
  section: 'var(--space-section)',
  sectionLg: 'var(--space-section-lg)',
  containerMax: 'var(--container-max)',
  containerProse: 'var(--container-prose)',
  headerHeight: 'var(--header-height)',
  tapTarget: 'var(--tap-target)',
} as const satisfies Record<SpaceToken, string>;

/** Minimum touch target in pixels. Above the WCAG 2.2 minimum of 44. */
export const TAP_TARGET_PX = 48;

/* ------------------------------------------------------------- elevation */

export const SHADOW = {
  none: 'var(--vy-shadow-none)',
  xs: 'var(--vy-shadow-xs)',
  sm: 'var(--vy-shadow-sm)',
  md: 'var(--vy-shadow-md)',
  lg: 'var(--vy-shadow-lg)',
  xl: 'var(--vy-shadow-xl)',
  inner: 'var(--vy-shadow-inner)',
} as const satisfies Record<ShadowToken, string>;

/** Which elevation a surface type uses. Keeps stacking predictable. */
export const ELEVATION_ROLE = {
  flat: 'none',
  raised: 'xs',
  card: 'sm',
  cardHover: 'md',
  popover: 'lg',
  modal: 'xl',
} as const satisfies Record<string, ShadowToken>;

/* ---------------------------------------------------------------- motion */

export const DURATION_MS = {
  instant: 80,
  fast: 150,
  base: 240,
  slow: 380,
  slower: 600,
} as const satisfies Record<DurationToken, number>;

export const EASING = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  linear: 'linear',
} as const satisfies Record<EasingToken, string>;

/* --------------------------------------------------------------- weights */

export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const satisfies Record<FontWeightToken, number>;

/* -------------------------------------------------------------- layering */

export const Z_INDEX = {
  base: 0,
  sticky: 20,
  header: 40,
  overlay: 50,
  modal: 60,
  toast: 70,
} as const satisfies Record<ZIndexToken, number>;
