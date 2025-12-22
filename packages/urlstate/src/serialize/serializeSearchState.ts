import type {SearchSchema} from '../types/schema.js';
import type {SearchState} from '../types/searchState.js';
import type {SerializeSearchStateOptions} from '../types/options.js';

/**
 * Serializes search state into URL search params using a schema.
 *
 * Use case: Convert your app's filter state into URL params.
 *
 * @param state - Search state to serialize
 * @param schema - Search schema definition
 * @param options - Serialization options
 * @returns URLSearchParams ready to use
 *
 * @example
 * ```ts
 * const params = serializeSearchState(
 *   { filters: { color: ['red', 'blue'], price: { min: 10, max: 50 } } },
 *   schema
 * );
 * // Result: ?color=red&color=blue&price=10-50
 * ```
 */
export const serializeSearchState = (
  state: SearchState,
  schema: SearchSchema,
  options: SerializeSearchStateOptions = {},
): URLSearchParams => {
  const {excludeDefaults = true, sortParams = true} = options;
  const params = new URLSearchParams();

  // Collect params to add
  const paramsToAdd: Array<[string, string]> = [];

  // Serialize filters
  for (const [filterKey, filterConfig] of Object.entries(schema.filters)) {
    const filterValue = state.filters[filterKey];

    // Skip if undefined (removes param)
    if (filterValue === undefined) continue;

    // Handle removal semantics:
    // - single filter: undefined or '' removes param
    // - multiple filter: [] or undefined removes param
    // - range filter: {min: undefined, max: undefined} or undefined removes param

    if (filterConfig.type === 'single') {
      // Single filter: empty string removes param
      if (filterValue === '') continue;
      if (typeof filterValue === 'string') {
        // Skip if equals default and excludeDefaults is true
        if (
          excludeDefaults &&
          filterConfig.default !== undefined &&
          filterValue === filterConfig.default
        ) {
          continue;
        }
        paramsToAdd.push([filterConfig.param, filterValue]);
      }
    } else if (filterConfig.type === 'multiple') {
      // Multiple filter: empty array removes param
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) continue;
        // Skip if equals default and excludeDefaults is true
        if (
          excludeDefaults &&
          filterConfig.default !== undefined &&
          JSON.stringify(filterValue) === JSON.stringify(filterConfig.default)
        ) {
          continue;
        }
        for (const value of filterValue) {
          paramsToAdd.push([filterConfig.param, value]);
        }
      }
    } else if (
      filterConfig.type === 'range' &&
      typeof filterValue === 'object' &&
      !Array.isArray(filterValue)
    ) {
      // Range filter: both min and max undefined removes param
      const {min, max} = filterValue;
      if (min === undefined && max === undefined) continue;
      // Skip if equals default and excludeDefaults is true
      if (
        excludeDefaults &&
        filterConfig.default !== undefined &&
        JSON.stringify(filterValue) === JSON.stringify(filterConfig.default)
      ) {
        continue;
      }
      const rangeStr = `${min ?? ''}-${max ?? ''}`;
      paramsToAdd.push([filterConfig.param, rangeStr]);
    }
  }

  // Serialize sort
  if (schema.sort && state.sort !== undefined) {
    if (!excludeDefaults || state.sort !== schema.sort.default) {
      paramsToAdd.push([schema.sort.param, state.sort]);
    }
  }

  // Serialize pagination
  if (schema.pagination) {
    if (schema.pagination.type === 'page' && state.page !== undefined) {
      if (!excludeDefaults || state.page !== schema.pagination.defaultPage) {
        paramsToAdd.push([schema.pagination.param, state.page.toString()]);
      }
    } else if (
      schema.pagination.type === 'cursor' &&
      state.cursor !== undefined
    ) {
      paramsToAdd.push([schema.pagination.param, state.cursor]);
    }
  }

  // Sort params alphabetically for stable URLs
  if (sortParams) {
    paramsToAdd.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  }

  // Add to URLSearchParams
  for (const [key, value] of paramsToAdd) {
    params.append(key, value);
  }

  return params;
};

