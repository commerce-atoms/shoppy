import type {NormalizeSelectedOptionsOptions} from './normalize.js';

/**
 * Options for finding variants.
 */
export interface FindVariantOptions {
  /**
   * Whether to normalize selected options before matching.
   */
  normalize?: boolean;

  /**
   * Normalization options (if normalize is true).
   */
  normalizeOptions?: NormalizeSelectedOptionsOptions;
}

/**
 * Reason literal strings returned by findVariant.
 *
 * These literal strings are part of the public API contract.
 * Changing them is a breaking change (even in 0.x) and must follow the repo's versioning policy.
 */
export type FindVariantReason =
  | 'EXACT_MATCH'
  | 'NO_MATCH'
  | 'INCOMPLETE'
  | 'INVALID_OPTION';
