import Link from 'next/link';
import * as React from 'react';

import { Container } from '@/components/layout/container';
import { SmartImage } from '@/components/shared/smart-image';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/typography';
import type { ImageAsset } from '@/types';

import { ROUTES } from '@/constants/routes';
import { AI_SEARCH_ANCHOR } from '@/constants/site';
import { getActiveOffers } from '@/data';
import { productById } from '@/data/products';
import { editorsPicks } from '@/data/products';
import { featuredCategories } from '@/data/categories';
import { buyingGuides } from '@/data/buying-guides';
import { formatPriceBand } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Homepage opener.
 *
 * Two parts, deliberately dense rather than spacious — modelled on how a
 * real e-commerce homepage (Amazon, Flipkart) packs a lot of real entry
 * points into the fold instead of one big hero moment with a lot of
 * surrounding air:
 *
 * 1. A horizontally-scrolling promo strip — tight cards, small radius,
 *    minimal padding, edge-bled using the same gutter-bleed pattern
 *    `TrendingProducts` already uses so it's a consistent site idiom rather
 *    than a one-off.
 * 2. A row of "aisle" widgets — a title with a chevron link to the full
 *    listing, and a compact 2x2 grid of small tiles inside. This is the
 *    Amazon "Bestselling Devices >" pattern: several categories of content
 *    visible at once, each just a glance, not a full card each.
 *
 * Every tile is real catalogue data with a real link — nothing here is
 * decorative or placeholder.
 */

const PROMO_TONES = [
  'bg-foreground text-background',
  'bg-brand text-brand-foreground',
  'bg-accent text-accent-foreground',
  'bg-highlight text-highlight-foreground',
] as const;

function PromoStrip() {
  const spotlightCategory = featuredCategories[0];
  const topPick = editorsPicks[0];
  const topOffer = getActiveOffers()[0];

  const cards = [
    {
      href: AI_SEARCH_ANCHOR,
      eyebrow: 'AI-assisted research',
      title: 'Stop searching.\nStart selecting.',
      sub: 'Describe what you want, we narrow it down.',
    },
    spotlightCategory && {
      href: ROUTES.category(spotlightCategory.slug),
      eyebrow: 'Category',
      title: spotlightCategory.name,
      sub: `${spotlightCategory.productCount} products tracked`,
    },
    topPick && {
      href: ROUTES.product(topPick.slug),
      eyebrow: "Editors' pick",
      title: topPick.name,
      sub: formatPriceBand(topPick.priceBand),
    },
    topOffer && {
      href: ROUTES.offers,
      eyebrow: 'Live offer',
      title: topOffer.name,
      sub: topOffer.retailer,
    },
  ].filter(Boolean) as {
    href: string;
    eyebrow: string;
    title: string;
    sub: string;
  }[];

  return (
    <ul className="-mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--space-gutter)] pb-2 lg:mx-0 lg:px-0">
      {cards.map((card, index) => (
        <li key={card.title} className="w-64 shrink-0 snap-start sm:w-72">
          <Link
            href={card.href}
            className={cn(
              'flex h-44 flex-col justify-between rounded-lg p-5',
              'transition-transform duration-fast ease-standard hover:-translate-y-0.5',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              PROMO_TONES[index % PROMO_TONES.length],
            )}
          >
            <Text as="span" size="xs" weight="medium" className="text-current/70 uppercase">
              {card.eyebrow}
            </Text>
            <div className="flex flex-col gap-1">
              <Text weight="semibold" className="whitespace-pre-line text-current">
                {card.title}
              </Text>
              <Text size="sm" className="text-current/70">
                {card.sub}
              </Text>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface AisleTile {
  readonly key: string;
  readonly href: string;
  readonly label: string;
  readonly image?: ImageAsset;
  readonly icon?: React.ComponentProps<typeof Icon>['icon'];
}

interface AisleProps {
  readonly title: string;
  readonly href: string;
  readonly tiles: readonly AisleTile[];
}

/** One dense widget: title + "see all" chevron, then a 2x2 grid of tiles. */
function Aisle({ title, href, tiles }: AisleProps) {
  return (
    <div className="rounded-lg border border-border bg-elevated p-4">
      <Link
        href={href}
        className="mb-3 flex items-center justify-between rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Text as="span" weight="semibold" className="text-sm">
          {title}
        </Text>
        <Icon name="chevronRight" size="sm" tone="muted" />
      </Link>
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((tile) => (
          <Link
            key={tile.key}
            href={tile.href}
            className={cn(
              'group flex flex-col items-center gap-1.5 rounded-md p-2 text-center',
              'transition-colors duration-fast ease-standard hover:bg-muted',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            )}
          >
            {tile.image ? (
              <SmartImage
                asset={tile.image}
                aspect="square"
                containerClassName="w-full rounded-md"
              />
            ) : tile.icon ? (
              <span className="flex aspect-square w-full items-center justify-center rounded-md bg-brand-subtle text-brand-on-subtle">
                <Icon icon={tile.icon} size="lg" />
              </span>
            ) : null}
            <Text size="xs" className="line-clamp-1 text-foreground">
              {tile.label}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BentoHero() {
  const categoryTiles: AisleTile[] = featuredCategories.slice(0, 4).map((category) => ({
    key: category.id,
    href: ROUTES.category(category.slug),
    label: category.name,
    icon: category.icon,
  }));

  const pickTiles: AisleTile[] = editorsPicks.slice(0, 4).map((product) => ({
    key: product.id,
    href: ROUTES.product(product.slug),
    label: product.name,
    image: product.image,
  }));

  const offerTiles: AisleTile[] = getActiveOffers()
    .slice(0, 4)
    .map((offer) => {
      const product = productById.get(offer.productIds[0] as never);
      return {
        key: offer.id,
        href: product ? ROUTES.product(product.slug) : ROUTES.offers,
        label: offer.name,
        image: product?.image,
      };
    });

  const guideTiles: AisleTile[] = buyingGuides.slice(0, 4).map((guide) => ({
    key: guide.id,
    href: ROUTES.guide(guide.slug),
    label: guide.name,
    image: guide.cover,
  }));

  return (
    <div className="w-full pt-6 pb-2 md:pt-8">
      <Container size="wide">
        <PromoStrip />

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Aisle title="Popular categories" href={ROUTES.categories} tiles={categoryTiles} />
          <Aisle title="Editors' picks" href={ROUTES.products} tiles={pickTiles} />
          {offerTiles.length > 0 ? (
            <Aisle title="Live offers" href={ROUTES.offers} tiles={offerTiles} />
          ) : null}
          <Aisle title="Buying guides" href={ROUTES.guides} tiles={guideTiles} />
        </div>
      </Container>
    </div>
  );
}

export { BentoHero };
