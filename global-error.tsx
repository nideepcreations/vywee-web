'use client';

import * as React from 'react';

import { reportError } from '@/lib/observability';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Last-resort boundary. It replaces the root layout, so it cannot use any
 * component that depends on providers, fonts or theme context.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    reportError(error, { digest: error.digest, boundary: 'global' });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          backgroundColor: '#ffffff',
          color: '#0b1020',
        }}
      >
        <main style={{ maxWidth: '32rem', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>The app failed to start</h1>
          <p style={{ color: '#5a6480', marginBottom: '1.5rem' }}>
            An error occurred before the interface could render. Reload to try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: 'pointer',
              borderRadius: '0.625rem',
              border: 'none',
              backgroundColor: '#2b34e0',
              color: '#ffffff',
              padding: '0.75rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
