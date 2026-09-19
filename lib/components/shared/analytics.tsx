import Script from 'next/script';

import { env } from '@/lib/env';

/**
 * Google Analytics 4, loaded only when a real measurement ID is configured.
 *
 * `NEXT_PUBLIC_ANALYTICS_ID` was declared and validated in `lib/env.ts` from
 * early on but never actually consumed anywhere — this is the first thing
 * to read it. Same pattern as the AI search key: the feature is entirely
 * absent, not broken, when the env var is unset, so nothing here has any
 * effect (no script tag, no network request, no cost) until a real ID is
 * added in the hosting provider's environment variables.
 *
 * `next/script` with `strategy="afterInteractive"` loads this after the page
 * is interactive rather than blocking the initial render — analytics should
 * never be what a visitor's first paint is waiting on.
 */
function Analytics() {
  const measurementId = env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

export { Analytics };
