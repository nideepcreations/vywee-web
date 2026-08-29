import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

/**
 * Draft. See the note in app/legal/privacy/page.tsx — same status, same
 * reasoning, kept in sync deliberately rather than drifting independently.
 */
export const metadata = createMetadata({
  title: 'Terms of use (draft)',
  path: ROUTES.terms,
  description: 'The terms that apply when you use this site. Draft, pending legal review.',
  noIndex: true,
});

const listClass = 'ml-5 list-disc space-y-2';

export default function TermsPage() {
  return (
    <PageWrapper
      eyebrow="Legal"
      title="Terms of use"
      description="The terms that apply when you use this site."
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-8 pt-8">
        <div className="flex items-start gap-3 rounded-lg border border-warning bg-warning-subtle p-4 md:p-5">
          <Icon name="warning" size="md" tone="warning" className="mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <Text weight="semibold" className="text-warning-on-subtle">
              Draft — not yet reviewed or finalised
            </Text>
            <Text size="sm" className="text-warning-on-subtle">
              This describes how {SITE.name} intends these terms to work, but has not had a legal
              review. Do not treat it as binding until that review is complete. Questions in the
              meantime: {SITE.contactEmail}.
            </Text>
          </div>
        </div>

        <Text size="sm" tone="muted">
          Draft prepared August 2026.
        </Text>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            1. What {SITE.name} is
          </Heading>
          <Text leading="relaxed">
            {SITE.name} is a product research and comparison site. It is not a marketplace, and it
            does not sell, ship, or hold inventory for anything shown on it. Every purchase happens
            on a retailer&rsquo;s own site, under that retailer&rsquo;s own terms — {SITE.name}
            &rsquo;s role stops at the research and the link.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            2. Using this site
          </Heading>
          <Text leading="relaxed" className="mb-3">
            By using {SITE.name}, you agree not to:
          </Text>
          <ul className={listClass}>
            <li>
              <Text as="span" leading="relaxed">
                scrape, systematically copy, or republish the site&rsquo;s content or catalogue
                without permission;
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                attempt to interfere with the site&rsquo;s operation, including the search feature,
                through automated or abusive use;
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                use the site for any unlawful purpose.
              </Text>
            </li>
          </ul>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            3. Accuracy of information
          </Heading>
          <Text leading="relaxed">
            Prices, availability and specifications are sourced from retailers and can change
            without notice — that is why prices are shown as a tracked range rather than a single
            figure. Always confirm the final price and availability on the retailer&rsquo;s own site
            before buying. {SITE.name} makes a genuine effort to keep information current but does
            not guarantee it is accurate at the exact moment you read it.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            4. Affiliate links
          </Heading>
          <Text leading="relaxed">
            Some links on this site are affiliate links, and {SITE.name} may earn a commission if
            you buy through one, at no extra cost to you. Full detail is in our affiliate
            disclosure. Commercial terms are never a factor in which product is recommended.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            5. Third-party sites
          </Heading>
          <Text leading="relaxed">
            {SITE.name} links to retailer and brand websites we do not control and are not
            responsible for. Their own terms and privacy policies apply once you leave this site.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            6. Intellectual property
          </Heading>
          <Text leading="relaxed">
            The {SITE.name} name, logo and site design belong to {SITE.organisation.legalName}.
            Product names and brand names mentioned on this site are trademarks of their respective
            owners, and their appearance here does not imply endorsement of {SITE.name}.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            7. No warranty, limitation of liability
          </Heading>
          <Text leading="relaxed">
            The site is provided as-is. To the extent permitted by law, {SITE.name} is not liable
            for purchase decisions made based on information here, or for issues arising from a
            transaction with a third-party retailer.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            8. Governing law
          </Heading>
          <Text leading="relaxed">
            These terms are intended to be governed by the laws of India.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            9. Changes to these terms
          </Heading>
          <Text leading="relaxed">
            As the product changes, these terms will change with it, and the date at the top will
            update.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            10. Contact
          </Heading>
          <Text leading="relaxed">Questions about these terms: {SITE.contactEmail}.</Text>
        </section>
      </Container>
    </PageWrapper>
  );
}
