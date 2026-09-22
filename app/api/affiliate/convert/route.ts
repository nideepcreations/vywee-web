import { NextResponse } from 'next/server';

import { convertToAffiliateLink } from '@/lib/affiliate/cuelinks';

export const runtime = 'nodejs';

/**
 * Server-only affiliate link conversion. The frontend never holds the
 * Cuelinks API key — every conversion passes through this route, the same
 * shape as `/api/ai-search`. Backs the `/admin/convert-link` utility page.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const url = (body as { url?: unknown }).url;
  if (typeof url !== 'string' || url.trim().length === 0) {
    return NextResponse.json({ error: 'A product URL is required' }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url.trim());
  } catch {
    return NextResponse.json({ error: 'That is not a valid URL' }, { status: 400 });
  }

  const result = await convertToAffiliateLink(parsedUrl.toString());
  if (!result) {
    return NextResponse.json(
      {
        error:
          'Could not convert this link. Either CUELINKS_API_KEY is not set, the request failed, or this merchant is not one you are approved for yet.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json(result);
}
