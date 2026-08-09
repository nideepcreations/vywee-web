import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ResultCount } from '@/components/features/catalogue/result-count';
import { SortLinks } from '@/components/features/catalogue/sort-links';
import { ProductCard } from '@/components/features/shopping/product-card';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section, SectionHeader } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { JsonLd } from '@/components/shared/json-ld';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { getProductsByBrand } from '@/data';
import { brandBySlug, brands } from '@/data/brands';
import { categoryBySlug } from '@/data/categories';
import { parseSort, sortProducts } from '@/lib/catalogue';
import { createBreadcrumbJsonLd, createMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandBySlug.get(slug);
  if (!brand) return createMetadata({ title: 'Brand not found', noIndex: true });

  return createMetadata({
    title: brand.name,
    path: ROUTES.brand(brand.slug),
    description: `${brand.tagline}. Every ${brand.name} product Vywee has researched, with verdicts and tracked price ranges.`,
  });
}

export default async function BrandPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const brand = brandBySlug.get(slug);
  if (!brand) notFound();

  const sort = parseSort(query['sort']);
  const products = sortProducts(getProductsByBrand(brand.slug), sort);
  const strengths = brand.strongIn
    .map((categorySlug) => categoryBySlug.get(categorySlug))
    .filter((category) => category !== undefined);

  const crumbs = [
    { name: 'Home', path: ROUTES.home },
    { name: 'Brands', path: ROUTES.brands },
    { name: brand.name, path: ROUTES.brand(brand.slug) },
  ];

  return (
    <PageWrapper
      eyebrow="Brand"
      title={brand.name}
      description={brand.tagline}
      meta={
        <Breadcrumb
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Brands', href: ROUTES.brands },
            { label: brand.name },
          ]}
        />
      }
    >
      <Section spacing="md">
        <dl className="mb-8 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted-foreground">Founded</dt>
            <dd data-numeric className="text-base font-medium">
              {brand.foundedYear}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Origin</dt>
            <dd className="text-base font-medium">{brand.originCountry}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Known for</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {strengths.length === 0 ? (
                <Text as="span" size="sm" tone="muted">
                  Not yet categorised
                </Text>
              ) : (
                strengths.map((category) => (
                  <Badge key={category.id} variant="neutral" size="sm">
                    {category.name}
                  </Badge>
                ))
              )}
            </dd>
          </div>
        </dl>

        <SectionHeader
          title={`Products by ${brand.name}`}
          headingAs="h2"
          headingId="brand-products-heading"
        />

        <div className="mb-6 flex flex-col gap-4">
          <SortLinks basePath={ROUTES.brand(brand.slug)} active={sort} />
          <Separator />
          <ResultCount count={products.length} />
        </div>

        {products.length === 0 ? (
          <EmptyState
            title={`No ${brand.name} products researched yet`}
            description="This brand is tracked but nothing from it has finished research. Browse the full catalogue instead."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  brand={brand}
                  headingAs="h3"
                  priority={index < 4}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        )}

        <JsonLd data={createBreadcrumbJsonLd(crumbs)} />
      </Section>
    </PageWrapper>
  );
}
