/**
 * Discount rule for validation.
 */
export interface DiscountRule {
  /**
   * Minimum spend required (optional)
   */
  minSpend?: number;

  /**
   * Expiry date (optional)
   */
  expiresAt?: Date;
}

