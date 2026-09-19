import * as React from 'react';

import type { ProductVerdict as Verdict } from '@/types';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export interface ProductVerdictProps extends React.HTMLAttributes<HTMLDivElement> {
  verdict: Verdict;
  headingAs?: 'h2' | 'h3';
}

/**
 * The verdict block: summary, what is good, what is not, and who it suits.
 *
 * Pros and cons are separate lists with their own visible headings rather than
 * one two-column grid, so the two are never confused when the layout collapses
 * on a phone. The icons repeat information the heading already carries and are
 * therefore hidden from assistive tech.
 */
function ProductVerdict({ verdict, headingAs = 'h2', className, ...props }: ProductVerdictProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)} {...props}>
      <div className="flex flex-col gap-2">
        <Heading as={headingAs} level="h3">
          Our verdict
        </Heading>
        <Text size="lg" measure="base">
          {verdict.summary}
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card variant="outline" padding="md" className="gap-3">
          <Heading as="h3" level="h4" className="text-base">
            What works
          </Heading>
          <ul className="flex flex-col gap-2">
            {verdict.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm">
                <Icon name="pro" size="sm" tone="success" className="mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="outline" padding="md" className="gap-3">
          <Heading as="h3" level="h4" className="text-base">
            What does not
          </Heading>
          <ul className="flex flex-col gap-2">
            {verdict.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm">
                <Icon name="con" size="sm" tone="danger" className="mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card variant="plain" padding="md" className="gap-1">
        <Text as="span" size="xs" tone="muted" weight="medium" className="uppercase">
          Best for
        </Text>
        <Text size="sm">{verdict.bestFor}</Text>
      </Card>
    </div>
  );
}

export { ProductVerdict };
