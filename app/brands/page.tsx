import { BrandCard } from '@/components/features/shopping/brand-card';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section, SectionHeader } from '@/components/layout/section';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ROUTES } from '@/constants/routes';
import { getProductsByBrand } from '@/data';
import { brands } from '@/data/brands';
import { categoryBySlug } from '@/data/categories';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Brands',
  path: ROUTES.brands,
  description:
    'The brands Vywee tracks, what each is genuinely good at, and how many of their products we have researched.',
});

function categoryNamesFor(strongIn: readonly string[]): readonly string[] {
  return strongIn
    .map((slug) => categoryBySlug.get(slug)?.name)
    .filter((name): name is string => name !== undefined);
}

/**
 * Featured brands lead, the rest follow alphabetically. Splitting them keeps
 * the page useful without ranking brands against each other, which we have no
 * basis to do.
 */
export default function BrandsPage() {
  const featured = brands.filter((brand) => brand.featured);
  const others = brands
    .filter((brand) => !brand.featured)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageWrapper
      eyebrow="Catalogue"
      title="Brands"
      description="Who makes what, and what each one is actually known for."
      meta={<Breadcrumb items={[{ label: 'Home', href: ROUTES.home }, { label: 'Brands' }]} />}
    >
      <Section spacing="md">
        <SectionHeader
          title="Featured brands"
          headingAs="h2"
          headingId="featured-brands-heading"
          description="Brands with a consistent record across the categories we research."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((brand) => (
            <li key={brand.id}>
              <BrandCard
                brand={brand}
                categoryNames={categoryNamesFor(brand.strongIn)}
                productCount={getProductsByBrand(brand.slug).length}
                headingAs="h3"
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="md" surface="muted" bordered>
        <SectionHeader
          title="All brands"
          headingAs="h2"
          headingId="all-brands-heading"
          description="Everything else we track, A to Z."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((brand) => (
            <li key={brand.id}>
              <BrandCard
                brand={brand}
                categoryNames={categoryNamesFor(brand.strongIn)}
                productCount={getProductsByBrand(brand.slug).length}
                headingAs="h3"
                className="h-full bg-background"
              />
            </li>
          ))}
        </ul>
      </Section>
    </PageWrapper>
  );
}
