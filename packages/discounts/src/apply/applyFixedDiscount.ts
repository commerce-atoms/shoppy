/**
 * Applies a fixed discount amount to a price.
 *
 * @param price - Original price
 * @param discount - Fixed discount amount
 * @returns Discounted price
 *
 * @example
 * ```ts
 * const discounted = applyFixedDiscount(100, 15);
 * // Returns: 85
 * ```
 */
export function applyFixedDiscount(
  price: number,
  discount: number,
): number {
  if (price <= 0 || discount < 0) {
    return price;
  }

  return Math.max(0, price - discount);
}

