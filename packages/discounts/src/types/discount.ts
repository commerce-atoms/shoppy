/**
 * Discount type definition.
 */
export interface Discount {
  /**
   * Discount type
   */
  type: 'fixed' | 'percent';

  /**
   * Discount value (amount for fixed, percentage for percent)
   */
  value: number;
}

