import type { Metadata } from 'next';

import { AiSearchSection } from '@/components/features/home/ai-search-section';
import { BuyingGuides } from '@/components/features/home/buying-guides';
import { HeroSection } from '@/components/features/home/hero-section';
import { PopularCategories } from '@/components/features/home/popular-categories';
import { TrendingProducts } from '@/components/features/home/trending-products';
import { VyweeChoice } from '@/components/features/home/vywee-choice';
import { WhyTrustVywee } from '@/components/features/home/why-trust-vywee';
import { JsonLd } from '@/components/shared/json-ld';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  path: ROUTES.home,
  description:
    'Vywee researches products across retailers and tells you which one is worth buying — honest verdicts, tracked price ranges and buying guides, with no marketplace noise.',
  keywords: [
    'product research',
    'buying advice',
    'product comparison',
    'buying guides',
    'what to buy',
  ],
});

/**
 * Homepage. Composition only — every section is its own component, and every
 * card comes from the shopping feature. Nothing here renders a product,
 * category or guide directly.
 *
 * Header and Footer are supplied by the root layout, so sections 1 and 9 of
 * the brief are already in place around this tree.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AiSearchSection />
      <PopularCategories />
      <VyweeChoice />
      <TrendingProducts />
      <BuyingGuides />
      <WhyTrustVywee />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${SITE.name} — ${SITE.tagline}`,
          description: SITE.description,
          url: SITE.url,
          inLanguage: SITE.language,
          isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
        }}
      />
    </>
  );
}
