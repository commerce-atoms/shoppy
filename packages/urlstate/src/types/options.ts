/**
 * Options for parsing search state.
 */
export interface ParseSearchStateOptions {
  /**
   * Whether to include default values when params are missing.
   */
  includeDefaults?: boolean;
}

/**
 * Options for serializing search state.
 */
export interface SerializeSearchStateOptions {
  /**
   * Whether to exclude default values from URL params.
   */
  excludeDefaults?: boolean;

  /**
   * Whether to sort params alphabetically for stable URLs.
   */
  sortParams?: boolean;
}

/**
 * Options for patching search params.
 */
export interface PatchSearchParamsOptions extends SerializeSearchStateOptions {
  /**
   * Preserve params not in schema.
   */
  preserveUnknownParams?: boolean;
}

/**
 * Removal semantics for patchSearchParams:
 *
 * Setting a filter to the following values removes the param from the URL:
 * - Single filter: `undefined` or `''` (empty string)
 * - Multiple filter: `[]` (empty array) or `undefined`
 * - Range filter: `{min: undefined, max: undefined}` or `undefined`
 *
 * When `sortParams` is enabled, params are sorted alphabetically by key.
 * Multi-value params maintain their array order when added to URLSearchParams.
 */

