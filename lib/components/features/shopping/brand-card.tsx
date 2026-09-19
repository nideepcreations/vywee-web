import Link from 'next/link';
import * as React from 'react';

import type { Brand } from '@/types';

import { Badge } from '@/components/ui/badge';
import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export interface BrandCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  brand: Brand;
  /** Categories this brand is known for, resolved to display names. */
  categoryNames?: readonly string[];
  productCount?: number;
  headingAs?: 'h2' | 'h3' | 'h4';
}

/**
 * A brand at a glance.
 *
 * The monogram is a typographic mark rather than a logo image: real brand
 * logos are licensed assets, and a placeholder image would imply we have one.
 * It is `aria-hidden` because the brand name sits right beside it.
 */
function BrandCard({
  brand,
  categoryNames,
  productCount,
  headingAs = 'h3',
  className,
  ...props
}: BrandCardProps) {
  return (
    <Card
      interactive
      variant="outline"
      padding="md"
      className={cn('h-full gap-3', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-subtle font-display text-sm font-bold text-brand-on-subtle"
        >
          {brand.logoText}
        </span>
        <div className="flex min-w-0 flex-col">
          <Heading as={headingAs} level="h4" className="text-base">
            <Link
              href={ROUTES.brand(brand.slug)}
              className="rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {brand.name}
              <CardLinkOverlay />
            </Link>
          </Heading>
          <Text as="span" size="xs" tone="muted">
            {brand.originCountry} · since <span data-numeric>{brand.foundedYear}</span>
          </Text>
        </div>
      </div>

      <Text size="sm" tone="muted" className="line-clamp-2">
        {brand.tagline}
      </Text>

      {categoryNames && categoryNames.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {categoryNames.map((name) => (
            <li key={name}>
              <Badge variant="neutral" size="sm">
                {name}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      {productCount === undefined ? null : (
        <Text as="span" size="xs" tone="muted" className="mt-auto">
          <span data-numeric>{productCount}</span> {productCount === 1 ? 'product' : 'products'}{' '}
          tracked
        </Text>
      )}
    </Card>
  );
}

export { BrandCard };
