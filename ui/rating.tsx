import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';
import * as React from 'react';

import { ICON_SIZE, ICON_STROKE_BY_SIZE } from '@/constants/icons';
import { RATING_MAX } from '@/constants/shopping';
import { cn } from '@/lib/utils';

const ratingVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-1.5 text-xs',
      md: 'gap-2 text-sm',
      lg: 'gap-2.5 text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

const STAR_SIZE = { sm: 'xs', md: 'sm', lg: 'md' } as const;

export interface RatingProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof ratingVariants> {
  /** Score on a 0–5 scale. Values outside the range are clamped. */
  value: number;
  max?: number;
  /** Number of reviews behind the score, if known. */
  count?: number;
  /** Hides the numeric score, leaving stars only. */
  hideValue?: boolean;
  /** Formats the review count, e.g. `2.8K`. */
  formatCount?: (count: number) => string;
}

/**
 * Star rating.
 *
 * The stars are decorative: the whole control is a single `role="img"` with a
 * text alternative, so a screen reader announces "4.6 out of 5 from 2,814
 * reviews" once rather than reading five separate star glyphs. The numeric
 * score is also shown visually, so the rating never depends on counting
 * partially filled shapes.
 */
function Rating({
  value,
  max = RATING_MAX,
  count,
  size = 'md',
  hideValue = false,
  formatCount,
  className,
  ...props
}: RatingProps) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percent = (safeValue / max) * 100;
  const starToken = STAR_SIZE[size ?? 'md'];
  const starPx = ICON_SIZE[starToken];
  const stroke = ICON_STROKE_BY_SIZE[starToken];
  const displayValue = safeValue.toFixed(1);

  const label =
    count === undefined
      ? `${displayValue} out of ${max}`
      : `${displayValue} out of ${max} from ${count.toLocaleString('en-IN')} reviews`;

  const stars = Array.from({ length: max }, (_, index) => index);

  return (
    <div
      className={cn(ratingVariants({ size }), className)}
      role="img"
      aria-label={label}
      {...props}
    >
      <span className="relative inline-flex shrink-0" aria-hidden="true">
        <span className="inline-flex text-border-strong">
          {stars.map((index) => (
            <Star key={index} size={starPx} strokeWidth={stroke} absoluteStrokeWidth />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 inline-flex overflow-hidden text-highlight"
          style={{ width: `${percent}%` }}
        >
          {stars.map((index) => (
            <Star
              key={index}
              size={starPx}
              strokeWidth={stroke}
              absoluteStrokeWidth
              fill="currentColor"
              className="shrink-0"
            />
          ))}
        </span>
      </span>

      {hideValue ? null : (
        <span className="inline-flex items-baseline gap-1" aria-hidden="true">
          <span data-numeric className="font-semibold text-foreground">
            {displayValue}
          </span>
          {count === undefined ? null : (
            <span className="text-muted-foreground">
              ({formatCount ? formatCount(count) : count.toLocaleString('en-IN')})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export { Rating, ratingVariants };
