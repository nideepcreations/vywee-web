import Link from 'next/link';
import * as React from 'react';

import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

/**
 * Geometry of the mark, at a 32-unit grid.
 *
 * Two strokes: a V, and a stem dropping from its vertex. The V *is* the top of
 * the Y, so the two letters share the same three points rather than sitting
 * side by side — that shared vertex is the whole idea. Round caps and joins
 * keep the junction from spiking at small sizes.
 *
 * The 4.2 stroke is deliberately heavy: at 16px anything thinner loses the
 * stem and the mark reads as a plain V. The stem runs past the arms'
 * midpoint for the same reason — a shorter one blurs into the junction at
 * favicon size and the Y stops being legible.
 *
 * The glyph fills roughly 79% of the viewBox. That is deliberate: a smaller
 * glyph leaves dead space inside the SVG box, which reads as an unintended
 * gap between the mark and the wordmark.
 */
const MARK_PATH = 'M5.5 6.5 L16 17.5 L26.5 6.5 M16 17.5 L16 27.5';
const MARK_STROKE_WIDTH = 4.2;

/** Default gradient id. See `gradientId` on LogoMarkProps for when to override. */
const DEFAULT_GRADIENT_ID = 'vywee-brand-gradient';

export interface LogoMarkProps extends Omit<React.SVGProps<SVGSVGElement>, 'viewBox'> {
  className?: string;
  /**
   * Accessible name. Defaults to none: the mark is decorative wherever it sits
   * beside the wordmark, which is the usual case.
   */
  label?: string;
  /**
   * SVG gradient ids are document-global. The default is shared, which is
   * harmless while every instance defines an identical gradient — override it
   * only if a page needs a mark with different stops.
   */
  gradientId?: string;
}

/**
 * Symbol only: the merged V/Y mark.
 *
 * The gradient stops come from `--brand-gradient-from` / `--brand-gradient-to`,
 * so the mark follows the theme — both stops lift in dark mode, because the
 * light pair reads as a dark smudge against the near-black background.
 */
function LogoMark({ className, label, gradientId = DEFAULT_GRADIENT_ID, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('size-8 shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--brand-gradient-from)" />
          <stop offset="1" stopColor="var(--brand-gradient-to)" />
        </linearGradient>
      </defs>
      <path
        d={MARK_PATH}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={MARK_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface LogoProps {
  className?: string;
  /** Hides the wordmark and keeps only the mark, for tight spaces. */
  markOnly?: boolean;
  href?: string;
}

/**
 * Full lockup: mark plus wordmark, linked to the homepage.
 *
 * The wordmark stays the display face at the site's own weight and tracking
 * rather than becoming an image, so it inherits the theme's text colour, scales
 * with the type system and remains selectable text for search engines.
 */
function Logo({ className, markOnly = false, href = ROUTES.home }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
        className,
      )}
    >
      <LogoMark />
      {markOnly ? (
        <span className="sr-only">{SITE.name}</span>
      ) : (
        <span className="font-display text-xl font-extrabold tracking-tighter text-foreground">
          {SITE.name}
        </span>
      )}
    </Link>
  );
}

export { Logo, LogoMark, MARK_PATH, MARK_STROKE_WIDTH };
