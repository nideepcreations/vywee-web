import Link from 'next/link';
import * as React from 'react';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { AI_SEARCH_ANCHOR } from '@/constants/site';

/**
 * The page's only h1.
 *
 * Both calls to action lead downward rather than away: the primary one scrolls
 * to the search, which is the actual product. The claim is deliberately plain —
 * research and comparison, not "the best deals on the internet".
 */
function HeroSection() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
        {/* CSS animation rather than a motion component: a single fade does not
            justify shipping an animation library to every visitor. The global
            reduced-motion rule disables it. */}
        <div className="flex animate-enter flex-col items-center gap-6">
          <Eyebrow>Buying decisions, researched</Eyebrow>

          <Heading as="h1" level="display" className="max-w-4xl">
            Stop searching.
            <br />
            Start selecting.
          </Heading>

          <Lead className="mx-auto text-center">
            Research products, compare your options, and find what is actually worth buying.
          </Lead>

          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={AI_SEARCH_ANCHOR}>
                Start research
                <Icon name="chevronDown" size="sm" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={ROUTES.products}>Explore products</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
