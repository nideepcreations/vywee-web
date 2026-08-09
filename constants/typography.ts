import type { TypographyRole, TypographyStyle } from '@/types/theme';

/**
 * The type scale, expressed as roles rather than sizes.
 *
 * Components choose a role (`body`, `caption`, `overline`) and never a raw
 * size, so retuning the scale is a change here rather than a search across the
 * codebase. Sizes from `xl` upwards are fluid: they interpolate between a
 * phone-sized minimum and a desktop maximum, so no role needs a breakpoint
 * override to be readable on a 360px screen.
 */
export const TYPOGRAPHY: Record<TypographyRole, TypographyStyle> = {
  display: {
    fontFamily: 'display',
    fontSize: '5xl',
    fontWeight: 'extrabold',
    lineHeight: 'tight',
    tracking: 'tighter',
    className: 'font-display text-5xl leading-tight font-extrabold tracking-tighter',
  },
  h1: {
    fontFamily: 'display',
    fontSize: '4xl',
    fontWeight: 'bold',
    lineHeight: 'tight',
    tracking: 'tight',
    className: 'font-display text-4xl leading-tight font-bold tracking-tight',
  },
  h2: {
    fontFamily: 'display',
    fontSize: '3xl',
    fontWeight: 'bold',
    lineHeight: 'tight',
    tracking: 'tight',
    className: 'font-display text-3xl leading-tight font-bold tracking-tight',
  },
  h3: {
    fontFamily: 'display',
    fontSize: '2xl',
    fontWeight: 'semibold',
    lineHeight: 'snug',
    tracking: 'tight',
    className: 'font-display text-2xl leading-snug font-semibold tracking-tight',
  },
  h4: {
    fontFamily: 'display',
    fontSize: 'lg',
    fontWeight: 'semibold',
    lineHeight: 'snug',
    tracking: 'normal',
    className: 'font-display text-lg leading-snug font-semibold',
  },
  lead: {
    fontFamily: 'sans',
    fontSize: 'lg',
    fontWeight: 'regular',
    lineHeight: 'relaxed',
    tracking: 'normal',
    className: 'font-sans text-lg leading-relaxed',
  },
  body: {
    fontFamily: 'sans',
    fontSize: 'base',
    fontWeight: 'regular',
    lineHeight: 'normal',
    tracking: 'normal',
    className: 'font-sans text-base leading-normal',
  },
  bodySmall: {
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'regular',
    lineHeight: 'normal',
    tracking: 'normal',
    className: 'font-sans text-sm leading-normal',
  },
  caption: {
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'snug',
    tracking: 'normal',
    className: 'font-sans text-xs leading-snug',
  },
  overline: {
    fontFamily: 'mono',
    fontSize: '2xs',
    fontWeight: 'medium',
    lineHeight: 'none',
    tracking: 'widest',
    className: 'font-mono text-2xs leading-none font-medium tracking-widest uppercase',
  },
  numeric: {
    fontFamily: 'mono',
    fontSize: 'base',
    fontWeight: 'medium',
    lineHeight: 'snug',
    tracking: 'tight',
    className: 'font-mono text-base leading-snug font-medium tracking-tight tabular-nums',
  },
};

/** Convenience accessor for the class string of a role. */
export function typeClass(role: TypographyRole): string {
  return TYPOGRAPHY[role].className;
}

/**
 * Which font each role uses, and why:
 * - display  Bricolage Grotesque — headlines with an engineered, opinionated voice
 * - sans     Instrument Sans — long-form reading without shouting
 * - mono     JetBrains Mono — prices and specs on a tabular grid
 */
export const FONT_ROLE_VARIABLES = {
  display: '--font-bricolage',
  sans: '--font-instrument',
  mono: '--font-jetbrains',
} as const;
