'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px]',
        'data-[state=open]:animate-overlay-in',
        className,
      )}
      {...props}
    />
  );
});

const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-standard',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=open]:animate-overlay-in',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=open]:animate-overlay-in',
        left: 'inset-y-0 left-0 h-full w-[85vw] max-w-sm border-r data-[state=open]:animate-sheet-left',
        right:
          'inset-y-0 right-0 h-full w-[85vw] max-w-sm border-l data-[state=open]:animate-sheet-right',
      },
    },
    defaultVariants: { side: 'right' },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  closeLabel?: string;
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(function SheetContent({ className, children, side, closeLabel = 'Close menu', ...props }, ref) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            'absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-md',
            'text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          )}
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
});

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
};
