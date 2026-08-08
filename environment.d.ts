/**
 * Declares the environment variables this app reads. Without these
 * declarations `process.env.X` resolves through an index signature, which
 * `noPropertyAccessFromIndexSignature` rejects — and bracket access is not
 * inlined by the Next.js build for `NEXT_PUBLIC_*` values.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly NEXT_PUBLIC_SITE_URL?: string;
    readonly NEXT_PUBLIC_ANALYTICS_ID?: string;
  }
}
