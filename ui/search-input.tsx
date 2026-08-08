import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const searchInputVariants = cva(
  [
    'flex w-full items-center gap-3 rounded-pill border bg-elevated',
    'border-input transition-[border-color,box-shadow] duration-fast ease-standard',
    'hover:border-input-hover',
    'focus-within:border-brand focus-within:shadow-sm',
  ],
  {
    variants: {
      size: {
        md: 'h-12 px-4',
        lg: 'h-14 px-5 md:h-16 md:px-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface SearchInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof searchInputVariants> {
  /**
   * Accessible name for the field. Rendered visually hidden unless a visible
   * label is supplied elsewhere — a placeholder is not a label.
   */
  label: string;
  /** Trailing control, typically the submit button. */
  action?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Search field.
 *
 * A plain `input type="search"` with the project's own chrome: browsers render
 * their native clear button inconsistently and it cannot be styled, so the
 * field is composed instead. The magnifier is decorative — the accessible name
 * comes from the visually hidden label, because a placeholder disappears as
 * soon as typing starts and is not announced reliably.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, containerClassName, size, label, action, id, ...props },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn(searchInputVariants({ size }), containerClassName)}>
      <Icon name="search" size={size === 'lg' ? 'md' : 'sm'} tone="muted" />
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        type="search"
        autoComplete="off"
        className={cn(
          'min-w-0 flex-1 bg-transparent text-base text-foreground outline-none',
          'placeholder:text-muted-foreground',
          '[&::-webkit-search-cancel-button]:appearance-none',
          className,
        )}
        {...props}
      />
      {action ? <div className="flex shrink-0 items-center">{action}</div> : null}
    </div>
  );
});

export { SearchInput, searchInputVariants };
