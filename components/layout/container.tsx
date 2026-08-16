import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full px-gutter lg:px-gutter-lg', {
  variants: {
    size: {
      /** Default page width. */
      default: 'max-w-page',
      /** Long-form reading measure for guides and legal pages. */
      prose: 'max-w-reading',
      narrow: 'max-w-3xl',
      wide: 'max-w-[90rem]',
      full: 'max-w-none',
    },
    gutter: {
      true: '',
      false: 'px-0 lg:px-0',
    },
  },
  defaultVariants: { size: 'default', gutter: true },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article' | 'nav';
}

/** The only component allowed to own horizontal page padding. */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size, gutter, as = 'div', ...props },
  ref,
) {
  const Component = as;
  return (
    <Component
      ref={ref}
      className={cn(containerVariants({ size, gutter }), className)}
      {...props}
    />
  );
});

export { Container, containerVariants };
