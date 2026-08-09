import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges conditional class names and resolves Tailwind conflicts, so a caller's
 * `className` always beats a component's defaults.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

/** Absolute URL builder for canonical links, Open Graph and structured data. */
export function absoluteUrl(path: string, origin: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalised}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Splits an array into fixed-size chunks, keeping the tail chunk short. */
export function chunk<TItem>(items: readonly TItem[], size: number): TItem[][] {
  if (size <= 0) return [[...items]];
  const result: TItem[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

export function unique<TItem>(items: readonly TItem[]): TItem[] {
  return Array.from(new Set(items));
}

export function isNonEmpty<TItem>(items: readonly TItem[]): boolean {
  return items.length > 0;
}
