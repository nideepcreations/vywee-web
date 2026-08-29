import type { Metadata } from 'next';

import { AiSearchSection } from '@/components/features/home/ai-search-section';
import { BentoHero } from '@/components/features/home/bento-hero';
import { BuyingGuides } from '@/components/features/home/buying-guides';
import { PopularCategories } from '@/components/features/home/popular-categories';
import { TrendingProducts } from '@/components/features/home/trending-products';
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
 * `BentoHero` replaces the previous single-column hero and absorbs the old
 * "Vywee Choice" section's job — it already surfaces the top editors' picks,
 * so that section was removed rather than repeating the same products twice
 * on one page. `hero-section.tsx` and `vywee-choice.tsx` are left in the
 * codebase, just unused from this route, in case either layout is wanted
 * again elsewhere.
 *
 * Header and Footer are supplied by the root layout, so sections 1 and 9 of
 * the brief are already in place around this tree.
 */
export default function HomePage() {
  return (
    <>
      <BentoHero />
      <AiSearchSection />
      <PopularCategories />
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
