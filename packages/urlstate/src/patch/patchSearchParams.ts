import type {SearchSchema} from '../types/schema.js';
import type {SearchState} from '../types/searchState.js';
import type {PatchSearchParamsOptions} from '../types/options.js';
import {serializeSearchState} from '../serialize/serializeSearchState.js';

/**
 * Patches existing search params with new state (avoids URL churn).
 *
 * Use case: Update specific filters without rebuilding entire URL.
 *
 * @param currentParams - Current URL search parameters
 * @param nextState - New search state to apply
 * @param schema - Search schema definition
 * @param options - Patch options
 * @returns New URLSearchParams with changes applied
 *
 * @example
 * ```ts
 * const updated = patchSearchParams(
 *   currentSearchParams,
 *   { filters: { color: 'red' } },
 *   schema
 * );
 * ```
 */
export const patchSearchParams = (
  currentParams: URLSearchParams,
  nextState: SearchState,
  schema: SearchSchema,
  options: PatchSearchParamsOptions = {},
): URLSearchParams => {
  const {preserveUnknownParams = false} = options;

  // Start with new params from next state
  const newParams = serializeSearchState(nextState, schema, options);

  // If preserving unknown params, add them back
  if (preserveUnknownParams) {
    const schemaParamNames = new Set<string>();

    // Collect all param names defined in schema
    for (const filterConfig of Object.values(schema.filters)) {
      schemaParamNames.add(filterConfig.param);
    }
    if (schema.sort) {
      schemaParamNames.add(schema.sort.param);
    }
    if (schema.pagination) {
      schemaParamNames.add(schema.pagination.param);
    }

    // Add unknown params from current
    for (const [key, value] of currentParams.entries()) {
      if (!schemaParamNames.has(key)) {
        newParams.append(key, value);
      }
    }
  }

  return newParams;
};

