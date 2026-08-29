import Link from 'next/link';
import * as React from 'react';

import type { Category } from '@/types';

import { Card, CardLinkOverlay } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

/** Bold fill rotation for `tile` layout. All four pairs are pre-verified
 *  accessible (white/dark text chosen per token, not assumed). */
const TILE_TONES = ['brand', 'accent', 'highlight', 'success'] as const;
export type CategoryTileTone = (typeof TILE_TONES)[number];

const TILE_TONE_CLASSES: Record<CategoryTileTone, string> = {
  brand: 'bg-brand text-brand-foreground',
  accent: 'bg-accent text-accent-foreground',
  highlight: 'bg-highlight text-highlight-foreground',
  success: 'bg-success text-success-foreground',
};

/** Picks a tone deterministically from an index, so the same category always
 *  renders the same color rather than shifting on every render. */
export function tileTone(index: number): CategoryTileTone {
  return TILE_TONES[index % TILE_TONES.length]!;
}

export interface CategoryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  category: Category;
  /** `tile` is the compact icon-and-name form for navigation strips. */
  layout?: 'default' | 'tile';
  headingAs?: 'h2' | 'h3' | 'h4';
  /** Bold solid fill for `tile` layout only. Ignored by `default`, which
   *  stays a plain card — browse and search results need calm, scannable
   *  rows, not a rotating rainbow. */
  tone?: CategoryTileTone;
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
  tone,
  className,
  ...props
}: CategoryCardProps) {
  const isTile = layout === 'tile';
  const toneClasses = isTile && tone ? TILE_TONE_CLASSES[tone] : undefined;

  return (
    <Card
      interactive
      variant={toneClasses ? 'plain' : 'outline'}
      padding={isTile ? 'sm' : 'md'}
      className={cn('h-full gap-3', isTile && 'items-center text-center', toneClasses, className)}
      {...props}
    >
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-md transition-colors duration-fast ease-standard',
          toneClasses
            ? 'bg-white/20 text-current'
            : 'bg-brand-subtle text-brand-on-subtle group-hover:bg-brand-subtle-hover',
        )}
      >
        <Icon icon={category.icon} size="md" />
      </span>

      <Heading
        as={headingAs}
        level="h4"
        className={cn(isTile && 'text-sm', toneClasses && 'text-current')}
      >
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

      <Text
        as="span"
        size="xs"
        className={cn('mt-auto', toneClasses ? 'text-current opacity-75' : 'text-muted-foreground')}
      >
        <span data-numeric>{formatNumber(category.productCount)}</span> products tracked
      </Text>
    </Card>
  );
}

export { CategoryCard };
