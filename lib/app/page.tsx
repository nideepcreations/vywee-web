import type { Metadata } from 'next';

import { AiSearchSection } from '@/components/features/home/ai-search-section';
import { BentoHero } from '@/components/features/home/bento-hero';
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
 * `BentoHero` is a dense promo-strip-plus-aisles opener (categories,
 * editors' picks, live offers, guides all shown as compact tile grids) and
 * absorbs three of the sections that used to run the length of the page:
 * "Vywee Choice", `PopularCategories` and `BuyingGuides`. Each is now
 * redundant below the aisle that already shows the same content — keeping
 * both would repeat the same categories and guides twice on one page. All
 * three files are left in the codebase, just unused from this route, in
 * case any of their fuller layouts are wanted again elsewhere.
 *
 * Header and Footer are supplied by the root layout, so sections 1 and 9 of
 * the brief are already in place around this tree.
 */
export default function HomePage() {
  return (
    <>
      <BentoHero />
      <AiSearchSection />
      <TrendingProducts />
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
