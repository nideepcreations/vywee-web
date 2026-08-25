import { categories } from '@/data/categories';

import { interpretQueryWithRules, type SearchInterpretation } from './interpret-query';
import type { ProductSortKey } from '@/lib/catalogue';
import { PRODUCT_SORT_KEYS } from '@/lib/catalogue';

const SYSTEM_PROMPT = `You are the search interpreter for Vywee, a product research site. You do not
recommend or rank products yourself — you translate a shopper's question into a
structured filter for a catalogue search, and write one honest sentence
describing what you're showing them.

Categories available: ${categories.map((c) => c.slug).join(', ')}.
Sort options: ${PRODUCT_SORT_KEYS.join(', ')}.

Reply with ONLY a JSON object, no other text:
{"summary": string, "categorySlugs": string[], "maxPrice": number | null, "sort": string}

The summary must be one plain sentence, under 30 words, describing what is
being shown. Never claim a product is "the best" in absolute terms — Vywee's
principle is to show trade-offs, not verdicts, at the search stage.`;

interface AiSearchResponse {
  summary: string;
  categorySlugs?: string[];
  maxPrice?: number | null;
  sort?: string;
}

function parseAiJson(text: string): AiSearchResponse | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as AiSearchResponse;
  } catch {
    return null;
  }
}

/** Narrows and clamps whatever the model returned to values the catalogue understands. */
function toInterpretation(parsed: AiSearchResponse): SearchInterpretation | null {
  if (!parsed.summary) return null;

  const validCategories = new Set(categories.map((c) => c.slug));
  const categorySlugs = (parsed.categorySlugs ?? []).filter((slug) => validCategories.has(slug));
  const sort = (PRODUCT_SORT_KEYS as readonly string[]).includes(parsed.sort ?? '')
    ? (parsed.sort as ProductSortKey)
    : 'relevance';

  return {
    summary: parsed.summary,
    filters: {
      categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
      maxPrice: parsed.maxPrice ?? undefined,
    },
    sort,
    categorySlugs: categorySlugs.length > 0 ? categorySlugs : undefined,
    source: 'ai',
  };
}

/**
 * Calls OpenAI's Chat Completions API if `OPENAI_API_KEY` is set.
 *
 * GPT-5 mini is the configured default: at roughly $0.13 input / $1 output
 * per million tokens it is the cheapest model that reliably follows a strict
 * JSON-only instruction, which matters more here than raw reasoning quality —
 * this call classifies a query, it does not write the recommendation itself.
 * `response_format: json_object` is used rather than relying on prompt
 * discipline alone, so a malformed reply is rare rather than merely unlikely.
 */
async function callOpenAi(query: string): Promise<SearchInterpretation | null> {
  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env['OPENAI_SEARCH_MODEL'] ?? 'gpt-5-mini',
        response_format: { type: 'json_object' },
        max_completion_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content;
    if (!text) return null;

    const parsed = parseAiJson(text);
    return parsed ? toInterpretation(parsed) : null;
  } catch {
    // Network failure, timeout, rate limit, or malformed response. The caller
    // falls back to the rule-based interpreter — search must never go down
    // because a third-party API call failed.
    return null;
  }
}

/**
 * Interprets a search query, preferring AI when a provider is configured and
 * reachable, and always falling back to deterministic rules. This function is
 * the one integration point: nothing else in the app knows whether AI is
 * involved, or which provider answered.
 */
export async function interpretQuery(query: string): Promise<SearchInterpretation> {
  const aiResult = await callOpenAi(query);
  return aiResult ?? interpretQueryWithRules(query);
}
