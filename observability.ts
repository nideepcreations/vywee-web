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
