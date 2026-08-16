import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { AI_SEARCH_ANCHOR } from '@/constants/site';

function HeroSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 xl:px-28">
        <div className="flex min-h-[520px] flex-col justify-center">
          <div className="max-w-3xl">
            <div className="flex animate-enter flex-col items-start gap-6 text-left">
              <Eyebrow>Buying decisions, researched</Eyebrow>

              <Heading as="h1" level="display" className="max-w-4xl">
                Stop searching.
                <br />
                Start selecting.
              </Heading>

              <Lead className="max-w-2xl text-left">
                Research products, compare your options, and find what is actually worth buying.
              </Lead>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
