import * as React from 'react';

import { Text } from '@/components/ui/typography';

export interface ResultCountProps {
  count: number;
  /** Singular noun, e.g. "product". Pluralised by appending "s". */
  noun?: string;
  className?: string;
}

/**
 * Announces how many results a filter produced.
 *
 * `role="status"` means the count is read out when filtering changes the page,
 * which is otherwise a silent update for anyone not looking at the grid.
 */
function ResultCount({ count, noun = 'product', className }: ResultCountProps) {
  return (
    <Text as="p" size="sm" tone="muted" role="status" className={className}>
      <span data-numeric>{count}</span> {count === 1 ? noun : `${noun}s`}
    </Text>
  );
}

export { ResultCount };
