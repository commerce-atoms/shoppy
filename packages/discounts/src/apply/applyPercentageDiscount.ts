/**
 * Applies a percentage discount to a price.
 *
 * @param price - Original price
 * @param percentage - Discount percentage (0-100)
 * @returns Discounted price
 *
 * @example
 * ```ts
 * const discounted = applyPercentageDiscount(100, 20);
 * // Returns: 80
 * ```
 */
export function applyPercentageDiscount(
  price: number,
  percentage: number,
): number {
  if (price <= 0 || percentage < 0 || percentage > 100) {
    return price;
  }

  const discountAmount = (price * percentage) / 100;
  return Math.max(0, price - discountAmount);
}

