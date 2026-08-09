import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap',
    'font-sans leading-none font-medium',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-fast ease-standard',
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
    "[&_svg:not([class*='size-'])]:size-icon-sm [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground shadow-xs hover:bg-brand-hover',
        secondary: 'border border-border bg-surface text-foreground hover:border-border-strong',
        outline: 'border border-border bg-transparent text-foreground hover:bg-surface',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        link: 'bg-transparent text-brand underline-offset-4 hover:underline',
        /* Reserved for deal and savings actions. */
        highlight: 'bg-highlight text-highlight-foreground shadow-xs hover:bg-highlight-strong',
        danger: 'bg-danger text-danger-foreground shadow-xs hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 p-0',
        'icon-sm': 'size-8 p-0',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Renders the child element with button styling — use for links. */
  asChild?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    block,
    asChild = false,
    isLoading = false,
    loadingLabel = 'Working',
    children,
    disabled,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size, block }), className)}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span className="sr-only">{loadingLabel}</span>
          {children}
        </>
      ) : (
        children
      )}
    </Component>
  );
});

export { Button, buttonVariants };
