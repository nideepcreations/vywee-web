'use client';

import * as React from 'react';

import { Container } from '@/components/layout/container';
import { ErrorState } from '@/components/shared/error-state';
import { reportError } from '@/lib/observability';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Route-level boundary: keeps the header and footer, replaces the failed content. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    reportError(error, { digest: error.digest, boundary: 'route' });
  }, [error]);

  return (
    <Container className="py-20">
      <ErrorState
        title="This page did not load"
        description="Something failed while rendering this route. Retrying usually works — if it does not, the issue is on our side."
        onRetry={reset}
      />
    </Container>
  );
}
