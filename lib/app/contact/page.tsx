import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Contact',
  path: ROUTES.contact,
  description: `How to reach the ${SITE.name} team about corrections, coverage requests and press.`,
});

export default function ContactPage() {
  return (
    <PageWrapper
      eyebrow="Company"
      title="Contact"
      description="Corrections, coverage requests and press enquiries."
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-8 pt-8">
        <section>
          <Heading as="h2" level="h3" className="mb-3">
            Email
          </Heading>
          <Text leading="relaxed">
            Write to {SITE.contactEmail}. We read everything, and corrections are prioritised over
            everything else.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            Corrections
          </Heading>
          <Text leading="relaxed">
            If a specification, price range or verdict on this site is wrong, tell us which page and
            what is inaccurate. Verified corrections are applied and the page&rsquo;s updated date
            is changed.
          </Text>
        </section>
      </Container>
    </PageWrapper>
  );
}
