import Link from 'next/link';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface FilterOption {
  readonly label: string;
  readonly value: string;
  readonly count?: number;
}

export interface FilterChipsProps {
  /** Accessible name for the group, e.g. "Filter by category". */
  legend: string;
  basePath: string;
  /** Query key this group writes to. */
  paramKey: string;
  options: readonly FilterOption[];
  active?: string;
  preserve?: Record<string, string | undefined>;
  className?: string;
}

function buildHref(
  basePath: string,
  paramKey: string,
  value: string | undefined,
  preserve: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  for (const [key, entry] of Object.entries(preserve)) {
    if (entry && key !== paramKey) params.set(key, entry);
  }
  if (value) params.set(paramKey, value);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

/**
 * Single-select filtering, expressed as links.
 *
 * The active chip links back to the unfiltered URL, so the same control both
 * applies and clears the filter — one focus stop per option instead of a
 * separate "clear" affordance.
 */
function FilterChips({
  legend,
  basePath,
  paramKey,
  options,
  active,
  preserve = {},
  className,
}: FilterChipsProps) {
  const labelId = `${paramKey}-filter-label`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span id={labelId} className="text-sm text-muted-foreground">
        {legend}
      </span>
      <ul aria-labelledby={labelId} className="flex flex-wrap gap-1.5">
        <li>
          <Link
            href={buildHref(basePath, paramKey, undefined, preserve)}
            aria-current={active ? undefined : 'true'}
            scroll={false}
            className={cn(
              'tap-target inline-flex min-h-11 items-center rounded-pill border px-3 text-sm',
              'transition-colors duration-fast ease-standard',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              active
                ? 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground'
                : 'border-transparent bg-brand font-medium text-brand-foreground',
            )}
          >
            All
          </Link>
        </li>
        {options.map((option) => {
          const isActive = option.value === active;
          return (
            <li key={option.value}>
              <Link
                href={buildHref(basePath, paramKey, isActive ? undefined : option.value, preserve)}
                aria-current={isActive ? 'true' : undefined}
                scroll={false}
                className={cn(
                  'tap-target inline-flex min-h-11 items-center gap-1.5 rounded-pill border px-3 text-sm',
                  'transition-colors duration-fast ease-standard',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive
                    ? 'border-transparent bg-brand font-medium text-brand-foreground'
                    : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                )}
              >
                {option.label}
                {option.count === undefined ? null : (
                  <span data-numeric className="opacity-70">
                    {option.count}
                  </span>
                )}
                {isActive ? <Icon name="close" size="xs" aria-hidden /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { FilterChips };
