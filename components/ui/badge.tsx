import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-pill border font-sans font-medium',
    'transition-colors duration-fast ease-standard',
    "[&_svg:not([class*='size-'])]:size-icon-2xs [&_svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        neutral: 'border-border bg-surface text-muted-foreground',
        brand: 'border-transparent bg-brand-subtle text-brand-on-subtle',
        accent: 'border-transparent bg-accent-subtle text-accent-on-subtle',
        /* Savings, coupons and price drops. */
        deal: 'border-transparent bg-highlight-subtle text-highlight-on-subtle',
        success: 'border-transparent bg-transparent text-success',
        outline: 'border-border-strong bg-transparent text-foreground',
      },
      size: {
        sm: 'h-5 px-2 text-2xs tracking-wide uppercase',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, asChild = false, ...props }: BadgeProps) {
  const Component = asChild ? Slot : 'span';
  return <Component className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
