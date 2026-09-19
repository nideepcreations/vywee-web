import * as React from 'react';

import { Rating } from '@/components/ui/rating';
import { Heading, Text } from '@/components/ui/typography';
import { brandBySlug } from '@/data/brands';
import { buyingGuides } from '@/data/buying-guides';
import { categories, categoryById, featuredCategories } from '@/data/categories';
import { getActiveOffers, getBrandForProduct } from '@/data';
import { offers } from '@/data/offers';
import { products } from '@/data/products';

import { BuyingGuideCard } from './buying-guide-card';
import { CategoryCard } from './category-card';
import { OfferBadge } from './offer-badge';
import { OfferCard } from './offer-card';
import { PriceTag } from './price-tag';
import { ProductCard } from './product-card';

/**
 * Mock compositions for every shopping component, built from the catalogue in
 * `data/`.
 *
 * These are exported components rather than a route: they can be dropped into
 * a scratch page, a story or a visual test without adding anything to the
 * router or the production bundle. Each block shows the layouts and states a
 * component supports, including the ones that are easy to forget — long names,
 * missing brand, out of stock, no coupon code.
 */

function ExampleGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-b border-border py-8 last:border-b-0">
      <div className="flex flex-col gap-1">
        <Heading as="h3" level="h4">
          {title}
        </Heading>
        <Text size="sm" tone="muted">
          {description}
        </Text>
      </div>
      {children}
    </section>
  );
}

const gridClass = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3';

export function ProductCardExamples() {
  const featured = products.slice(0, 3);
  const outOfStock = { ...products[0]!, availability: 'out-of-stock' as const, editorsPick: false };

  return (
    <ExampleGroup
      title="ProductCard"
      description="Grid, compact and horizontal layouts, plus the out-of-stock state."
    >
      <ul className={gridClass}>
        {featured.map((product, index) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              brand={getBrandForProduct(product)}
              priority={index === 0}
            />
          </li>
        ))}
      </ul>

      <ul className="grid gap-4 sm:grid-cols-2">
        {products.slice(3, 5).map((product) => (
          <li key={product.id}>
            <ProductCard product={product} brand={getBrandForProduct(product)} layout="compact" />
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-4">
        {products.slice(5, 7).map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              brand={getBrandForProduct(product)}
              layout="horizontal"
            />
          </li>
        ))}
        <li>
          <ProductCard product={outOfStock} brand={brandBySlug.get('sonova')} layout="horizontal" />
        </li>
      </ul>
    </ExampleGroup>
  );
}

export function CategoryCardExamples() {
  return (
    <ExampleGroup
      title="CategoryCard"
      description="Full card for browse grids, tile for compact navigation strips."
    >
      <ul className={gridClass}>
        {featuredCategories.slice(0, 3).map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} layout="tile" />
          </li>
        ))}
      </ul>
    </ExampleGroup>
  );
}

export function OfferCardExamples() {
  const active = getActiveOffers(new Date('2026-08-05T00:00:00.000Z'));
  const withCode = offers.find((offer) => offer.code !== undefined);

  return (
    <ExampleGroup
      title="OfferCard"
      description="Every offer kind, with and without a coupon code, plus the ending-soon state."
    >
      <ul className={gridClass}>
        {active.slice(0, 3).map((offer, index) => (
          <li key={offer.id}>
            <OfferCard offer={offer} endingSoon={index === 0} />
          </li>
        ))}
        {withCode ? (
          <li>
            <OfferCard offer={withCode} brand={brandBySlug.get('northloop')} />
          </li>
        ) : null}
      </ul>
    </ExampleGroup>
  );
}

export function BuyingGuideCardExamples() {
  const [lead, ...rest] = buyingGuides;

  return (
    <ExampleGroup
      title="BuyingGuideCard"
      description="Featured lead card, standard grid cards, and the cover-less compact form."
    >
      {lead ? (
        <BuyingGuideCard
          guide={lead}
          category={categoryById.get(lead.categoryId)}
          layout="featured"
          priority
        />
      ) : null}

      <ul className={gridClass}>
        {rest.slice(0, 3).map((guide) => (
          <li key={guide.id}>
            <BuyingGuideCard guide={guide} category={categoryById.get(guide.categoryId)} />
          </li>
        ))}
      </ul>

      <ul className="flex max-w-sm flex-col gap-3">
        {rest.slice(0, 2).map((guide) => (
          <li key={guide.id}>
            <BuyingGuideCard guide={guide} layout="compact" />
          </li>
        ))}
      </ul>
    </ExampleGroup>
  );
}

export function PriceTagExamples() {
  const product = products[0]!;

  return (
    <ExampleGroup
      title="PriceTag"
      description="Compact and exact figures, a single price, a tracked drop, and a reference price."
    >
      <div className="flex flex-wrap items-start gap-8">
        <PriceTag band={product.priceBand} size="sm" />
        <PriceTag band={product.priceBand} size="md" />
        <PriceTag band={product.priceBand} size="lg" exact />
        <PriceTag band={product.priceBand} isDrop wasPrice={32990} />
        <PriceTag band={{ min: 7499, max: 7499, currency: 'INR' }} exact />
      </div>
    </ExampleGroup>
  );
}

export function RatingExamples() {
  return (
    <ExampleGroup
      title="Rating"
      description="Three sizes, partial fills, with and without review counts."
    >
      <div className="flex flex-col gap-3">
        <Rating value={4.6} count={2814} size="sm" />
        <Rating value={4.2} count={1190} size="md" />
        <Rating value={3.5} size="lg" />
        <Rating value={5} count={12} hideValue />
        <Rating value={0} count={0} size="sm" />
      </div>
    </ExampleGroup>
  );
}

export function OfferBadgeExamples() {
  return (
    <ExampleGroup
      title="OfferBadge"
      description="One badge per offer kind, with percentage and flat savings."
    >
      <div className="flex flex-wrap items-center gap-3">
        <OfferBadge kind="coupon" offer={{ flatDiscount: 2500 }} />
        <OfferBadge kind="bank-offer" offer={{ discountPercent: 10 }} />
        <OfferBadge kind="price-drop" offer={{ flatDiscount: 4000 }} />
        <OfferBadge kind="bundle" />
        <OfferBadge kind="exchange" offer={{ flatDiscount: 8000 }} />
        <OfferBadge kind="coupon" size="sm" hideIcon />
      </div>
    </ExampleGroup>
  );
}

/** Every example in one block, for a scratch page or visual regression run. */
export function ShoppingComponentExamples() {
  return (
    <div className="flex flex-col">
      <ProductCardExamples />
      <CategoryCardExamples />
      <OfferCardExamples />
      <BuyingGuideCardExamples />
      <PriceTagExamples />
      <RatingExamples />
      <OfferBadgeExamples />
    </div>
  );
}
