/**
 * Output from compare-at price formatting.
 */
export interface CompareOutput {
  /**
   * Whether to show the compare-at price (true if discounted).
   */
  show: boolean;

  /**
   * Formatted current price.
   */
  price: string;

  /**
   * Formatted compare-at price (if discounted).
   */
  compareAt?: string;

  /**
   * Discount percentage (e.g., 20 for 20% off).
   */
  discountPercent?: number;
}
