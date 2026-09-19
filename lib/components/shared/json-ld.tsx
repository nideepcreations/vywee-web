import * as React from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}

/**
 * Emits schema.org structured data. The payload is serialised locally and
 * `<` is escaped so a data string can never close the script tag early.
 */
function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export { JsonLd };
