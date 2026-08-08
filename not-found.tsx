import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({ title: 'Page not found', noIndex: true });

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <Eyebrow>404</Eyebrow>
      <Heading as="h1" level="h1">
        This page does not exist
      </Heading>
      <Lead className="text-center">
        The link may be out of date, or the product was removed from the catalogue.
      </Lead>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button asChild>
          <Link href={ROUTES.home}>Go to homepage</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={ROUTES.categories}>Browse categories</Link>
        </Button>
      </div>
    </Container>
  );
}
