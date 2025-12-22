/**
 * Options for composing multiple discounts.
 */
export interface ComposeDiscountsOptions {
  /**
   * Order in which to apply discounts.
   * - 'given': Apply in the order provided (default)
   * - 'fixed-first': Apply fixed discounts before percentage
   * - 'percent-first': Apply percentage discounts before fixed
   */
  order?: 'given' | 'fixed-first' | 'percent-first';

  /**
   * Rounding strategy for intermediate calculations.
   * - 'none': No rounding (default)
   * - 'round': Round to nearest integer
   * - 'floor': Round down
   * - 'ceil': Round up
   */
  rounding?: 'none' | 'round' | 'floor' | 'ceil';
}

