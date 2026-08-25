import type { Metadata } from 'next';
import Link from 'next/link';

import { BuyingGuideCard } from '@/components/features/shopping/buying-guide-card';
import { ProductCard } from '@/components/features/shopping/product-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { getBrandForProduct, productLookups } from '@/data';
import { buyingGuides } from '@/data/buying-guides';
import { categoryById } from '@/data/categories';
import { products as allProducts } from '@/data/products';
import { interpretQuery } from '@/lib/ai/provider';
import { filterProducts, sortProducts } from '@/lib/catalogue';
import { createMetadata } from '@/lib/seo';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return createMetadata({
    title: q ? `"${q}"` : 'Search',
    path: ROUTES.search,
    description: q
      ? `Research results for "${q}", with an honest summary of what's shown and why.`
      : 'Ask what you actually want to know. Vywee reads the research and narrows it down.',
    noIndex: true,
  });
}

/**
 * Search results.
 *
 * A query is interpreted once, server-side, into a filter and a sort order
 * over the existing catalogue — the same `filterProducts` / `sortProducts`
 * the category and product listing pages already use, so results behave
 * identically everywhere in the app rather than having their own logic.
 *
 * The summary always names its own source. That is not a debug detail — it is
 * Vywee's own transparency principle: a reader should know whether they are
 * looking at a language model's reading of their question or a plain keyword
 * match, not just trust that "the AI did it."
 */
export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  if (!query) {
    return (
      <Container className="py-16">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Search' }]} />
        <EmptyState
          className="mt-8"
          title="What are you looking to buy?"
          description="Search from the homepage, or start from a category."
          action={
            <Button asChild variant="secondary" size="sm">
              <Link href={ROUTES.home}>Back to home</Link>
            </Button>
          }
        />
      </Container>
    );
  }

  const interpretation = await interpretQuery(query);
  const filtered = filterProducts(allProducts, interpretation.filters, productLookups);
  const results = sortProducts(filtered, interpretation.sort);

  const relatedGuides = interpretation.categorySlugs?.length
    ? buyingGuides.filter((guide) => {
        const guideCategory = categoryById.get(guide.categoryId);
        return guideCategory && interpretation.categorySlugs?.includes(guideCategory.slug);
      })
    : [];

  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Search' }]} />

      <Heading as="h1" level="h2" className="mt-4">
        Results for &ldquo;{query}&rdquo;
      </Heading>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-surface p-4 md:p-5">
        <Icon name="research" size="md" tone="brand" className="mt-0.5 shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Text size="base">{interpretation.summary}</Text>
          <Badge
            variant={interpretation.source === 'ai' ? 'brand' : 'neutral'}
            size="sm"
            className="self-start"
          >
            {interpretation.source === 'ai' ? 'AI-read summary' : 'Keyword match'}
          </Badge>
        </div>
      </div>

      <Section spacing="md" contained={false} className="mt-2">
        {results.length === 0 ? (
          <EmptyState
            title="Nothing matched that search"
            description="Try a broader term, or browse a category directly."
            action={
              <Button asChild variant="secondary" size="sm">
                <Link href={ROUTES.categories}>Browse categories</Link>
              </Button>
            }
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product, index) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  brand={getBrandForProduct(product)}
                  headingAs="h2"
                  priority={index < 4}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        )}
      </Section>

      {relatedGuides.length > 0 ? (
        <Section spacing="md" surface="muted" bordered contained={false} className="mt-4">
          <Heading as="h2" level="h3" className="mb-5">
            Worth reading first
          </Heading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((guide) => (
              <li key={guide.id}>
                <BuyingGuideCard
                  guide={guide}
                  category={categoryById.get(guide.categoryId)}
                  headingAs="h3"
                  ctaLabel="Read guide"
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </Container>
  );
}
