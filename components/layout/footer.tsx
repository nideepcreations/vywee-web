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
      <Container size="wide" className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.8fr_repeat(3,1fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Logo />
            <Text tone="muted" size="sm" className="max-w-xs">
              {SITE.description}
            </Text>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
              <h2 className="font-display text-sm font-semibold text-foreground">{group.title}</h2>
              <ul className="flex flex-col gap-2.5">
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

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Text tone="muted" size="xs">
            © {year} {SITE.organisation.legalName}. Some links earn us a commission — it never
            changes what we recommend.
          </Text>
          <Text tone="muted" size="xs">
            {SITE.contactEmail}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
