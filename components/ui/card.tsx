import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'group relative flex flex-col rounded-lg bg-elevated text-foreground transition-[border-color,box-shadow,transform] duration-base ease-standard',
  {
    variants: {
      variant: {
        outline: 'border border-border',
        elevated: 'border border-border shadow-sm',
        plain: 'border border-transparent bg-surface',
      },
      interactive: {
        true: 'focus-within:border-brand hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md',
        false: '',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6 md:p-7',
      },
    },
    defaultVariants: {
      variant: 'outline',
      interactive: false,
      padding: 'md',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, interactive, padding, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />;
  },
);

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn('font-display text-lg leading-snug font-semibold', className)}
        {...props}
      />
    );
  },
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />;
});

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex-1', className)} {...props} />;
  },
);

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex items-center gap-3', className)} {...props} />;
  },
);

/**
 * Stretches a link to cover the whole card while keeping one real focus target.
 * Any control that must stay clickable needs `relative z-10`.
 */
const CardLinkOverlay = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function CardLinkOverlay({ className, ...props }, ref) {
    return (
      <span ref={ref} className={cn('absolute inset-0', className)} aria-hidden="true" {...props} />
    );
  },
);

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLinkOverlay,
  CardTitle,
  cardVariants,
};
