import { NextResponse } from 'next/server';

import { interpretQuery } from '@/lib/ai/provider';

export const runtime = 'nodejs';

/**
 * Server-only search interpreter. The frontend never holds an AI provider key
 * and never calls a provider directly — every query passes through this route,
 * which is what the architecture doc means by "AI should always work through
 * one internal service."
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const query = (body as { query?: unknown }).query;
  if (typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json({ error: 'A search query is required' }, { status: 400 });
  }
  if (query.length > 300) {
    return NextResponse.json({ error: 'Query is too long' }, { status: 400 });
  }

  const interpretation = await interpretQuery(query.trim());
  return NextResponse.json(interpretation);
}
