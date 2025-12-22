import type {MoneyLike} from '../types/money.js';
import type {MoneyFormatOptions} from '../types/options.js';
import {parseAmount} from '../parse/parseAmount.js';

/**
 * Module-local cache for Intl.NumberFormat instances.
 * Keyed by: locale + currencyCode + minimumFractionDigits + maximumFractionDigits
 */
const formatterCache = new Map<string, Intl.NumberFormat>();

/**
 * Gets or creates a cached Intl.NumberFormat instance.
 */
function getFormatter(
  locale: string,
  currencyCode: string,
  minimumFractionDigits: number | undefined,
  maximumFractionDigits: number | undefined,
): Intl.NumberFormat {
  const cacheKey = `${locale}:${currencyCode}:${minimumFractionDigits ?? 'undefined'}:${maximumFractionDigits ?? 'undefined'}`;

  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    });
    formatterCache.set(cacheKey, formatter);
  }

  return formatter;
}

/**
 * Formats a money value using Intl.NumberFormat.
 *
 * Normalizes string amounts to numbers and handles invalid values gracefully.
 * Returns '—' (em dash) for invalid inputs as a documented fallback.
 *
 * @param money - The money object to format
 * @param options - Formatting options
 * @returns Formatted currency string, or '—' for invalid inputs
 *
 * @example
 * ```ts
 * const formatted = formatMoney({ amount: '19.99', currencyCode: 'USD' });
 * // Returns: "$19.99"
 *
 * const formatted = formatMoney({ amount: 'invalid', currencyCode: 'USD' });
 * // Returns: "—"
 * ```
 */
export function formatMoney(
  money: MoneyLike | null | undefined,
  options?: MoneyFormatOptions,
): string {
  if (!money) {
    return '—';
  }

  const amount = parseAmount(money.amount);

  if (isNaN(amount)) {
    return '—';
  }

  const locale = options?.locale ?? 'en-US';

  const formatter = getFormatter(
    locale,
    money.currencyCode,
    options?.minimumFractionDigits,
    options?.maximumFractionDigits,
  );

  return formatter.format(amount);
}
