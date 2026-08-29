import Link from 'next/link';
import * as React from 'react';

import { Container } from '@/components/layout/container';
import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Rating } from '@/components/ui/rating';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { AI_SEARCH_ANCHOR } from '@/constants/site';
import { getBrandForProduct, getOffersForProduct } from '@/data';
import { editorsPicks } from '@/data/products';
import { featuredCategories } from '@/data/categories';
import { formatPriceBand } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Bento-grid homepage opener, replacing the single-column hero.
 *
 * Every tile is built from real catalogue data — no placeholder content —
 * and every tile is a real link to a real route. Tiles are composed directly
 * from primitives (SmartImage, Rating, Badge, Icon) rather than nesting the
 * full ProductCard/CategoryCard components: those already carry their own
 * border and padding, and nesting one inside a bento cell would double the
 * framing. A bento tile is its own composition, not a re-skinned card.
 *
 * Layout: an asymmetric block (hero + category + editor's pick + deal) at
 * `lg` and above, collapsing to a single column below it — bento grids do
 * not survive a naive shrink, so every span is explicit and reset per
 * breakpoint rather than inherited.
 */
function BentoHero() {
  const pick = editorsPicks[0];
  const secondaryPicks = editorsPicks.slice(1, 3);
  const spotlightCategory = featuredCategories[0];
  const pickBrand = pick ? getBrandForProduct(pick) : undefined;
  const pickOffer = pick ? getOffersForProduct(pick.id)[0] : undefined;

  return (
    <div className="w-full pt-10 pb-4 md:pt-14">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-[220px_220px]">
          {/* Hero tile — dark, spans 2x2 at lg */}
          <div className="col-span-1 row-span-1 flex flex-col justify-between rounded-2xl bg-foreground p-8 text-background lg:col-span-2 lg:row-span-2 lg:p-10">
            <div className="flex flex-col gap-4">
              <Badge
                variant="outline"
                size="sm"
                className="self-start border-background/25 text-background"
              >
                <Icon name="research" size="xs" />
                AI-assisted research
              </Badge>
              <Heading as="h1" level="display" className="text-background">
                Stop searching.
                <br />
                Start selecting.
              </Heading>
              <Text size="lg" className="max-w-md text-background/70">
                Research products, compare options, and find what is actually worth buying.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3 pt-6">
              <Button asChild size="lg">
                <Link href={AI_SEARCH_ANCHOR}>
                  Start research
                  <Icon name="chevronDown" size="sm" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/25 text-background hover:bg-background/10"
              >
                <Link href={ROUTES.products}>Explore products</Link>
              </Button>
            </div>
          </div>

          {/* Category spotlight tile */}
          {spotlightCategory ? (
            <Link
              href={ROUTES.category(spotlightCategory.slug)}
              className={cn(
                'group col-span-1 row-span-1 flex flex-col justify-between rounded-2xl bg-accent p-6',
                'transition-transform duration-fast ease-standard hover:-translate-y-0.5',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              )}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-foreground/15 text-accent-foreground">
                <Icon icon={spotlightCategory.icon} size="md" />
              </span>
              <div className="flex flex-col gap-1">
                <Text
                  as="span"
                  size="xs"
                  weight="medium"
                  className="text-accent-foreground/70 uppercase"
                >
                  Category
                </Text>
                <Heading as="h2" level="h4" className="text-accent-foreground">
                  {spotlightCategory.name}
                </Heading>
              </div>
            </Link>
          ) : null}

          {/* Editor's pick tile — spans both rows at lg */}
          {pick ? (
            <Link
              href={ROUTES.product(pick.slug)}
              className={cn(
                'group col-span-1 row-span-1 overflow-hidden rounded-2xl border border-border bg-elevated',
                'transition-[border-color,box-shadow] duration-fast ease-standard hover:border-border-strong hover:shadow-md',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:row-span-2',
              )}
            >
              <div className="relative h-2/5 lg:h-1/2">
                <SmartImage asset={pick.image} aspect="auto" containerClassName="h-full" />
                <Badge variant="brand" size="sm" className="absolute top-3 left-3 shadow-xs">
                  <Icon name="editorsPick" size="xs" />
                  Editors&rsquo; pick
                </Badge>
              </div>
              <div className="flex flex-col gap-2 p-5">
                {pickBrand ? (
                  <Text as="span" size="xs" tone="muted" weight="medium" className="uppercase">
                    {pickBrand.name}
                  </Text>
                ) : null}
                <Heading as="h3" level="h4" className="text-base">
                  {pick.name}
                </Heading>
                <Rating value={pick.rating} count={pick.reviewCount} size="sm" />
                <Text as="span" data-numeric className="mt-1 font-semibold text-foreground">
                  {formatPriceBand(pick.priceBand)}
                </Text>
              </div>
            </Link>
          ) : null}

          {/* Deal tile */}
          {pickOffer ? (
            <Link
              href={ROUTES.offers}
              className={cn(
                'col-span-1 row-span-1 flex flex-col justify-center gap-2 rounded-2xl bg-highlight p-6',
                'transition-transform duration-fast ease-standard hover:-translate-y-0.5',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              )}
            >
              <Badge
                size="sm"
                className="self-start border-transparent bg-highlight-foreground/15 text-highlight-foreground"
              >
                <Icon name="priceDrop" size="xs" />
                Live offer
              </Badge>
              <Text weight="semibold" className="text-highlight-foreground">
                {pickOffer.name}
              </Text>
              <Text size="xs" className="text-highlight-foreground/70">
                {pickOffer.retailer}
              </Text>
            </Link>
          ) : null}
        </div>

        {/* Second row: two more picks + a guide, plain 3-up */}
        {secondaryPicks.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {secondaryPicks.map((product) => {
              const brand = getBrandForProduct(product);
              return (
                <Link
                  key={product.id}
                  href={ROUTES.product(product.slug)}
                  className={cn(
                    'group flex items-center gap-4 rounded-2xl border border-border bg-elevated p-4',
                    'transition-[border-color,box-shadow] duration-fast ease-standard hover:border-border-strong hover:shadow-sm',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  )}
                >
                  <SmartImage
                    asset={product.image}
                    aspect="square"
                    containerClassName="size-16 shrink-0 rounded-xl"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    {brand ? (
                      <Text as="span" size="xs" tone="muted" className="uppercase">
                        {brand.name}
                      </Text>
                    ) : null}
                    <Text weight="semibold" className="truncate">
                      {product.name}
                    </Text>
                    <Text as="span" data-numeric size="sm" tone="muted">
                      {formatPriceBand(product.priceBand)}
                    </Text>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export { BentoHero };
