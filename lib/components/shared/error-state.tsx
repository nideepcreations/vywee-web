'use client';

import { RotateCw, TriangleAlert } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

/** Says what happened and what to do next. No apology, no vague wording. */
function ErrorState({
  title = 'This section did not load',
  description = 'The content could not be fetched. Try again — if it keeps failing, the source is likely down.',
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface px-6 py-14 text-center',
        className,
      )}
    >
      <TriangleAlert className="size-8 text-danger" aria-hidden="true" />
      <Heading as="h3" level="h4">
        {title}
      </Heading>
      <Text tone="muted" size="sm" className="max-w-md">
        {description}
      </Text>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          <RotateCw aria-hidden="true" />
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { ErrorState };
