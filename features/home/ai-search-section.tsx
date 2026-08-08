'use client';

import * as React from 'react';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SearchInput } from '@/components/ui/search-input';
import { Heading, Text } from '@/components/ui/typography';
import { AI_SEARCH_ANCHOR } from '@/constants/site';
import { cn } from '@/lib/utils';

/** Example questions. Phrased as decisions, not keywords. */
const EXAMPLE_QUERIES: readonly string[] = [
  'Best laptop under ₹60,000',
  'Best phone for photography',
  'Best AC for bedroom',
  'Best smartwatch for fitness',
];

export interface AiSearchSectionProps {
  /**
   * Handles a submitted query. Left unset until the search sprint lands; the
   * section reports its own status rather than navigating to a route that
   * does not exist yet.
   */
  onSearch?: (query: string) => void;
}

/**
 * The one client island on the homepage.
 *
 * State is needed because the example chips fill the field rather than
 * navigating — they teach the kind of question the product answers, which a
 * link to a results page could not do while search is unbuilt. Everything else
 * on this page stays a server component.
 */
function AiSearchSection({ onSearch }: AiSearchSectionProps) {
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (onSearch) {
      onSearch(trimmed);
      return;
    }
    setStatus(`Search is not connected yet. Your question was: ${trimmed}`);
  };

  const applyExample = (example: string) => {
    setQuery(example);
    setStatus('');
    inputRef.current?.focus();
  };

  return (
    <section id={AI_SEARCH_ANCHOR.replace('#', '')} className="scroll-mt-24">
      <Container className="flex flex-col items-center gap-6 py-14 md:py-20">
        <div className="flex flex-col items-center gap-2 text-center">
          <Heading as="h2" level="h2">
            Ask what you actually want to know
          </Heading>
          <Text tone="muted" measure="base">
            Describe the decision in your own words. Vywee reads the research and narrows it down.
          </Text>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl" role="search">
          <SearchInput
            ref={inputRef}
            size="lg"
            label="What are you looking to buy?"
            placeholder="What are you looking to buy today?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            enterKeyHint="search"
            action={
              <Button type="submit" size="md" className="rounded-pill" disabled={!query.trim()}>
                <span className="sr-only sm:not-sr-only">Research</span>
                <Icon name="forward" size="sm" />
              </Button>
            }
          />
        </form>

        <div className="flex w-full max-w-3xl flex-col items-center gap-3">
          <Text as="span" size="xs" tone="muted">
            Try one of these
          </Text>
          <ul className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_QUERIES.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  onClick={() => applyExample(example)}
                  className={cn(
                    'inline-flex min-h-12 items-center rounded-pill border border-border bg-surface px-4',
                    'text-sm text-muted-foreground',
                    'transition-colors duration-fast ease-standard',
                    'hover:border-border-strong hover:text-foreground',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  )}
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
          {status}
        </p>
      </Container>
    </section>
  );
}

export { AiSearchSection, EXAMPLE_QUERIES };
