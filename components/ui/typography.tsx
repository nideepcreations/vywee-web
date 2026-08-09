import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

/**
 * Every variant below reads its classes from the role scale in
 * constants/typography.ts. Retuning the scale therefore changes the rendered
 * type without touching this file, and no size or weight is written twice.
 */
const headingVariants = cva('text-balance text-foreground', {
  variants: {
    level: {
      display: TYPOGRAPHY.display.className,
      h1: TYPOGRAPHY.h1.className,
      h2: TYPOGRAPHY.h2.className,
      h3: TYPOGRAPHY.h3.className,
      h4: TYPOGRAPHY.h4.className,
    },
  },
  defaultVariants: { level: 'h2' },
});

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  /**
   * Visual size and semantic level are independent props, so a page can keep a
   * correct heading outline without being forced into a particular size.
   */
  as?: HeadingElement;
}

function Heading({ className, level, as = 'h2', ...props }: HeadingProps) {
  const Component = as;
  return <Component className={cn(headingVariants({ level }), className)} {...props} />;
}

const textVariants = cva('', {
  variants: {
    size: {
      xs: TYPOGRAPHY.caption.className,
      sm: TYPOGRAPHY.bodySmall.className,
      base: TYPOGRAPHY.body.className,
      lg: TYPOGRAPHY.lead.className,
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      brand: 'text-brand',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
    leading: {
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    measure: {
      none: '',
      tight: 'measure-tight',
      base: 'measure-base',
      wide: 'measure-wide',
    },
  },
  defaultVariants: { size: 'base', tone: 'default', measure: 'none' },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

function Text({ className, size, tone, leading, weight, measure, as = 'p', ...props }: TextProps) {
  const Component = as;
  return (
    <Component
      className={cn(textVariants({ size, tone, leading, weight, measure }), className)}
      {...props}
    />
  );
}

/** Small uppercase label above a heading. Carries context, not decoration. */
function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(TYPOGRAPHY.overline.className, 'text-muted-foreground', className)}
      {...props}
    />
  );
}

function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(TYPOGRAPHY.lead.className, 'measure-base text-muted-foreground', className)}
      {...props}
    />
  );
}

/** Tabular numerals for prices, ratings and spec values. */
function Numeric({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span data-numeric className={cn('font-medium', className)} {...props} />;
}

export { Eyebrow, Heading, headingVariants, Lead, Numeric, Text, textVariants };
