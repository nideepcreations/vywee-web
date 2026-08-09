import * as React from 'react';

import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import { Container, type ContainerProps } from './container';

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Breadcrumbs or filters rendered directly under the page title. */
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  size?: ContainerProps['size'];
  /** Set false on pages that open with a full-bleed hero. */
  withHeader?: boolean;
}

/**
 * Standard page frame: consistent top spacing, one h1 per route, and a single
 * place to add page-level chrome later without touching every route.
 */
function PageWrapper({
  className,
  eyebrow,
  title,
  description,
  meta,
  actions,
  size,
  withHeader = true,
  children,
  ...props
}: PageWrapperProps) {
  return (
    <div className={cn('pb-section-lg', className)} {...props}>
      {withHeader && title ? (
        <Container size={size} className="pt-8 md:pt-12">
          <div className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <div className="flex flex-col gap-3">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <Heading as="h1" level="h1">
                {title}
              </Heading>
              {description ? <Lead>{description}</Lead> : null}
              {meta ? <div className="pt-1">{meta}</div> : null}
            </div>
            {actions ? <div className="flex shrink-0 gap-3">{actions}</div> : null}
          </div>
        </Container>
      ) : null}
      {children}
    </div>
  );
}

export { PageWrapper };
