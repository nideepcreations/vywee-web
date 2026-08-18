import Link from 'next/link';
import * as React from 'react';

import type { Brand, Product } from '@/types';

import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Rating } from '@/components/ui/rating';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { PRODUCT_HIGHLIGHT_META, type ProductHighlight } from '@/constants/shopping';
import { AVAILABILITY_META } from '@/constants/shopping';
import { cn } from '@/lib/utils';

import { PriceTag } from './price-tag';

export interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  product: Product;
  /** Shown above the name. Resolve with `getBrandForProduct`. */
  brand?: Brand;
  /**
   * `default` is the grid card. `compact` drops the verdict for dense grids,
   * `horizontal` puts the image beside the text for lists and sidebars.
   */
  layout?: 'default' | 'compact' | 'horizontal';
  /** Set on the first row of an above-the-fold grid only. */
  priority?: boolean;
  /** Correct heading level for the surrounding document outline. */
  headingAs?: 'h2' | 'h3' | 'h4';
  /**
   * Corner badge. Defaults to `editors-pick` when the product carries the
   * flag, so existing call sites keep their behaviour. Pass `none` to suppress
   * it, or another value when the surrounding section supplies the meaning.
   */
  highlight?: ProductHighlight;
}

/**
 * The primary unit of the catalogue.
 *
 * The whole card is clickable, but only the product name is a real link — an
 * overlay stretches its hit area across the card. That keeps one focus stop
 * and one sensible link name per card, instead of the three or four that
 * wrapping every element in an anchor would produce.
 *
 * Everything the card claims is also written in text: the verdict, the
 * availability label and the rating value all read correctly with colour and
 * images unavailable.
 */
function ProductCard({
  product,
  brand,
  layout = 'default',
  priority = false,
  headingAs = 'h3',
  highlight,
  className,
  ...props
}: ProductCardProps) {
  const availability = AVAILABILITY_META[product.availability];
  const resolvedHighlight: ProductHighlight =
    highlight ?? (product.editorsPick ? 'editors-pick' : 'none');
  const highlightMeta =
    resolvedHighlight === 'none' ? undefined : PRODUCT_HIGHLIGHT_META[resolvedHighlight];
  const isHorizontal = layout === 'horizontal';
  const isCompact = layout === 'compact';

  return (
    <Card
      interactive
      padding="none"
      variant="outline"
      className={cn('overflow-hidden', isHorizontal && 'flex-row', className)}
      {...props}
    >
      <div   className={cn(     'relative shrink-0 overflow-hidden bg-muted',     isHorizontal ? 'w-32 sm:w-40' : 'h-48 w-full sm:h-52',   )} >
        <SmartImage
          asset={product.image}
          aspect={isHorizontal ? 'square' : '4/3'}
          priority={priority}
          sizes={
            isHorizontal
              ? '160px'
              : '(min-width: 1280px) 300px, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw'
          }
          containerClassName="h-full"
        />
        {highlightMeta ? (
          <Badge
            variant={highlightMeta.variant}
            size="sm"
            className="absolute top-3 left-3 shadow-xs"
          >
            <Icon name={highlightMeta.icon} size="xs" />
            {highlightMeta.label}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          {brand ? (
            <Text as="span" size="xs" tone="muted" weight="medium" className="uppercase">
              {brand.name}
            </Text>
          ) : null}

          <Heading as={headingAs} level="h4" className="text-base">
            <Link
              href={ROUTES.product(product.slug)}
              className="rounded-xs outline-none after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {product.name}
              <CardLinkOverlay />
            </Link>
          </Heading>
        </div>

        {isCompact ? null : (
          <Text size="sm" tone="muted" className="line-clamp-2">
            {product.verdict.summary}
          </Text>
        )}

        <Rating value={product.rating} count={product.reviewCount} size="sm" />

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <PriceTag band={product.priceBand} size="md" hideCaption={isCompact || isHorizontal} />
          <Text
            as="span"
            size="xs"
            weight="medium"
            className={cn(
              'shrink-0',
              availability.tone === 'success' && 'text-success',
              availability.tone === 'warning' && 'text-warning',
              availability.tone === 'muted-foreground' && 'text-muted-foreground',
            )}
          >
            {availability.label}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export { ProductCard };
