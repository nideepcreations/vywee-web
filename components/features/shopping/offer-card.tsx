import Link from 'next/link';
import * as React from 'react';

import type { Brand, Offer } from '@/types';

import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

import { OfferBadge } from './offer-badge';

export interface OfferCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  offer: Offer;
  brand?: Brand;
  headingAs?: 'h2' | 'h3' | 'h4';
  /** Marks an offer as ending soon. Resolve on the server to avoid drift. */
  endingSoon?: boolean;
  /**
   * Where the card links. Defaults to the offers index; pass the detail page
   * of the product an offer applies to so the card leads somewhere specific.
   */
  href?: string;
}

/**
 * A live saving on one or more tracked products.
 *
 * Expiry is rendered as an absolute date rather than a live countdown: a
 * relative string computed at render time differs between server and client
 * and produces a hydration mismatch, and "ends 11 Aug" is what a reader can
 * actually plan around.
 *
 * The coupon code is marked up as `<code>` so assistive tech announces it
 * character by character instead of attempting to pronounce it as a word.
 */
function OfferCard({
  offer,
  brand,
  headingAs = 'h3',
  endingSoon = false,
  href = ROUTES.offers,
  className,
  ...props
}: OfferCardProps) {
  return (
    <Card
      interactive
      variant="outline"
      padding="md"
      className={cn('h-full gap-3', className)}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">
        <OfferBadge kind={offer.kind} offer={offer} size="sm" />
        {endingSoon ? (
          <Text as="span" size="xs" weight="medium" className="text-warning">
            Ending soon
          </Text>
        ) : null}
      </div>

      <Heading as={headingAs} level="h4">
        <Link
          href={href}
          className="rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {offer.name}
          <CardLinkOverlay />
        </Link>
      </Heading>

      <Text size="sm" tone="muted">
        {offer.description}
      </Text>

      {offer.code ? (
        <div className="flex items-center gap-2 rounded-md border border-dashed border-input bg-surface px-3 py-2">
          <Icon name="deal" size="sm" tone="muted" />
          <Text as="span" size="xs" tone="muted">
            Code
          </Text>
          <code data-numeric className="text-sm font-semibold tracking-wide text-foreground">
            {offer.code}
          </code>
        </div>
      ) : null}

      <dl className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Retailer</dt>
          <dd>{brand ? `${brand.name} · ${offer.retailer}` : offer.retailer}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Ends</dt>
          <dd>
            Ends <time dateTime={offer.expiresAt}>{formatDate(offer.expiresAt)}</time>
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export { OfferCard };
