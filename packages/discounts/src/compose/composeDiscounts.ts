import type { Discount } from "../types/discount.js";
import type { ComposeDiscountsOptions } from "../types/composeOptions.js";
import { applyPercentageDiscount } from "../apply/applyPercentageDiscount.js";
import { applyFixedDiscount } from "../apply/applyFixedDiscount.js";

/**
 * Composes multiple discounts, applying them according to the specified policy.
 * Default: applies discounts in the order given, no rounding.
 *
 * @param price - Original price
 * @param discounts - Array of discounts to apply
 * @param options - Composition options (order, rounding)
 * @returns Final discounted price
 *
 * @example
 * ```ts
 * const final = composeDiscounts(100, [
 *   { type: 'percent', value: 10 },
 *   { type: 'fixed', value: 5 },
 * ]);
 * // Applies in order: 100 * 0.9 = 90, then 90 - 5 = 85
 *
 * // With options:
 * const final = composeDiscounts(100, discounts, {
 *   order: 'fixed-first',
 *   rounding: 'round',
 * });
 * ```
 */
export function composeDiscounts(
  price: number,
  discounts: Discount[],
  options: ComposeDiscountsOptions = {}
): number {
  const { order = "given", rounding = "none" } = options;

  // Sort discounts if needed
  let sortedDiscounts = discounts;
  if (order === "fixed-first") {
    sortedDiscounts = [...discounts].sort((a, b) => {
      if (a.type === "fixed" && b.type === "percent") return -1;
      if (a.type === "percent" && b.type === "fixed") return 1;
      return 0;
    });
  } else if (order === "percent-first") {
    sortedDiscounts = [...discounts].sort((a, b) => {
      if (a.type === "percent" && b.type === "fixed") return -1;
      if (a.type === "fixed" && b.type === "percent") return 1;
      return 0;
    });
  }

  let result = price;

  for (const discount of sortedDiscounts) {
    if (discount.type === "percent") {
      result = applyPercentageDiscount(result, discount.value);
    } else if (discount.type === "fixed") {
      result = applyFixedDiscount(result, discount.value);
    }
    // Ignore unknown discount types

    // Apply rounding if specified
    if (rounding !== "none") {
      if (rounding === "round") {
        result = Math.round(result);
      } else if (rounding === "floor") {
        result = Math.floor(result);
      } else if (rounding === "ceil") {
        result = Math.ceil(result);
      }
    }
  }

  return result;
}
