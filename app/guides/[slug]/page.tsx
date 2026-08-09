import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductCard } from '@/components/features/shopping/product-card';
import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Heading, Lead, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { getBrandForProduct } from '@/data';
import { buyingGuides, guideBySlug } from '@/data/buying-guides';
import { categoryById } from '@/data/categories';
import { productById } from '@/data/products';
import { formatDate, formatReadingTime } from '@/lib/format';
import { createArticleJsonLd, createBreadcrumbJsonLd, createMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return buyingGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) return createMetadata({ title: 'Guide not found', noIndex: true });

  return createMetadata({
    title: guide.name,
    path: ROUTES.guide(guide.slug),
    description: guide.excerpt,
    image: guide.cover.src,
    type: 'article',
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
  });
}

/**
 * Guide detail.
 *
 * Section bodies are plain strings in the data model, so each renders as a
 * single paragraph — no inline links, lists or emphasis until the type gains
 * structured content. The measure is capped because long-form text past about
 * 65 characters a line is tiring to track.
 */
export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();

  const category = categoryById.get(guide.categoryId);
  const recommended = guide.recommendedProductIds
    .map((id) => productById.get(id))
    .filter((product) => product !== undefined);

  const crumbs = [
    { name: 'Home', path: ROUTES.home },
    { name: 'Guides', path: ROUTES.guides },
    { name: guide.name, path: ROUTES.guide(guide.slug) },
  ];

  return (
    <PageWrapper withHeader={false}>
      <Container size="prose" className="pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Guides', href: ROUTES.guides },
            { label: guide.name },
          ]}
        />
      </Container>

      <Container size="prose" className="flex flex-col gap-5 pt-8">
        {category ? (
          <Badge variant="neutral" size="sm" className="self-start">
            {category.name}
          </Badge>
        ) : null}

        <Heading as="h1" level="h1">
          {guide.name}
        </Heading>

        <Lead>{guide.excerpt}</Lead>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{guide.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(guide.readingMinutes)}</span>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
          </span>
        </div>
      </Container>

      <Container size="prose" className="pt-8">
        <SmartImage
          asset={guide.cover}
          aspect="16/9"
          priority
          sizes="(min-width: 768px) 704px, 100vw"
          containerClassName="rounded-xl border border-border"
        />
      </Container>

      <Container size="prose" className="flex flex-col gap-8 pt-10">
        {guide.sections.map((section, index) => (
          <section key={section.heading} aria-labelledby={`section-${index}`}>
            <Heading as="h2" id={`section-${index}`} level="h3" className="mb-3">
              {section.heading}
            </Heading>
            <Text size="lg" leading="relaxed" measure="base">
              {section.body}
            </Text>
          </section>
        ))}
      </Container>

      {recommended.length > 0 ? (
        <Section spacing="md" surface="muted" bordered className="mt-14">
          <Heading as="h2" id="recommended-heading" level="h3" className="mb-5">
            What we recommend
          </Heading>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  brand={getBrandForProduct(product)}
                  headingAs="h3"
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <JsonLd data={[createArticleJsonLd(guide), createBreadcrumbJsonLd(crumbs)]} />
    </PageWrapper>
  );
}
