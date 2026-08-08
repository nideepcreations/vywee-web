import type { Money, PriceBand } from '@/types';

import { SITE } from '@/constants/site';

const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string, compact: boolean): Intl.NumberFormat {
  const key = `${currency}:${compact ? 'compact' : 'standard'}`;
  const cached = currencyFormatters.get(key);
  if (cached) return cached;

  const formatter = new Intl.NumberFormat(SITE.language, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 0,
  });
  currencyFormatters.set(key, formatter);
  return formatter;
}

export function formatMoney(money: Money, options?: { compact?: boolean }): string {
  return getCurrencyFormatter(money.currency, options?.compact ?? false).format(money.amount);
}

/**
 * Renders a price band. Vywee shows ranges because affiliate prices move
 * hourly and a stale exact figure erodes trust faster than an honest range.
 */
export function formatPriceBand(band: PriceBand, options?: { compact?: boolean }): string {
  const compact = options?.compact ?? true;
  const formatter = getCurrencyFormatter(band.currency, compact);
  if (band.min === band.max) return formatter.format(band.min);
  return `${formatter.format(band.min)} – ${formatter.format(band.max)}`;
}

export function formatNumber(value: number, options?: { compact?: boolean }): string {
  return new Intl.NumberFormat(SITE.language, {
    notation: options?.compact ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat(SITE.language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

const RELATIVE_UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['week', 7 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
];

export function formatRelativeTime(value: string, now: Date = new Date()): string {
  const delta = new Date(value).getTime() - now.getTime();
  const formatter = new Intl.RelativeTimeFormat(SITE.language, { numeric: 'auto' });

  for (const [unit, ms] of RELATIVE_UNITS) {
    if (Math.abs(delta) >= ms) {
      return formatter.format(Math.round(delta / ms), unit);
    }
  }
  return formatter.format(0, 'minute');
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
