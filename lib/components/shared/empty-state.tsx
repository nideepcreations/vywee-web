import type { LucideIcon } from 'lucide-react';
import { SearchX } from 'lucide-react';
import * as React from 'react';

import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** An empty screen is an invitation to act — give it one. */
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-6 py-14 text-center',
        className,
      )}
    >
      <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      <Heading as="h3" level="h4">
        {title}
      </Heading>
      {description ? (
        <Text tone="muted" size="sm" className="max-w-sm">
          {description}
        </Text>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
