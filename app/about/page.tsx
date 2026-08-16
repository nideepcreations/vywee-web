import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'About',
  path: ROUTES.about,
  description: `What ${SITE.name} is for, how research is done, and how the site pays for itself.`,
});

export default function AboutPage() {
  return (
    <PageWrapper
      eyebrow="Company"
      title={`About ${SITE.name}`}
      description={SITE.description}
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-8 pt-8">
        <section>
          <Heading as="h2" level="h3" className="mb-3">
            What we do
          </Heading>
          <Text leading="relaxed">
            {SITE.name} researches products across retailers and publishes a plain verdict on each:
            what it is good at, where it falls short, and who it actually suits. Prices are shown as
            a tracked range rather than a single figure, because affiliate prices move several times
            a day and a stale number is worse than an honest range.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            How we are funded
          </Heading>
          <Text leading="relaxed">
            Some links on this site earn a commission. Which product we recommend is decided before
            that is checked, and a pick is dropped when it stops being the right answer. The full
            terms are set out in our affiliate disclosure.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            Contact
          </Heading>
          <Text leading="relaxed">
            Corrections and questions are welcome at {SITE.contactEmail}.
          </Text>
        </section>
      </Container>
    </PageWrapper>
  );
}
