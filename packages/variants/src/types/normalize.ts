/**
 * Options for normalizing selected options.
 */
export interface NormalizeSelectedOptionsOptions {
  /**
   * Case normalization strategy.
   * - 'none': Keep original casing
   * - 'lowercase': Convert to lowercase
   * - 'uppercase': Convert to uppercase
   */
  casing?: 'none' | 'lowercase' | 'uppercase';

  /**
   * Sort selected options by name.
   */
  sort?: boolean;

  /**
   * Trim whitespace from names and values.
   */
  trim?: boolean;
}

