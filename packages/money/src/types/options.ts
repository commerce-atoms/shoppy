/**
 * Options for money formatting.
 */
export interface MoneyFormatOptions {
  /**
   * Locale for formatting (default: "en-US").
   */
  locale?: string;

  /**
   * Minimum fraction digits to display.
   */
  minimumFractionDigits?: number;

  /**
   * Maximum fraction digits to display.
   */
  maximumFractionDigits?: number;
}
