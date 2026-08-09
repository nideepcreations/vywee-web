import * as React from 'react';

import { cn } from '@/lib/utils';

/** Visible to screen readers only; still reachable and readable in the DOM order. */
function VisuallyHidden({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('sr-only', className)} {...props} />;
}

export { VisuallyHidden };
