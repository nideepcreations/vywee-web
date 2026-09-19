'use client';

import * as React from 'react';

import { NavLink } from '@/components/shared/nav-link';
import { PRIMARY_NAV } from '@/constants/navigation';
import { cn } from '@/lib/utils';

/** Desktop navigation. The active item is marked in text weight and an underline, never colour alone. */
function MainNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Primary" className={cn('hidden items-center gap-1 lg:flex', className)}>
      {PRIMARY_NAV.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          className={cn(
            'relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
            'transition-colors duration-fast ease-standard hover:text-foreground',
            'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-base',
            'data-[active]:font-semibold data-[active]:text-foreground data-[active]:after:scale-x-100',
          )}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export { MainNav };
