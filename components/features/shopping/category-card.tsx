import Link from 'next/link';
import * as React from 'react';

import type { Category } from '@/types';

import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

export interface CategoryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  category: Category;
  /** `tile` is the compact icon-and-name form for navigation strips. */
  layout?: 'default' | 'tile';
  headingAs?: 'h2' | 'h3' | 'h4';
}

/**
 * Entry point into a category.
 *
 * The count is stated as tracked products rather than a bare number, because
 * "142" beside a category name is ambiguous — it could be results, brands or
 * deals. The icon is decorative; the name carries the meaning.
 */
function CategoryCard({
  category,
  layout = 'default',
  headingAs = 'h3',
  className,
  ...props
}: CategoryCardProps) {
  const isTile = layout === 'tile';

  return (
    <Card
      interactive
      variant="outline"
      padding={isTile ? 'sm' : 'md'}
      className={cn('h-full gap-3', isTile && 'items-center text-center', className)}
      {...props}
    >
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-md bg-brand-subtle text-brand-on-subtle',
          'transition-colors duration-fast ease-standard group-hover:bg-brand-subtle-hover',
        )}
      >
        <Icon icon={category.icon} size="md" />
      </span>

      <Heading as={headingAs} level="h4" className={cn(isTile && 'text-sm')}>
        <Link
          href={ROUTES.category(category.slug)}
          className="rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {category.name}
          <CardLinkOverlay />
        </Link>
      </Heading>

      {isTile ? null : (
        <Text size="sm" tone="muted" className="line-clamp-2">
          {category.description}
        </Text>
      )}

      <Text as="span" size="xs" tone="muted" className="mt-auto">
        <span data-numeric>{formatNumber(category.productCount)}</span> products tracked
      </Text>
    </Card>
  );
}

export { CategoryCard };
