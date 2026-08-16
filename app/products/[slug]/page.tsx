import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { OfferCard } from '@/components/features/shopping/offer-card';
import { PriceTag } from '@/components/features/shopping/price-tag';
import { ProductVerdict } from '@/components/features/shopping/product-verdict';
import { RelatedProducts } from '@/components/features/shopping/related-products';
import { SpecTable } from '@/components/features/shopping/spec-table';
import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Section } from '@/components/layout/section';
import { JsonLd } from '@/components/shared/json-ld';
import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Rating } from '@/components/ui/rating';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { AVAILABILITY_META } from '@/constants/shopping';
import {
  getBrandForProduct,
  getCategoryForProduct,
  getOffersForProduct,
  getRelatedProducts,
} from '@/data';
import { brandById } from '@/data/brands';
import { products, productBySlug } from '@/data/products';
import { formatDate } from '@/lib/format';
import { createBreadcrumbJsonLd, createMetadata, createProductJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every product is known at build time, so unknown slugs 404 rather than render. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) return createMetadata({ title: 'Product not found', noIndex: true });

  const brand = getBrandForProduct(product);

  return createMetadata({
    // Most product names already start with the brand; prefixing again gives
    // "Sonova Sonova Arc 900".
    title:
      brand && !product.name.toLowerCase().startsWith(brand.name.toLowerCase())
        ? `${brand.name} ${product.name}`
        : product.name,
    path: ROUTES.product(product.slug),
    description: `${product.headline}. ${product.verdict.summary}`,
    image: product.image.src,
    keywords: product.tags,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug.get(slug);
  if (!product) notFound();

  const brand = getBrandForProduct(product);
  const category = getCategoryForProduct(product);
  const offers = getOffersForProduct(product.id);
  const related = getRelatedProducts(product, 4);
  const availability = AVAILABILITY_META[product.availability];

  const crumbs = [
    { name: 'Home', path: ROUTES.home },
    { name: 'Products', path: ROUTES.products },
    { name: product.name, path: ROUTES.product(product.slug) },
  ];

  return (
    <PageWrapper withHeader={false}>
      <Container className="pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Products', href: ROUTES.products },
            ...(category ? [{ label: category.name, href: ROUTES.category(category.slug) }] : []),
            { label: product.name },
          ]}
        />
      </Container>

      <Section spacing="md">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <SmartImage
            asset={product.image}
            aspect="4/3"
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            containerClassName="rounded-xl border border-border"
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {product.editorsPick ? (
                <Badge variant="brand" size="sm">
                  <Icon name="verified" size="xs" />
                  Vywee Choice
                </Badge>
              ) : null}
              {brand ? (
                <Badge variant="neutral" size="sm" asChild>
                  <Link href={ROUTES.brand(brand.slug)}>{brand.name}</Link>
                </Badge>
              ) : null}
              {category ? (
                <Badge variant="neutral" size="sm" asChild>
                  <Link href={ROUTES.category(category.slug)}>{category.name}</Link>
                </Badge>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Heading as="h1" level="h1">
                {product.name}
              </Heading>
              <Text size="lg" tone="muted" measure="base">
                {product.headline}
              </Text>
            </div>

            <Rating value={product.rating} count={product.reviewCount} size="lg" />

            <div className="flex flex-col gap-1">
              <PriceTag band={product.priceBand} size="lg" exact />
              <Text
                as="span"
                size="sm"
                weight="medium"
                className={
                  availability.tone === 'success'
                    ? 'text-success'
                    : availability.tone === 'warning'
                      ? 'text-warning'
                      : 'text-muted-foreground'
                }
              >
                {availability.label}
              </Text>
            </div>

            {/* Primary action. Retailer links land in a later sprint and will
                take this slot without a layout change. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={ROUTES.offers}>
                  See offers
                  <Icon name="deal" size="sm" />
                </Link>
              </Button>
              {category ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={ROUTES.category(category.slug)}>Compare in {category.name}</Link>
                </Button>
              ) : null}
            </div>

            <Text size="xs" tone="muted">
              Researched {formatDate(product.updatedAt)}. Prices are tracked across retailers and
              change often.
            </Text>
          </div>
        </div>
      </Section>

      <Section spacing="md" surface="muted" bordered>
        <ProductVerdict verdict={product.verdict} headingAs="h2" />
      </Section>

      <Section spacing="md">
        <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">
          <section aria-labelledby="specs-heading">
            <Heading as="h2" id="specs-heading" level="h3" className="mb-4">
              Specifications
            </Heading>
            <SpecTable specs={product.specs} />
          </section>

          <section aria-labelledby="offers-heading">
            <Heading as="h2" id="offers-heading" level="h3" className="mb-4">
              Current offers
            </Heading>
            {offers.length === 0 ? (
              <Text size="sm" tone="muted">
                No verified offers on this product right now. We add them as we check them.
              </Text>
            ) : (
              <ul className="flex flex-col gap-4">
                {offers.map((offer) => (
                  <li key={offer.id}>
                    <OfferCard
                      offer={offer}
                      brand={offer.brandId ? brandById.get(offer.brandId) : undefined}
                      href={ROUTES.offers}
                      headingAs="h3"
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </Section>

      <Section spacing="md" surface="muted" bordered>
        <RelatedProducts products={related} brandFor={getBrandForProduct} />
      </Section>

      <JsonLd data={[createProductJsonLd(product, brand), createBreadcrumbJsonLd(crumbs)]} />
    </PageWrapper>
  );
}
