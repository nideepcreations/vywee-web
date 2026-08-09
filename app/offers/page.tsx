import type { Offer } from '@/types';

import { OfferCard } from '@/components/features/shopping/offer-card';
import { ResultCount } from '@/components/features/catalogue/result-count';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section, SectionHeader } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { brandById } from '@/data/brands';
import { offers } from '@/data/offers';
import { productById } from '@/data/products';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Offers',
  path: ROUTES.offers,
  description:
    'Coupons, bank offers, price drops and exchange bonuses on products Vywee has researched, with the expiry date on every one.',
});

/** Offers expiring within this window are called out. */
const ENDING_SOON_DAYS = 7;

/**
 * Offers, sorted by expiry so the ones about to lapse come first.
 *
 * The comparison date is taken once per render rather than per card, and every
 * card states its expiry date. There is no countdown timer: a live countdown
 * differs between server and client and manufactures urgency, which is the
 * opposite of what this product is for.
 */
/**
 * An offer links to the product it applies to. Offers with several products
 * fall back to the index, since picking one arbitrarily would be misleading.
 */
function offerHref(productIds: Offer['productIds']): string | undefined {
  const [only] = productIds;
  if (productIds.length !== 1 || only === undefined) return undefined;
  const product = productById.get(only);
  return product ? ROUTES.product(product.slug) : undefined;
}

export default function OffersPage() {
  const now = new Date();
  const endingSoonCutoff = now.getTime() + ENDING_SOON_DAYS * 24 * 60 * 60 * 1000;

  const live = offers
    .filter((offer) => new Date(offer.expiresAt).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());

  const expired = offers.filter((offer) => new Date(offer.expiresAt).getTime() < now.getTime());

  return (
    <PageWrapper
      eyebrow="Catalogue"
      title="Live offers"
      description="Savings we have verified on products we have researched. Every one shows what it is and when it ends."
      meta={<Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Offers' }]} />}
    >
      <Section spacing="md">
        <ResultCount count={live.length} noun="live offer" className="mb-5" />

        {live.length === 0 ? (
          <EmptyState
            title="No live offers right now"
            description="Nothing worth flagging today. Offers are added as we verify them, so this page is worth another look next week."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((offer) => (
              <li key={offer.id}>
                <OfferCard
                  offer={offer}
                  brand={offer.brandId ? brandById.get(offer.brandId) : undefined}
                  endingSoon={new Date(offer.expiresAt).getTime() <= endingSoonCutoff}
                  href={offerHref(offer.productIds)}
                  headingAs="h2"
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        )}
      </Section>

      {expired.length > 0 ? (
        <Section spacing="md" surface="muted" bordered>
          <SectionHeader
            title="Recently expired"
            headingAs="h2"
            headingId="expired-offers-heading"
            description="Kept visible so you can tell whether a price you remember has already gone."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expired.map((offer) => (
              <li key={offer.id}>
                <OfferCard
                  offer={offer}
                  brand={offer.brandId ? brandById.get(offer.brandId) : undefined}
                  href={offerHref(offer.productIds)}
                  headingAs="h3"
                  className="h-full bg-background opacity-70"
                />
              </li>
            ))}
          </ul>
          <Text size="xs" tone="muted" className="mt-4">
            Expired offers are removed once they are more than a month old.
          </Text>
        </Section>
      ) : null}
    </PageWrapper>
  );
}
