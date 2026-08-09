import * as React from 'react';

import { cn } from '@/lib/utils';

/** Placeholder block for streamed content. Always hidden from assistive tech. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('skeleton-shimmer rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
