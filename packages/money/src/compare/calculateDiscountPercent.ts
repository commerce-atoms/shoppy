/**
 * Calculates discount percentage from compare-at and current price.
 *
 * Returns undefined if calculation is invalid (NaN, negative, etc.).
 * Only returns a value when compareAt is greater than price.
 *
 * @param compareAtAmount - The compare-at price amount
 * @param priceAmount - The current price amount
 * @returns Discount percentage (0-100), or undefined if invalid
 *
 * @example
 * ```ts
 * const discount = calculateDiscountPercent(29.99, 19.99);
 * // Returns: 33
 *
 * const discount = calculateDiscountPercent(19.99, 29.99);
 * // Returns: undefined (compareAt <= price)
 * ```
 */
export function calculateDiscountPercent(
  compareAtAmount: number,
  priceAmount: number,
): number | undefined {
  // Return undefined for invalid/unsafe inputs
  if (!Number.isFinite(compareAtAmount) || compareAtAmount <= 0) {
    return undefined;
  }

  if (!Number.isFinite(priceAmount) || priceAmount < 0) {
    return undefined;
  }

  // Return undefined if price >= compareAt
  if (priceAmount >= compareAtAmount) {
    return undefined;
  }

  // Compute percent: Math.round(((compareAt - price) / compareAt) * 100)
  const discountPercent = Math.round(
    ((compareAtAmount - priceAmount) / compareAtAmount) * 100,
  );

  return discountPercent;
}

