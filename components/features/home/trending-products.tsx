import Link from 'next/link';
import * as React from 'react';

import { ProductCard } from '@/components/features/shopping/product-card';
import { Section, SectionHeader } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { getBrandForProduct } from '@/data';
import { trendingProducts } from '@/data/products';

/**
 * Products drawing attention right now.
 *
 * No view counts or purchase numbers: there is no traffic data behind this
 * yet, and a fabricated "12,400 people viewed this" is exactly the marketplace
 * pressure this product is meant to avoid. The badge says trending and stops.
 */
function TrendingProducts() {
  return (
    <Section   spacing="lg"   surface="muted"   bordered   containerSize="wide"   aria-labelledby="trending-heading" >
      <SectionHeader
        eyebrow="This week"
        title="Trending in research"
        description="What people are comparing most often right now."
        headingAs="h2"
        headingId="trending-heading"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href={ROUTES.products}>Browse everything</Link>
          </Button>
        }
      />

      <ul
        className={[
          '-mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--space-gutter)] pb-2',
          'md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0',
          'lg:grid-cols-4',
        ].join(' ')}
      >
        {trendingProducts.map((product) => (
          <li
            key={product.id}
            className="w-[78vw] max-w-xs shrink-0 snap-start sm:w-[60vw] md:w-auto md:max-w-none"
          >
            <ProductCard
              product={product}
              brand={getBrandForProduct(product)}
              highlight="trending"
              headingAs="h3"
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { TrendingProducts };
