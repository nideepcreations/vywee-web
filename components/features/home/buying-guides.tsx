import Link from 'next/link';
import * as React from 'react';

import { BuyingGuideCard } from '@/components/features/shopping/buying-guide-card';
import { Section, SectionHeader } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { buyingGuides } from '@/data/buying-guides';
import { categoryById } from '@/data/categories';

/**
 * Three guides, each with its own "Read guide" action.
 *
 * The card title is already the link that covers the card, so the button is
 * marked `aria-hidden`: without it a screen reader would announce two links to
 * the same place per card, and the second one adds nothing.
 */
function BuyingGuides() {
  const guides = buyingGuides.slice(0, 3);

  return (
    <Section   spacing="lg"   containerSize="wide"   aria-labelledby="guides-heading" >
      <SectionHeader
        eyebrow="Read first"
        title="Buying guides"
        description="The checks worth making before you spend, written once and kept updated."
        headingAs="h2"
        headingId="guides-heading"
        action={
          <Button asChild variant="ghost" size="sm">
            <Link href={ROUTES.guides}>All guides</Link>
          </Button>
        }
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.id}>
            <BuyingGuideCard
              guide={guide}
              category={categoryById.get(guide.categoryId)}
              headingAs="h3"
              ctaLabel="Read guide"
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { BuyingGuides };
