import type {MoneyLike} from '../types/money.js';
import type {MoneyFormatOptions} from '../types/options.js';
import {formatMoney} from './formatMoney.js';
import {parseAmount} from '../parse/parseAmount.js';

/**
 * Formats a price range from min to max.
 *
 * Returns a single formatted price if amounts are equal, or a range
 * formatted as "min–max" (en dash). Returns '—' for invalid inputs or
 * currency mismatches.
 *
 * @param min - The minimum price
 * @param max - The maximum price
 * @param options - Formatting options
 * @returns Formatted range string, or '—' for invalid inputs
 *
 * @example
 * ```ts
 * const range = formatRange(
 *   { amount: '10.00', currencyCode: 'USD' },
 *   { amount: '20.00', currencyCode: 'USD' }
 * );
 * // Returns: "$10.00–$20.00"
 *
 * const single = formatRange(
 *   { amount: '10.00', currencyCode: 'USD' },
 *   { amount: '10.00', currencyCode: 'USD' }
 * );
 * // Returns: "$10.00"
 * ```
 */
export function formatRange(
  min: MoneyLike | null | undefined,
  max: MoneyLike | null | undefined,
  options?: MoneyFormatOptions,
): string {
  if (!min || !max) {
    return '—';
  }

  const minAmount = parseAmount(min.amount);
  const maxAmount = parseAmount(max.amount);

  if (isNaN(minAmount) || isNaN(maxAmount)) {
    return '—';
  }

  if (min.currencyCode !== max.currencyCode) {
    return '—';
  }

  if (minAmount === maxAmount) {
    return formatMoney(min, options);
  }

  return `${formatMoney(min, options)}–${formatMoney(max, options)}`;
}
