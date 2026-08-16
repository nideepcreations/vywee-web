import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

/**
 * Placeholder. The footer links here, so the route must resolve rather than
 * 404 — but publishing invented legal text would be worse than saying plainly
 * that the document is not ready. Replace this body with reviewed copy;
 * remove `noIndex` at the same time.
 */
export const metadata = createMetadata({
  title: 'Terms of use',
  path: ROUTES.terms,
  description: 'The terms that apply when you use this site.',
  noIndex: true,
});

export default function TermsPage() {
  return (
    <PageWrapper
      eyebrow="Legal"
      title="Terms of use"
      description="The terms that apply when you use this site."
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-5 pt-8">
        <Text leading="relaxed">
          This document is being prepared and is not yet published. Until it is, no part of this
          page should be relied on as a statement of our policy.
        </Text>
        <Text leading="relaxed">
          If you need this information before it is published, write to {SITE.contactEmail} and we
          will answer directly.
        </Text>
      </Container>
    </PageWrapper>
  );
}
