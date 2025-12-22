import type { DiscountRule } from "../types/discountRule.js";

/**
 * Validates a discount rule against criteria.
 *
 * @param amount - Current cart/subtotal amount
 * @param rule - Discount rule to validate
 * @param now - Current date (defaults to now)
 * @returns Whether the discount rule is valid
 *
 * @example
 * ```ts
 * const isValid = validateDiscountRule(100, { minSpend: 50, expiresAt: new Date('2025-12-31') });
 * ```
 */
export function validateDiscountRule(
  amount: number,
  rule: DiscountRule,
  now: Date = new Date()
): boolean {
  if (rule.minSpend !== undefined && amount < rule.minSpend) {
    return false;
  }

  if (rule.expiresAt !== undefined && now > rule.expiresAt) {
    return false;
  }

  return true;
}
