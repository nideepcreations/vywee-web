/**
 * Theme contract. These unions are the compile-time mirror of the CSS custom
 * properties in styles/tokens.css — the runtime mirrors in constants/ assert
 * themselves against these types with `satisfies`, so a token added to one
 * layer and forgotten in the other is a type error.
 */

/** What the user chose. `system` defers to the OS preference. */
export type ThemeMode = 'light' | 'dark' | 'system';

/** What is actually painted. `system` has been resolved away. */
export type ResolvedTheme = 'light' | 'dark';

export type SurfaceToken =
  | 'background'
  | 'foreground'
  | 'surface'
  | 'surface-foreground'
  | 'surface-hover'
  | 'elevated'
  | 'elevated-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'muted-hover';

export type LineToken = 'border' | 'border-strong' | 'input' | 'input-hover' | 'ring';

export type BrandToken =
  | 'brand'
  | 'brand-hover'
  | 'brand-active'
  | 'brand-subtle'
  | 'brand-subtle-hover'
  | 'brand-foreground'
  | 'brand-on-subtle';

export type AccentToken =
  'accent' | 'accent-hover' | 'accent-subtle' | 'accent-foreground' | 'accent-on-subtle';

export type HighlightToken =
  | 'highlight'
  | 'highlight-strong'
  | 'highlight-subtle'
  | 'highlight-foreground'
  | 'highlight-on-subtle';

export type StatusRole = 'success' | 'warning' | 'danger' | 'info';

export type StatusToken =
  StatusRole | `${StatusRole}-subtle` | `${StatusRole}-foreground` | `${StatusRole}-on-subtle`;

export type OverlayToken = 'overlay' | 'scrim';

export type ColorToken =
  SurfaceToken | LineToken | BrandToken | AccentToken | HighlightToken | StatusToken | OverlayToken;

export type RadiusToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'pill';

export type ShadowToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';

export type SpaceToken =
  | 'gutter'
  | 'gutterLg'
  | 'stack'
  | 'block'
  | 'section'
  | 'sectionLg'
  | 'containerMax'
  | 'containerProse'
  | 'headerHeight'
  | 'tapTarget';

export type FontFamilyToken = 'display' | 'sans' | 'mono';

export type FontSizeToken =
  '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export type FontWeightToken = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export type LineHeightToken = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed';

export type TrackingToken = 'tighter' | 'tight' | 'normal' | 'wide' | 'widest';

export type MeasureToken = 'tight' | 'base' | 'wide';

/** Named roles in the type scale. Components pick a role, never a raw size. */
export type TypographyRole =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'lead'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'overline'
  | 'numeric';

export interface TypographyStyle {
  readonly fontFamily: FontFamilyToken;
  readonly fontSize: FontSizeToken;
  readonly fontWeight: FontWeightToken;
  readonly lineHeight: LineHeightToken;
  readonly tracking: TrackingToken;
  /** Tailwind classes that reproduce this role, for use with `cn`. */
  readonly className: string;
}

export type DurationToken = 'instant' | 'fast' | 'base' | 'slow' | 'slower';

export type EasingToken = 'standard' | 'entrance' | 'exit' | 'linear';

export type AnimationToken =
  'fade-in' | 'fade-up' | 'scale-in' | 'overlay-in' | 'sheet-left' | 'sheet-right' | 'shimmer';

export type ZIndexToken = 'base' | 'sticky' | 'header' | 'overlay' | 'modal' | 'toast';

export type IconSizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
