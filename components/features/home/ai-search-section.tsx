'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SearchInput } from '@/components/ui/search-input';
import { Heading, Text } from '@/components/ui/typography';
import { AI_SEARCH_ANCHOR } from '@/constants/site';
import { cn } from '@/lib/utils';

const EXAMPLE_QUERIES: readonly string[] = [
  'Best laptop under ₹60,000',
  'Best phone for photography',
  'Best AC for bedroom',
  'Best smartwatch for fitness',
];

export interface AiSearchSectionProps {
  onSearch?: (query: string) => void;
}

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
    <section
      id={AI_SEARCH_ANCHOR.replace('#', '')}
      className="scroll-mt-24 border-b border-border bg-background"
    >
      <div className="w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 xl:px-28">
        <div className="flex flex-col gap-10">
          
          <div className="max-w-4xl">
            <Heading as="h2" level="h2">
              Ask what you actually want to know
            </Heading>

            <Text
              tone="muted"
              measure="base"
              className="mt-3"
            >
              Describe the decision in your own words. Vywee reads the research
              and narrows it down.
            </Text>
          </div>

          <div className="w-full max-w-5xl">
            <form onSubmit={handleSubmit} role="search">
              <SearchInput
                ref={inputRef}
                size="lg"
                label="What are you looking to buy?"
                placeholder="What are you looking to buy today?"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                enterKeyHint="search"
                action={
                  <Button
                    type="submit"
                    size="md"
                    className="rounded-pill"
                    disabled={!query.trim()}
                  >
                    <span className="sr-only sm:not-sr-only">
                      Research
                    </span>
                    <Icon name="forward" size="sm" />
                  </Button>
                }
              />
            </form>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Text as="span" size="xs" tone="muted">
              Try one of these
            </Text>

            <ul className="flex flex-wrap gap-2">
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

          <p
            role="status"
            aria-live="polite"
            className="min-h-5 text-sm text-muted-foreground"
          >
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}

export { AiSearchSection, EXAMPLE_QUERIES };
