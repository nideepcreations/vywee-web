import { isProduction } from './env';

interface ErrorContext {
  readonly digest?: string;
  readonly route?: string;
  readonly [key: string]: unknown;
}

/**
 * Central error sink. Error boundaries call this instead of logging directly,
 * so wiring a real provider later is a single-file change and no stray output
 * ever reaches a user's console.
 */
export function reportError(error: unknown, context: ErrorContext = {}): void {
  if (!isProduction) {
    // In development the framework overlay already surfaces the error; adding
    // console output here would only duplicate it.
    return;
  }

  void error;
  void context;
}

/**
 * Build-time notice, for things whoever runs the deploy needs to see in the
 * build log — an affiliate link that could not be converted, say. This is the
 * one place output is written directly, which is why the rule against stray
 * console output is lifted here and nowhere else: the destination is the
 * build log, never a visitor's browser console. The guard below keeps it that
 * way even if this module is ever pulled into a client bundle.
 */
export function reportBuildNotice(message: string): void {
  if (typeof window !== 'undefined') return;
  // eslint-disable-next-line no-console -- see above: build log only.
  console.warn(message);
}
