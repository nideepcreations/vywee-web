'use client';

import * as React from 'react';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/typography';

interface ConvertResult {
  url: string;
  affiliated: boolean;
  retailer?: string;
}

/**
 * Internal utility: paste a retailer product URL, get back a tracked
 * Cuelinks affiliate link. The page shell (`page.tsx`) carries the `noIndex`
 * metadata — this component is just the interactive form, since a client
 * component can't export `metadata` itself.
 */
export function ConvertLinkForm() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState<ConvertResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch('/api/affiliate/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input.trim() }),
      });
      const data = (await response.json()) as ConvertResult & { error?: string };
      if (!response.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }
      setResult(data);
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.url);
    setCopied(true);
  }

  return (
    <Container size="prose" className="flex flex-col gap-6 pt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://www.ajio.com/product/..."
          className="h-11 flex-1 rounded-md border border-input bg-surface px-4 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Converting…' : 'Convert'}
        </Button>
      </form>

      {error ? (
        <Text className="text-danger" leading="relaxed">
          {error}
        </Text>
      ) : null}

      {result ? (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
          <Text weight="semibold">
            {result.affiliated
              ? `Affiliated${result.retailer ? ` — ${result.retailer}` : ''}`
              : 'Not affiliated — this merchant is not approved on your Cuelinks account yet.'}
          </Text>
          <code className="rounded bg-muted px-3 py-2 text-sm break-all">{result.url}</code>
          <Button type="button" variant="secondary" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
      ) : null}
    </Container>
  );
}
