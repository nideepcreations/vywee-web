import { PageWrapper } from '@/components/layout/page-wrapper';
import { createMetadata } from '@/lib/seo';

import { ConvertLinkForm } from './convert-link-form';

/**
 * Internal utility, not a page a visitor should land on: not linked from any
 * nav, blocked in `robots.ts`, and `noIndex` here as a second layer in case
 * something ever links to it directly.
 */
export const metadata = createMetadata({
  title: 'Convert a link',
  path: '/admin/convert-link',
  description: 'Internal tool: convert a retailer URL into a tracked Cuelinks affiliate link.',
  noIndex: true,
});

export default function ConvertLinkPage() {
  return (
    <PageWrapper
      eyebrow="Internal tool"
      title="Convert a link"
      description="Paste a retailer product URL. Get back the tracked affiliate link to use on the product page."
      size="prose"
    >
      <ConvertLinkForm />
    </PageWrapper>
  );
}
