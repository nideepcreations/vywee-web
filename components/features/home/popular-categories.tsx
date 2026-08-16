import Link from 'next/link';
import * as React from 'react';

import { CategoryCard } from '@/components/features/shopping/category-card';
import { Section, SectionHeader } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { featuredCategories } from '@/data/categories';

/**
 * Six departments, two columns on a phone and six on a wide screen.
 *
 * The tile layout is used rather than the full card: at six across there is no
 * room for a description, and a truncated one reads worse than none.
 */
function PopularCategories() {
  return (
    <Section   spacing="lg"   surface="muted"   bordered   containerSize="wide"   aria-labelledby="popular-categories-heading" >
      <SectionHeader
        title="Popular categories"
        description="Start from a department, or jump straight into research."
        headingAs="h2"
        headingId="popular-categories-heading"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href={ROUTES.categories}>All categories</Link>
          </Button>
        }
      />

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {featuredCategories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} layout="tile" headingAs="h3" />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { PopularCategories };
