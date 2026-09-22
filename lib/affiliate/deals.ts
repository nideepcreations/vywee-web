import type { Offer, OfferId, OfferKind, Slug } from '@/types';

import { categories } from '@/data/categories';
import { reportBuildNotice } from '@/lib/observability';

/**
 * Live deals pulled from the Cuelinks offers feed.
 *
 * These are NOT the same thing as the offers in `data/offers.ts`. Those are
 * hand-checked against a product this site has actually researched. These are
 * listed automatically from the affiliate network and nobody here has looked
 * at them — which is why they render in their own section, under their own
 * heading, rather than being mixed into the verified ones. The site's promise
 * is that a verified offer was verified; quietly padding that list with an
 * automated feed would break it.
 *
 * They arrive with a tracking URL already attached, so unlike `resolve.ts`
 * there is no per-deal conversion call to make.
 */

interface CuelinksOffer {
  id: number;
  title: string;
  description: string | null;
  coupon_code: string | null;
  offer_type: string | null;
  campaign_name: string | null;
  categories: { id: number; name: string }[] | null;
  tracking_url: string | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
  percent_off: number | null;
}

interface CuelinksOffersResponse {
  data?: CuelinksOffer[];
}

/** How many network deals to show. A feed of 1,000 is a dump, not a page. */
const MAX_DEALS = 12;

/** Pulled per request before filtering, since most of the feed is off-topic. */
const FETCH_SIZE = 200;

/**
 * Cuelinks' own category names do not match this site's, and never will.
 * Rather than maintaining a mapping table that silently rots as either side
 * adds categories, a deal is kept when either name contains the other —
 * "Health & Beauty" keeps a Beauty deal, "Electronics" matches exactly.
 */
const siteCategoryNames = categories.map((category) => category.name.toLowerCase());

function isRelevant(deal: CuelinksOffer): boolean {
  const dealCategories = (deal.categories ?? []).map((category) => category.name.toLowerCase());
  return dealCategories.some((dealCategory) =>
    siteCategoryNames.some(
      (siteCategory) => dealCategory.includes(siteCategory) || siteCategory.includes(dealCategory),
    ),
  );
}

/** The feed's `offer_type` is free text; anything with a code is a coupon. */
function toOfferKind(deal: CuelinksOffer): OfferKind {
  return deal.coupon_code ? 'coupon' : 'price-drop';
}

/**
 * Shapes a feed entry into the `Offer` the existing card already renders, so
 * network deals look like part of the site rather than a bolted-on widget.
 * `productIds` is empty because these are not tied to anything researched
 * here — the card already handles that by linking to the offers index.
 */
function toOffer(deal: CuelinksOffer): Offer | null {
  if (!deal.tracking_url || !deal.title) return null;

  return {
    id: `offer_cuelinks_${deal.id}` as OfferId,
    slug: `cuelinks-${deal.id}` as Slug,
    name: deal.title,
    kind: toOfferKind(deal),
    retailer: deal.campaign_name ?? 'Partner store',
    description: deal.description?.trim() || 'Listed by our affiliate network.',
    ...(deal.percent_off ? { discountPercent: deal.percent_off } : {}),
    ...(deal.coupon_code ? { code: deal.coupon_code } : {}),
    productIds: [],
    startsAt: new Date(deal.start_date ?? Date.now()).toISOString(),
    expiresAt: new Date(deal.end_date ?? Date.now()).toISOString(),
    buyUrl: deal.tracking_url,
  };
}

/**
 * Fetches live network deals, filtered to this site's categories.
 *
 * Returns an empty array on any failure — no key, network error, bad shape.
 * The caller renders nothing in that case, so an outage at the network costs
 * a section, never the page.
 */
export async function fetchLiveDeals(): Promise<Offer[]> {
  const apiKey = process.env['CUELINKS_API_KEY'];
  if (!apiKey) return [];

  try {
    const response = await fetch(
      `https://developers.cuelinks.com/pub_api/v3/offers?per_page=${FETCH_SIZE}`,
      {
        headers: { Authorization: `Token ${apiKey}` },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      reportBuildNotice(`[deals] Cuelinks offers feed returned ${response.status}`);
      return [];
    }

    const body = (await response.json()) as CuelinksOffersResponse;
    const now = Date.now();

    return (
      (body.data ?? [])
        .filter((deal) => deal.status === 'live')
        .filter(isRelevant)
        .map(toOffer)
        .filter((offer): offer is Offer => offer !== null)
        // A feed entry can still carry a past end date; the site never shows a
        // deal it knows has already lapsed.
        .filter((offer) => new Date(offer.expiresAt).getTime() >= now)
        .slice(0, MAX_DEALS)
    );
  } catch {
    reportBuildNotice('[deals] Could not reach the Cuelinks offers feed');
    return [];
  }
}
