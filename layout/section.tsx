import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import { Container, type ContainerProps } from './container';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-8 md:py-10',
      md: 'py-section',
      lg: 'py-section md:py-section-lg',
    },
    surface: {
      none: '',
      muted: 'bg-surface',
      inverted: 'bg-foreground text-background',
    },
    bordered: {
      true: 'border-t border-border',
      false: '',
    },
  },
  defaultVariants: { spacing: 'lg', surface: 'none', bordered: false },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  /** Set to false when the section needs to control its own container. */
  contained?: boolean;
  containerSize?: ContainerProps['size'];
}

/**
 * Vertical rhythm lives here. Pages compose sections instead of writing their
 * own padding, which is what keeps spacing consistent as the app grows.
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  { className, spacing, surface, bordered, contained = true, containerSize, children, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, surface, bordered }), className)}
      {...props}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  );
});

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Slot for a "View all" link or filter control. */
  action?: React.ReactNode;
  headingAs?: 'h1' | 'h2' | 'h3';
  /** Put on the heading, not the wrapper, so `aria-labelledby` names the section. */
  headingId?: string;
  align?: 'start' | 'center';
}

function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  action,
  headingAs = 'h2',
  headingId,
  align = 'start',
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading as={headingAs} id={headingId} level="h2">
          {title}
        </Heading>
        {description ? <Lead className="text-base">{description}</Lead> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export { Section, SectionHeader, sectionVariants };
