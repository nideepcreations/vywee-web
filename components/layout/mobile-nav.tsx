'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Logo } from '@/components/shared/logo';
import { NavLink } from '@/components/shared/nav-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Eyebrow } from '@/components/ui/typography';
import { PRIMARY_NAV, QUICK_LINKS } from '@/constants/navigation';

const linkClasses =
  'flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground data-[active]:bg-brand-subtle data-[active]:text-brand-on-subtle';

/**
 * Drawer navigation for small screens. Radix handles focus trapping, escape
 * to close and returning focus to the trigger.
 */
function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" aria-label="Site navigation">
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Browse categories, guides, brands and offers.
        </SheetDescription>

        <div className="pt-1">
          <Logo />
        </div>

        <nav aria-label="Primary" className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => (
            <SheetClose asChild key={item.href}>
              <NavLink href={item.href} className={linkClasses}>
                {item.label}
              </NavLink>
            </SheetClose>
          ))}
        </nav>

        <Separator />

        <div className="flex flex-col gap-2">
          <Eyebrow className="px-3">Jump to</Eyebrow>
          <nav aria-label="Popular categories" className="flex flex-col gap-1">
            {QUICK_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <SheetClose asChild key={item.href}>
                  <NavLink href={item.href} className={linkClasses}>
                    {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
                    {item.label}
                  </NavLink>
                </SheetClose>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
