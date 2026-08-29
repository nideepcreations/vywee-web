import * as React from 'react';

import { Section, SectionHeader } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { type IconName } from '@/constants/icons';
import { cn } from '@/lib/utils';

interface TrustPoint {
  readonly icon: IconName;
  readonly title: string;
  readonly body: string;
}

/** Bold icon-chip fill per point — same rotation as the category tiles and
 *  search chips, so the palette reads as one deliberate system rather than
 *  four different treatments per section. */
const ICON_TONES = [
  'bg-brand text-brand-foreground',
  'bg-accent text-accent-foreground',
  'bg-highlight text-highlight-foreground',
  'bg-success text-success-foreground',
] as const;

/**
 * Each point says what Vywee does, in terms that could be checked. "Honest
 * recommendations" on its own is a claim anyone can make; naming the specific
 * commitment behind it is what makes it worth reading.
 */
const TRUST_POINTS: readonly TrustPoint[] = [
  {
    icon: 'research',
    title: 'AI research',
    body: 'Specifications, long-term reviews and owner complaints are read together, so a pattern across hundreds of sources surfaces instead of one loud opinion.',
  },
  {
    icon: 'verified',
    title: 'Honest recommendations',
    body: 'Some links earn a commission. Which product we recommend is decided before that is checked, and a pick is dropped when it stops being the right answer.',
  },
  {
    icon: 'compare',
    title: 'Easy comparisons',
    body: 'Options are compared on what changes daily use — battery, thermals, running cost, repairability — not on whichever spec looks best on a box.',
  },
  {
    icon: 'deal',
    title: 'Live offers',
    body: 'Prices are tracked as a range across retailers, so a figure that has already moved is never presented as though it were current.',
  },
];

function WhyTrustVywee() {
  return (
    <Section
      spacing="lg"
      surface="muted"
      bordered
      containerSize="wide"
      aria-labelledby="trust-heading"
    >
      <SectionHeader
        eyebrow="How this works"
        title="Why trust Vywee"
        description="A research tool rather than a storefront. That distinction shows up in what we will and will not tell you."
        headingAs="h2"
        headingId="trust-heading"
        align="center"
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_POINTS.map((point, index) => (
          <li key={point.title}>
            <Card variant="outline" padding="lg" className="h-full gap-3 bg-background">
              <span
                className={cn(
                  'inline-flex size-11 items-center justify-center rounded-md',
                  ICON_TONES[index % ICON_TONES.length],
                )}
              >
                <Icon name={point.icon} size="md" />
              </span>
              <Heading as="h3" level="h4">
                {point.title}
              </Heading>
              <Text size="sm" tone="muted">
                {point.body}
              </Text>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export { TRUST_POINTS, WhyTrustVywee };
