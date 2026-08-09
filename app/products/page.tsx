import type { Metadata } from 'next';

import { FilterChips, type FilterOption } from '@/components/features/catalogue/filter-chips';
import { ResultCount } from '@/components/features/catalogue/result-count';
import { SortLinks } from '@/components/features/catalogue/sort-links';
import { ProductCard } from '@/components/features/shopping/product-card';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { EmptyState } from '@/components/shared/empty-state';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
import {
  countProductsInCategory,
  getBrandForProduct,
  getCategoryDescendants,
  productLookups,
} from '@/data';
import { featuredCategories } from '@/data/categories';
import { products } from '@/data/products';
import { filterProducts, parseSort, SORT_LABELS, sortProducts } from '@/lib/catalogue';
import { createMetadata } from '@/lib/seo';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Filtered and sorted views are excluded from indexing.
 *
 * `?sort=` and `?category=` produce many URLs over the same set of products;
 * letting crawlers index them would split ranking signal across near-duplicate
 * pages. The unfiltered page is the canonical one.
 */
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = typeof params['category'] === 'string' ? params['category'] : undefined;
  const isNarrowed = Boolean(category) || Boolean(params['sort']);

  const department = featuredCategories.find((entry) => entry.slug === category);

  return createMetadata({
    title: department ? `${department.name} products` : 'All products',
    path: ROUTES.products,
    description:
      'Every product Vywee has researched, with tracked price ranges, verdicts and the trade-offs that matter after month three.',
    noIndex: isNarrowed,
  });
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = typeof params['category'] === 'string' ? params['category'] : undefined;
  const sort = parseSort(params['sort']);

  // A department filter has to match everything nested beneath it, so the
  // selected slug is expanded to its whole branch before filtering.
  const categorySlugs = activeCategory
    ? getCategoryDescendants(activeCategory).map((category) => category.slug)
    : undefined;

  const filtered = filterProducts(products, { categorySlugs }, productLookups);
  const visible = sortProducts(filtered, sort);

  const categoryOptions: readonly FilterOption[] = featuredCategories.map((category) => ({
    label: category.name,
    value: category.slug,
    count: countProductsInCategory(category.slug),
  }));

  const preserve = { category: activeCategory, sort: sort === 'relevance' ? undefined : sort };

  return (
    <PageWrapper
      eyebrow="Catalogue"
      title="All products"
      description="Everything we have researched so far, with tracked price ranges and an honest verdict on each."
      meta={<Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Products' }]} />}
    >
      <Section spacing="md">
        <div className="flex flex-col gap-5">
          <FilterChips
            legend="Filter by department"
            basePath={ROUTES.products}
            paramKey="category"
            options={categoryOptions}
            active={activeCategory}
            preserve={preserve}
          />
          <SortLinks basePath={ROUTES.products} active={sort} preserve={preserve} />
          <Separator />
          <ResultCount count={visible.length} />
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="No products match this filter"
            description="Nothing has been researched in this department yet. Try another one, or browse everything."
            className="mt-8"
          />
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product, index) => (
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

        <p className="sr-only">Sorted by {SORT_LABELS[sort]}.</p>
      </Section>
    </PageWrapper>
  );
}
