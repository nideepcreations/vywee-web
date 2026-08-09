import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SortLinks } from '@/components/features/catalogue/sort-links';
import { ResultCount } from '@/components/features/catalogue/result-count';
import { BuyingGuideCard } from '@/components/features/shopping/buying-guide-card';
import { CategoryCard } from '@/components/features/shopping/category-card';
import { ProductCard } from '@/components/features/shopping/product-card';
import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section, SectionHeader } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { JsonLd } from '@/components/shared/json-ld';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import {
  getBrandForProduct,
  getChildCategories,
  getGuidesForCategory,
  getProductsByCategory,
} from '@/data';
import { categories, categoryById, categoryBySlug } from '@/data/categories';
import { parseSort, sortProducts } from '@/lib/catalogue';
import { createBreadcrumbJsonLd, createMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const category = categoryBySlug.get(slug);
  if (!category) return createMetadata({ title: 'Category not found', noIndex: true });

  return createMetadata({
    title: category.name,
    path: ROUTES.category(category.slug),
    description: category.description,
    // Sorted views are the same products in another order.
    noIndex: Boolean(query['sort']),
  });
}

/**
 * One route, two shapes.
 *
 * A department lists the categories beneath it and everything in the branch; a
 * leaf category lists its own products and the guides written for it. Which
 * one renders is decided by `parentId` rather than by two near-identical
 * routes that would drift apart.
 */
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const category = categoryBySlug.get(slug);
  if (!category) notFound();

  const sort = parseSort(query['sort']);
  const children = getChildCategories(category.slug);
  const isDepartment = category.parentId === undefined;
  const parent = category.parentId ? categoryById.get(category.parentId) : undefined;

  const products = sortProducts(getProductsByCategory(category.slug), sort);
  const guides = getGuidesForCategory(category.slug);

  const crumbs = [
    { name: 'Home', path: ROUTES.home },
    { name: 'Categories', path: ROUTES.categories },
    ...(parent ? [{ name: parent.name, path: ROUTES.category(parent.slug) }] : []),
    { name: category.name, path: ROUTES.category(category.slug) },
  ];

  return (
    <PageWrapper
      eyebrow={parent ? parent.name : 'Department'}
      title={category.name}
      description={category.description}
      meta={
        <Breadcrumb
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Categories', href: ROUTES.categories },
            ...(parent ? [{ label: parent.name, href: ROUTES.category(parent.slug) }] : []),
            { label: category.name },
          ]}
        />
      }
    >
      {isDepartment && children.length > 0 ? (
        <Section spacing="md">
          <SectionHeader
            title={`Categories in ${category.name}`}
            headingAs="h2"
            headingId="subcategories-heading"
            description="Narrow down before comparing individual products."
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {children.map((child) => (
              <li key={child.id}>
                <CategoryCard category={child} headingAs="h3" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section spacing="md" surface={isDepartment ? 'muted' : 'none'} bordered={isDepartment}>
        <SectionHeader
          title={isDepartment ? `Everything in ${category.name}` : 'Products'}
          headingAs="h2"
          headingId="category-products-heading"
        />

        <div className="mb-6 flex flex-col gap-4">
          <SortLinks basePath={ROUTES.category(category.slug)} active={sort} />
          <Separator />
          <ResultCount count={products.length} />
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="Nothing researched here yet"
            description="This category is in the catalogue but has no finished research. Try the parent department."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  brand={getBrandForProduct(product)}
                  headingAs="h3"
                  priority={index < 4}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        )}
      </Section>

      {guides.length > 0 ? (
        <Section spacing="md" surface={isDepartment ? 'none' : 'muted'} bordered>
          <SectionHeader
            title="Guides for this category"
            headingAs="h2"
            headingId="category-guides-heading"
            description="Read these before comparing individual products."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.id}>
                <BuyingGuideCard
                  guide={guide}
                  category={category}
                  headingAs="h3"
                  ctaLabel="Read guide"
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Container>
        <JsonLd data={createBreadcrumbJsonLd(crumbs)} />
      </Container>
    </PageWrapper>
  );
}
