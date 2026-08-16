import Link from 'next/link';
import * as React from 'react';

import { ProductCard } from '@/components/features/shopping/product-card';
import { Section, SectionHeader } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { getBrandForProduct } from '@/data';
import { editorsPicks } from '@/data/products';

/**
 * What Vywee recommends after research — carefully not "the best".
 *
 * On phones this is a horizontal snap scroller: four cards stacked vertically
 * push everything below them off the first two screens. The negative margin
 * lets the row bleed to the viewport edge while the page keeps its gutter, and
 * the list is still a plain list, so keyboard and screen reader order is
 * unaffected.
 */
function VyweeChoice() {
  const picks = editorsPicks.slice(0, 4);

  return (
    <Section   spacing="lg"   containerSize="wide"   aria-labelledby="vywee-choice-heading" >
      <SectionHeader
        eyebrow="Vywee Choice"
        title="What we would buy"
        description="Picked after comparing the field on the things that matter after month three, not on launch-day specs."
        headingAs="h2"
        headingId="vywee-choice-heading"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href={ROUTES.products}>See all picks</Link>
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
        {picks.map((product, index) => (
          <li
            key={product.id}
            className="w-[78vw] max-w-xs shrink-0 snap-start sm:w-[60vw] md:w-auto md:max-w-none"
          >
            <ProductCard
              product={product}
              brand={getBrandForProduct(product)}
              highlight="vywee-choice"
              headingAs="h3"
              priority={index === 0}
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { VyweeChoice };
