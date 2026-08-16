import Link from 'next/link';
import * as React from 'react';

import { Logo } from '@/components/shared/logo';
import { Container } from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/typography';
import { FOOTER_NAV } from '@/constants/navigation';
import { SITE } from '@/constants/site';

const linkClasses =
  'text-sm text-muted-foreground transition-colors duration-fast hover:text-foreground';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="w-full py-12 md:py-16">
        {/* Main footer area */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_repeat(3,1fr)] md:gap-12 lg:gap-20">
          
          {/* Brand column */}
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />

            <Text tone="muted" size="sm" className="leading-6">
              {SITE.description}
            </Text>
          </div>

          {/* Navigation columns */}
          {FOOTER_NAV.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-4"
            >
              <h2 className="font-display text-sm font-semibold text-foreground">
                {group.title}
              </h2>

              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClasses}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-10 md:my-12" />

        {/* Bottom footer */}
        <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
          <Text tone="muted" size="xs" className="max-w-2xl">
            © {year} {SITE.organisation.legalName}. Some links earn us a
            commission — it never changes what we recommend.
          </Text>

          <Text tone="muted" size="xs" className="shrink-0">
            {SITE.contactEmail}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
