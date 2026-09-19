'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface NavLinkProps
  extends Omit<LinkProps, 'href'>, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Marks the link active only on an exact path match. */
  exact?: boolean;
  activeClassName?: string;
}

/**
 * Link that reports its own active state to assistive tech via `aria-current`,
 * so navigation is understandable without relying on colour alone.
 */
function NavLink({
  href,
  exact = false,
  className,
  activeClassName,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive || undefined}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}

export { NavLink };
