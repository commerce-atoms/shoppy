import type {NormalizeSelectedOptionsOptions} from './normalize.js';

/**
 * Availability map: option name → set of available values.
 */
export type AvailabilityMap = Map<string, Set<string>>;

/**
 * Options for computing availability map.
 */
export interface GetAvailabilityMapOptions {
  /**
   * Only consider variants that are available for sale.
   */
  onlyAvailable?: boolean;

  /**
   * Normalize option values before computing availability.
   */
  normalize?: boolean;

  /**
   * Normalization options (if normalize is true).
   */
  normalizeOptions?: NormalizeSelectedOptionsOptions;
}

