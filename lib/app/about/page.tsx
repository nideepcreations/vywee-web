import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'About',
  path: ROUTES.about,
  description: `Why the name Vywee, what ${SITE.name} is for, and how the site pays for itself.`,
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
            Why &ldquo;Vywee&rdquo;
          </Heading>
          <Text leading="relaxed">
            Say it out loud and it sounds like &ldquo;why we&rdquo; — and that is the whole idea.
            Most shopping sites will tell you <em>what</em> to buy. We built this one around a
            different question: <em>why</em>. Why this one and not the cheaper one. Why the rating
            is high but the return rate isn&rsquo;t. Why a pick that made sense in June
            doesn&rsquo;t anymore. If we can&rsquo;t answer why, we don&rsquo;t make the
            recommendation — that rule shows up everywhere on this site, not just in the name.
          </Text>
        </section>

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
