'use client';

import * as React from 'react';

import Link from 'next/link';

import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Container } from '@/components/layout/container';
import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Icon } from '@/components/ui/icon';
import { AI_SEARCH_ANCHOR } from '@/constants/site';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';

/**
 * Sticky site header. It gains a border and background blur once the page
 * scrolls, so it stays legible over content without a permanent hard edge.
 */
interface HeaderProps {
  /**
   * Reserved for the account menu. Authentication lands in a later sprint;
   * the slot exists so adding it needs no change to the header itself.
   */
  authSlot?: React.ReactNode;
}

function Header({ authSlot }: HeaderProps) {
  const { isScrolled } = useScrollPosition(8);

  return (
    <header
      data-scrolled={isScrolled || undefined}
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-b border-transparent bg-background/80 backdrop-blur-md',
        'transition-[border-color,box-shadow] duration-base ease-standard',
        'data-[scrolled]:border-border data-[scrolled]:shadow-xs',
      )}
    >
      <Container   size="wide"   className="flex h-header items-center justify-between gap-4" >
        <div className="flex items-center gap-2">
          <MobileNav />
          <Logo priority size="lg" />
        </div>

        <MainNav />

        <div className="flex items-center gap-1">
          {/* A link rather than a live field: the search itself lives in one
              place on the page, and this keeps the header free of client state. */}
          <Link
            href={AI_SEARCH_ANCHOR}
            className={cn(
              'hidden h-10 items-center gap-2 rounded-pill border border-input px-4 md:inline-flex',
              'text-sm text-muted-foreground',
              'transition-colors duration-fast ease-standard hover:border-input-hover hover:text-foreground',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            )}
          >
            <Icon name="search" size="sm" />
            Search products
          </Link>
          <Link
            href={AI_SEARCH_ANCHOR}
            aria-label="Search products"
            className={cn(
              'inline-flex size-12 items-center justify-center rounded-md md:hidden',
              'text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            )}
          >
            <Icon name="search" size="md" />
          </Link>
          <ThemeToggle />
          {authSlot}
        </div>
      </Container>
    </header>
  );
}

export { Header };
