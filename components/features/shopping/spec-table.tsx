import * as React from 'react';

import type { ProductSpec } from '@/types';

import { cn } from '@/lib/utils';

export interface SpecTableProps extends React.HTMLAttributes<HTMLDListElement> {
  specs: readonly ProductSpec[];
}

/**
 * Specifications as a description list rather than a table.
 *
 * These are label/value pairs, not tabular data with row and column headers,
 * so `<dl>` is the honest markup — a screen reader reads "Battery, 38 hours
 * with ANC on" instead of navigating a one-column grid. Values are tabular
 * figures so numbers line up down the page.
 */
function SpecTable({ specs, className, ...props }: SpecTableProps) {
  return (
    <dl className={cn('divide-y divide-border', className)} {...props}>
      {specs.map((spec) => (
        <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
          <dt className="text-sm text-muted-foreground">{spec.label}</dt>
          <dd data-numeric className="text-sm text-foreground">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { SpecTable };
