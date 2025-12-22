/**
 * A selected product option (name/value pair).
 * Represents a single option selection like "Color: Red".
 */
export interface SelectedOption {
  /**
   * Option name (e.g., "Color", "Size").
   */
  name: string;

  /**
   * Selected value (e.g., "Red", "Large").
   */
  value: string;
}
