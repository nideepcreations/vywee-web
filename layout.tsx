import type { Metadata, Viewport } from 'next';

import '@/app/globals.css';

import { Providers } from '@/app/providers';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { JsonLd } from '@/components/shared/json-ld';
import { MAIN_CONTENT_ID, SkipLink } from '@/components/shared/skip-link';
import { SITE } from '@/constants/site';
import { fontVariables } from '@/lib/fonts';
import { createMetadata, createOrganisationJsonLd, createWebsiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [{ name: SITE.organisation.legalName, url: SITE.url }],
  creator: SITE.organisation.legalName,
  publisher: SITE.organisation.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  ...createMetadata(),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: SITE.themeColor.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language} suppressHydrationWarning className={fontVariables}>
      <body className="flex min-h-dvh flex-col antialiased">
        <Providers>
          <SkipLink />
          <Header />
          <main id={MAIN_CONTENT_ID} className="flex-1 focus-visible:outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
        <JsonLd data={[createOrganisationJsonLd(), createWebsiteJsonLd()]} />
      </body>
    </html>
  );
}
