import Link from 'next/link';
import * as React from 'react';

import type { BuyingGuide, Category } from '@/types';

import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { formatDate, formatReadingTime } from '@/lib/format';
import { cn } from '@/lib/utils';

export interface BuyingGuideCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  guide: BuyingGuide;
  category?: Category;
  /** `featured` gives the guide a wider cover for lead positions. */
  layout?: 'default' | 'featured' | 'compact';
  priority?: boolean;
  headingAs?: 'h2' | 'h3' | 'h4';
  /**
   * Visible read affordance. It is hidden from assistive tech because the card
   * title is already a link to the same guide, and announcing both would give
   * every card two identical links.
   */
  ctaLabel?: string;
}

/**
 * Editorial entry point.
 *
 * Guides are dated in the card because buying advice ages: a reader deciding
 * whether to trust a recommendation needs to know when it was last checked.
 * The `compact` layout drops the cover for sidebars, where a thumbnail adds
 * weight without adding information.
 */
function BuyingGuideCard({
  guide,
  category,
  layout = 'default',
  priority = false,
  headingAs = 'h3',
  ctaLabel,
  className,
  ...props
}: BuyingGuideCardProps) {
  const isCompact = layout === 'compact';
  const isFeatured = layout === 'featured';

  return (
    <Card
      interactive
      variant="outline"
      padding="none"
      className={cn('h-full overflow-hidden', className)}
      {...props}
    >
      {isCompact ? null : (
        <SmartImage
          asset={guide.cover}
          aspect={isFeatured ? '16/9' : '4/3'}
          priority={priority}
          sizes={
            isFeatured
              ? '(min-width: 1024px) 640px, 100vw'
              : '(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw'
          }
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        {category ? (
          <Badge variant="neutral" size="sm" className="self-start">
            {category.name}
          </Badge>
        ) : null}

        <Heading as={headingAs} level={isFeatured ? 'h3' : 'h4'}>
          <Link
            href={ROUTES.guide(guide.slug)}
            className="rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {guide.name}
            <CardLinkOverlay />
          </Link>
        </Heading>

        <Text size="sm" tone="muted" className={cn(isFeatured ? 'line-clamp-3' : 'line-clamp-2')}>
          {guide.excerpt}
        </Text>

        {ctaLabel ? (
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand"
          >
            {ctaLabel}
            <Icon name="goTo" size="sm" />
          </span>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground">
          <span>{guide.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(guide.readingMinutes)}</span>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
          </span>
        </div>
      </div>
    </Card>
  );
}

export { BuyingGuideCard };
