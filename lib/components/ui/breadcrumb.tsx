import Link from 'next/link';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface Crumb {
  readonly label: string;
  /** Omit on the final crumb — the current page is not a link. */
  readonly href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: readonly Crumb[];
}

/**
 * Trail to the current page.
 *
 * The last item is plain text carrying `aria-current="page"` rather than a
 * link to where the reader already is, and the separators are hidden from
 * assistive tech so the trail is not read as punctuation.
 */
function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-xs transition-colors duration-fast hover:text-foreground',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}
              {isLast ? null : <Icon name="chevronRight" size="xs" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumb };
