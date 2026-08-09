import * as React from 'react';

import type { Brand, Product } from '@/types';

import { ProductCard } from '@/components/features/shopping/product-card';
import { Heading } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export interface RelatedProductsProps extends React.HTMLAttributes<HTMLElement> {
  products: readonly Product[];
  /** Resolves each product's brand. Passed in so this stays free of data imports. */
  brandFor: (product: Product) => Brand | undefined;
  title?: string;
  headingId?: string;
}

/** Renders nothing when there is nothing related — an empty heading helps no one. */
function RelatedProducts({
  products,
  brandFor,
  title = 'Also worth comparing',
  headingId = 'related-products-heading',
  className,
  ...props
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby={headingId}
      className={cn('flex flex-col gap-5', className)}
      {...props}
    >
      <Heading as="h2" id={headingId} level="h3">
        {title}
      </Heading>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              brand={brandFor(product)}
              headingAs="h3"
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export { RelatedProducts };
