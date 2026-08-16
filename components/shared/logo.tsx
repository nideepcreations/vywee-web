import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

/**
 * Brand marks.
 *
 * `Logo` renders the approved horizontal lockup as artwork — mark and custom
 * "Vywee" lettering together, exactly as supplied. The wordmark is not set in
 * a typeface: the letterforms are part of the artwork and are never
 * reconstructed.
 *
 * Two files exist because the lettering colour is baked into the artwork:
 * navy on light surfaces, white on dark. Both are cut from the same source at
 * identical dimensions, so the lockup does not change size when the theme
 * changes. They are swapped with CSS rather than JavaScript, which keeps this
 * a server component and avoids a flash on first paint.
 *
 * `LogoMark` is the standalone y, which is what the approved sheet specifies
 * for small sizes — the bag handle and eyelets collapse below roughly 24px.
 * It is the same artwork the favicon uses.
 */

/** Intrinsic size of the lockup artwork; both variants share it. */
export const LOGO_SOURCE = { width: 310, height: 105 } as const;

export interface LogoMarkProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
  className?: string;
  /** Accessible name. Omit where a wordmark sits alongside. */
  label?: string;
}

/** Symbol only: the standalone y, for favicons and tight spaces. */
function LogoMark({ className, label, ...props }: LogoMarkProps) {
  return (
    <Image
      src="/vywee-y.svg"
      alt={label ?? ''}
      width={32}
      height={32}
      aria-hidden={label ? undefined : true}
      className={cn('size-8 shrink-0', className)}
      {...props}
    />
  );
}

/**
 * Rendered heights. `lg` is the header treatment: it steps up at `xs` because
 * the full lockup plus the menu, search and theme controls do not fit on a
 * 320px viewport at that size.
 */
const LOGO_SIZES = {
  default: 'h-8 w-auto shrink-0',
  lg: 'h-9 w-auto shrink-0 xs:h-11',
} as const;

export type LogoSize = keyof typeof LOGO_SIZES;

export interface LogoProps {
  className?: string;
  /** Renders the symbol alone, for tight spaces. */
  markOnly?: boolean;
  href?: string;
  /** Only the header instance is above the fold on every route. */
  priority?: boolean;
  /** `lg` gives the header a stronger brand presence. */
  size?: LogoSize;
}

/** Full horizontal lockup, linked to the homepage. */
function Logo({
  className,
  markOnly = false,
  href = ROUTES.home,
  priority = false,
  size = 'default',
}: LogoProps) {
  const shared = LOGO_SIZES[size];

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center rounded-md',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
        className,
      )}
    >
      {markOnly ? (
        <LogoMark />
      ) : (
        <>
          <Image
            src="/vywee-logo-light.png"
            alt=""
            width={LOGO_SOURCE.width}
            height={LOGO_SOURCE.height}
            priority={priority}
            aria-hidden="true"
            className={cn(shared, 'dark:hidden')}
          />
          <Image
            src="/vywee-logo-dark.png"
            alt=""
            width={LOGO_SOURCE.width}
            height={LOGO_SOURCE.height}
            priority={priority}
            aria-hidden="true"
            className={cn(shared, 'hidden dark:block')}
          />
        </>
      )}
      <span className="sr-only">{SITE.name}</span>
    </Link>
  );
}

export { Logo, LogoMark };
