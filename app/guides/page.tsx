import { BuyingGuideCard } from '@/components/features/shopping/buying-guide-card';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ROUTES } from '@/constants/routes';
import { buyingGuides } from '@/data/buying-guides';
import { categoryById } from '@/data/categories';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Buying guides',
  path: ROUTES.guides,
  description:
    'The checks worth making before you spend. Vywee buying guides explain what actually separates good products from expensive ones, category by category.',
});

/**
 * Guide index, newest first. The most recently updated guide leads at full
 * width, because buying advice ages and recency is the useful sort here.
 */
export default function GuidesPage() {
  const sorted = [...buyingGuides].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const [lead, ...rest] = sorted;

  return (
    <PageWrapper
      eyebrow="Read first"
      title="Buying guides"
      description="What to check before you spend, written once and kept updated as products change."
      meta={<Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Guides' }]} />}
    >
      <Section spacing="md">
        {lead === undefined ? (
          <EmptyState
            title="No guides published yet"
            description="Guides are being written. Browse the catalogue in the meantime."
          />
        ) : (
          <div className="flex flex-col gap-8">
            <BuyingGuideCard
              guide={lead}
              category={categoryById.get(lead.categoryId)}
              layout="featured"
              headingAs="h2"
              ctaLabel="Read guide"
              priority
            />

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((guide) => (
                <li key={guide.id}>
                  <BuyingGuideCard
                    guide={guide}
                    category={categoryById.get(guide.categoryId)}
                    headingAs="h2"
                    ctaLabel="Read guide"
                    className="h-full"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}
