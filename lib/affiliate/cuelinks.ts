/**
 * Cuelinks Monetization API (v3) — converts a plain retailer URL into a
 * tracked affiliate link.
 *
 * Server-only: `CUELINKS_API_KEY` is never exposed to the client. If the key
 * is missing, `convertToAffiliateLink` returns `null` rather than throwing,
 * the same fallback shape as `lib/ai/provider.ts` — a missing integration
 * degrades a feature, it never breaks the page.
 *
 * Docs: https://developers.cuelinks.com/docs/reference/links/convert
 */

interface CuelinksConvertResponse {
  data?: {
    tracking_url?: string;
    short_url?: string;
    affiliated?: boolean;
    original_url?: string;
    campaign?: { id?: number; name?: string };
  };
}

export interface AffiliateLinkResult {
  /** The link to actually publish on the product page. */
  url: string;
  /** Whether Cuelinks confirmed this merchant is one you're approved for. */
  affiliated: boolean;
  /** Merchant name Cuelinks matched the URL to, when available. */
  retailer?: string;
}

/**
 * Converts a retailer product URL into a tracked Cuelinks link.
 *
 * Returns `null` when `CUELINKS_API_KEY` is unset, the request fails, or the
 * merchant isn't one you're approved for (`affiliated: false`) — callers
 * should treat `null` as "paste the link manually for now", not as an error
 * to surface to a visitor.
 */
export async function convertToAffiliateLink(
  productUrl: string,
  options?: { shorten?: boolean },
): Promise<AffiliateLinkResult | null> {
  const apiKey = process.env['CUELINKS_API_KEY'];
  if (!apiKey) return null;

  try {
    const response = await fetch('https://developers.cuelinks.com/pub_api/v3/links/convert', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: productUrl,
        shorten: options?.shorten ?? true,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const body = (await response.json()) as CuelinksConvertResponse;
    const data = body.data;
    if (!data) return null;

    // Prefer the short_url (clnk.in) when shortening was requested and it
    // came back; otherwise fall back to the full tracking_url.
    const url = data.short_url ?? data.tracking_url;
    if (!url) return null;

    return {
      url,
      affiliated: data.affiliated ?? false,
      retailer: data.campaign?.name,
    };
  } catch {
    // Network failure, timeout, or malformed response — same non-fatal
    // fallback as the AI search provider.
    return null;
  }
}
