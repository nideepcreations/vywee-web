import { CategoryCard } from '@/components/features/shopping/category-card';
import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { countProductsInCategory, getChildCategories } from '@/data';
import { featuredCategories } from '@/data/categories';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Categories',
  path: ROUTES.categories,
  description:
    'Browse every department Vywee researches — electronics, fashion, home, beauty, kitchen and travel — and the categories nested under each.',
});

/**
 * Department index. Each department lists the categories nested beneath it, so
 * the hierarchy introduced by `parentId` is visible rather than implied.
 */
export default function CategoriesPage() {
  const departments = featuredCategories.map((department) => ({
    department,
    children: getChildCategories(department.slug),
    productCount: countProductsInCategory(department.slug),
  }));

  return (
    <PageWrapper
      eyebrow="Browse"
      title="Categories"
      description="Six departments, each broken down into the categories we actually research."
      meta={<Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Categories' }]} />}
    >
      <Section spacing="md" contained={false}>
        <Container className="flex flex-col gap-12">
          {departments.map(({ department, children, productCount }) => (
            <section key={department.id} aria-labelledby={`${department.slug}-heading`}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <Heading as="h2" id={`${department.slug}-heading`} level="h3">
                  {department.name}
                </Heading>
                <Text as="span" size="sm" tone="muted">
                  <span data-numeric>{productCount}</span>{' '}
                  {productCount === 1 ? 'product' : 'products'} researched
                </Text>
              </div>

              <Text size="sm" tone="muted" measure="base" className="mb-5">
                {department.description}
              </Text>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                <li>
                  <CategoryCard category={department} headingAs="h3" />
                </li>
                {children.map((child) => (
                  <li key={child.id}>
                    <CategoryCard category={child} headingAs="h3" />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </Section>
    </PageWrapper>
  );
}
