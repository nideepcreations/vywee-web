import * as React from 'react';

import { cn } from '@/lib/utils';

export const MAIN_CONTENT_ID = 'main-content';

/**
 * First focusable element on every page. Keyboard users reach the content
 * without tabbing through the entire header.
 */
function SkipLink({ className }: { className?: string }) {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:top-3 focus:left-3 focus:z-[70]',
        'focus:rounded-md focus:bg-brand focus:px-4 focus:py-2.5',
        'focus:text-sm focus:font-medium focus:text-brand-foreground focus:shadow-lg',
        className,
      )}
    >
      Skip to main content
    </a>
  );
}

export { SkipLink };
