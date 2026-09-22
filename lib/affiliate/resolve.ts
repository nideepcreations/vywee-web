import type { Offer } from '@/types';

import { reportBuildNotice } from '@/lib/observability';

import { convertToAffiliateLink } from './cuelinks';

/**
 * Turns the raw retailer URLs stored in the catalogue into tracked affiliate
 * links, so adding a product never needs a manual conversion step: paste the
 * plain retailer URL into `data/offers.ts` as `retailerUrl` and the tracked
 * link is generated here.
 *
 * This runs while pages are being generated — at build time for the static
 * routes, which is every route that shows an offer. The tracked link is baked
 * into the HTML, so a visitor's click costs no API call and Cuelinks being
 * slow can never slow down the site itself.
 *
 * Failure is always non-fatal. If the key is missing, the API is down, or the
 * merchant is not one you are approved for, the offer falls back to the
 * hand-entered `buyUrl` if it has one, and otherwise to the raw retailer URL —
 * an un-monetised but working link. A deploy never fails, and a product page
 * never ships a dead button, because a third-party API had a bad minute.
 */

/**
 * Cached per URL for the lifetime of the process. A build is one process, so
 * a URL that appears on both the offers index and a product page is converted
 * once. The promise is cached rather than the result, so two pages resolving
 * the same URL at the same time share a single in-flight request.
 */
const inFlight = new Map<string, Promise<string>>();

function resolveOne(retailerUrl: string, fallbackUrl: string | undefined): Promise<string> {
  const cached = inFlight.get(retailerUrl);
  if (cached) return cached;

  const pending = convertToAffiliateLink(retailerUrl).then((result) => {
    if (result?.affiliated) return result.url;

    // Not converted. Say so once, in the build log, naming the URL — a silent
    // fallback would mean shipping an un-monetised link without noticing.
    reportBuildNotice(
      `[affiliate] Not converted, falling back for: ${retailerUrl}` +
        (result ? ' (merchant not affiliated on this account)' : ' (no key, or request failed)'),
    );
    return fallbackUrl ?? retailerUrl;
  });

  inFlight.set(retailerUrl, pending);
  return pending;
}

/**
 * Returns the offers with `buyUrl` filled in from `retailerUrl` where one is
 * set. Offers that already carry a hand-made `buyUrl` and no `retailerUrl`
 * are passed through untouched, so links generated before this existed (the
 * EarnKaro ones) keep working exactly as they did.
 */
export async function resolveOfferLinks(offers: readonly Offer[]): Promise<Offer[]> {
  return Promise.all(
    offers.map(async (offer) => {
      if (!offer.retailerUrl) return offer;
      const buyUrl = await resolveOne(offer.retailerUrl, offer.buyUrl);
      return { ...offer, buyUrl };
    }),
  );
}
