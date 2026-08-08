import Link from 'next/link';
import * as React from 'react';

import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Hides the wordmark and keeps only the mark, for tight spaces. */
  markOnly?: boolean;
  href?: string;
}

/**
 * The mark is a V that finishes as a tick: Vywee's whole job is saying whether
 * something is worth buying, so the verdict is built into the letterform.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('size-8', className)}
      role="img"
      aria-label={`${SITE.name} mark`}
    >
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <path
        d="M8 10.5 14.5 22 24 7.5"
        fill="none"
        stroke="var(--brand-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Logo({ className, markOnly = false, href = ROUTES.home }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
        className,
      )}
    >
      <LogoMark />
      {markOnly ? (
        <span className="sr-only">{SITE.name}</span>
      ) : (
        <span className="font-display text-xl font-extrabold tracking-tighter text-foreground">
          {SITE.name}
        </span>
      )}
    </Link>
  );
}

export { Logo, LogoMark };
