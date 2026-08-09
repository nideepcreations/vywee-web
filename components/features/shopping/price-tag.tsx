import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import type { PriceBand } from '@/types';

import { Icon } from '@/components/ui/icon';
import { formatMoney, formatPriceBand } from '@/lib/format';
import { cn } from '@/lib/utils';

const priceTagVariants = cva('inline-flex flex-col gap-0.5', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface PriceTagProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof priceTagVariants> {
  band: PriceBand;
  /** Shows the full figures instead of compact notation (₹24,990 vs ₹25K). */
  exact?: boolean;
  /** Renders a strikethrough reference price above the band. */
  wasPrice?: number;
  /** Hides the "Price range" caption on dense surfaces. */
  hideCaption?: boolean;
  /** Marks the price as a tracked drop. Adds an icon, not just colour. */
  isDrop?: boolean;
}

/**
 * Renders a price band rather than a single figure.
 *
 * Affiliate prices move several times a day, so Vywee shows the range it has
 * tracked across retailers. A stale exact number costs more trust than an
 * honest range, and the caption says so plainly.
 *
 * Figures are tabular (`data-numeric`), so prices stacked in a grid stay on a
 * shared vertical rhythm instead of jittering column to column.
 */
function PriceTag({
  band,
  size = 'md',
  exact = false,
  wasPrice,
  hideCaption = false,
  isDrop = false,
  className,
  ...props
}: PriceTagProps) {
  const price = formatPriceBand(band, { compact: !exact });
  const isRange = band.min !== band.max;

  return (
    <div className={cn(priceTagVariants({ size }), className)} {...props}>
      {wasPrice === undefined ? null : (
        <span
          data-numeric
          className="text-xs text-muted-foreground line-through decoration-from-font"
        >
          {formatMoney({ amount: wasPrice, currency: band.currency }, { compact: !exact })}
        </span>
      )}

      <span className="inline-flex items-center gap-1.5">
        {isDrop ? <Icon name="priceDrop" size="sm" tone="highlight" /> : null}
        <span
          data-numeric
          className={cn('font-semibold text-foreground', isDrop && 'text-highlight-on-subtle')}
        >
          {price}
        </span>
      </span>

      {hideCaption || !isRange ? null : (
        <span className="text-2xs text-muted-foreground">Tracked range across retailers</span>
      )}
    </div>
  );
}

export { PriceTag, priceTagVariants };
