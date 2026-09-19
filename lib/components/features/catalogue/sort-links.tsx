import Link from 'next/link';
import * as React from 'react';

import { PRODUCT_SORT_KEYS, SORT_LABELS, type ProductSortKey } from '@/lib/catalogue';
import { cn } from '@/lib/utils';

export interface SortLinksProps {
  /** Route the links point at, without a query string. */
  basePath: string;
  active: ProductSortKey;
  /** Query parameters to preserve when the sort changes. */
  preserve?: Record<string, string | undefined>;
  className?: string;
}

function buildHref(
  basePath: string,
  sort: ProductSortKey,
  preserve: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(preserve)) {
    if (value) params.set(key, value);
  }
  if (sort !== 'relevance') params.set('sort', sort);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

/**
 * Sorting as links rather than a select.
 *
 * Each order is a real, shareable, crawlable URL, the page stays a server
 * component, and sorting works with JavaScript unavailable. A `<select>` would
 * need client state and would not survive being copied out of the address bar.
 */
function SortLinks({ basePath, active, preserve = {}, className }: SortLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span id="sort-label" className="text-sm text-muted-foreground">
        Sort by
      </span>
      <ul aria-labelledby="sort-label" className="flex flex-wrap gap-1.5">
        {PRODUCT_SORT_KEYS.map((key) => {
          const isActive = key === active;
          return (
            <li key={key}>
              <Link
                href={buildHref(basePath, key, preserve)}
                aria-current={isActive ? 'true' : undefined}
                scroll={false}
                className={cn(
                  'tap-target inline-flex min-h-11 items-center rounded-pill border px-3 text-sm',
                  'transition-colors duration-fast ease-standard',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive
                    ? 'border-transparent bg-brand font-medium text-brand-foreground'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                )}
              >
                {SORT_LABELS[key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { SortLinks };
