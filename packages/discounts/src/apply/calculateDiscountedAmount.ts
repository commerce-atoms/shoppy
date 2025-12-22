import type { Discount } from "../types/discount.js";
import { applyPercentageDiscount } from "./applyPercentageDiscount.js";
import { applyFixedDiscount } from "./applyFixedDiscount.js";

/**
 * Calculates the discounted amount for a single discount.
 *
 * @param price - Original price
 * @param discount - Discount to apply
 * @returns Discounted price
 *
 * @example
 * ```ts
 * const discounted = calculateDiscountedAmount(100, { type: 'percent', value: 20 });
 * ```
 */
export function calculateDiscountedAmount(
  price: number,
  discount: Discount
): number {
  if (discount.type === "percent") {
    return applyPercentageDiscount(price, discount.value);
  }

  return applyFixedDiscount(price, discount.value);
}
