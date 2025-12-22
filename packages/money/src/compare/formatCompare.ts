import type {MoneyLike} from '../types/money.js';
import type {MoneyFormatOptions} from '../types/options.js';
import type {CompareOutput} from '../types/compare.js';
import {formatMoney} from '../format/formatMoney.js';
import {parseAmount} from '../parse/parseAmount.js';
import {calculateDiscountPercent} from './calculateDiscountPercent.js';

/**
 * Formats a price with compare-at pricing display rules.
 *
 * Returns an object indicating whether to show the compare-at price,
 * along with formatted prices and discount percentage. Only shows
 * compare-at when it's greater than the current price.
 *
 * @param price - The current price
 * @param compareAtPrice - The compare-at price (optional)
 * @param options - Formatting options
 * @returns Compare output with show flag and formatted prices
 *
 * @example
 * ```ts
 * const result = formatCompare(
 *   { amount: '19.99', currencyCode: 'USD' },
 *   { amount: '29.99', currencyCode: 'USD' }
 * );
 * // Returns: {
 * //   show: true,
 * //   price: "$19.99",
 * //   compareAt: "$29.99",
 * //   discountPercent: 33
 * // }
 * ```
 */
export function formatCompare(
  price: MoneyLike | null | undefined,
  compareAtPrice: MoneyLike | null | undefined,
  options?: MoneyFormatOptions,
): CompareOutput {
  if (!price) {
    return {show: false, price: '—'};
  }

  const priceAmount = parseAmount(price.amount);

  if (isNaN(priceAmount)) {
    return {show: false, price: '—'};
  }

  if (!compareAtPrice) {
    return {show: false, price: formatMoney(price, options)};
  }

  const compareAtAmount = parseAmount(compareAtPrice.amount);

  if (isNaN(compareAtAmount)) {
    return {show: false, price: formatMoney(price, options)};
  }

  if (price.currencyCode !== compareAtPrice.currencyCode) {
    return {show: false, price: formatMoney(price, options)};
  }

  if (compareAtAmount <= priceAmount) {
    return {show: false, price: formatMoney(price, options)};
  }

  const discountPercent = calculateDiscountPercent(compareAtAmount, priceAmount);

  return {
    show: true,
    price: formatMoney(price, options),
    compareAt: formatMoney(compareAtPrice, options),
    discountPercent: discountPercent, // Only provided when show=true
  };
}

