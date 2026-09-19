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
    /** Server-only. Enables real AI search when set; falls back to rule-based
     *  interpretation when absent. Never exposed to the client. */
    readonly OPENAI_API_KEY?: string;
    readonly OPENAI_SEARCH_MODEL?: string;
  }
}
