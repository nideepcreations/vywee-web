import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Affiliate disclosure',
  path: ROUTES.affiliateDisclosure,
  description: `How ${SITE.name} earns commission, and how that is kept separate from what we recommend.`,
});

export default function AffiliateDisclosurePage() {
  return (
    <PageWrapper
      eyebrow="Legal"
      title="Affiliate disclosure"
      description="How this site earns money, stated plainly."
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-8 pt-8">
        <section>
          <Heading as="h2" level="h3" className="mb-3">
            We earn commission on some links
          </Heading>
          <Text leading="relaxed">
            Some links to retailers on {SITE.name} are affiliate links. If you buy through one, we
            may receive a commission. The price you pay is not affected.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            How that is kept separate from our recommendations
          </Heading>
          <Text leading="relaxed">
            Research and verdicts are completed before commercial terms are considered. A product is
            not recommended because it pays more, and a recommendation is withdrawn when it stops
            being the right answer, regardless of whether it earns anything.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            Prices and availability
          </Heading>
          <Text leading="relaxed">
            Prices are shown as a tracked range across retailers and change frequently. Always check
            the final price at the retailer before buying.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            Questions
          </Heading>
          <Text leading="relaxed">Write to {SITE.contactEmail}.</Text>
        </section>
      </Container>
    </PageWrapper>
  );
}
