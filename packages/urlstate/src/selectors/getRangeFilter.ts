import type {SearchState} from '../types/searchState.js';

/**
 * Extracts range filter values from search state.
 * Returns {min, max} with undefined for missing values.
 *
 * @param searchState - The search state to extract from
 * @param filterKey - The filter key to extract (e.g., 'price')
 * @returns Object with min and max values, or undefined for missing values
 *
 * @example
 * ```ts
 * const range = getRangeFilter(searchState, 'price');
 * // { min: 10, max: 50 } or { min: undefined, max: undefined }
 * ```
 */
export function getRangeFilter(
  searchState: SearchState,
  filterKey: string,
): {
  min?: number;
  max?: number;
} {
  const filter = searchState.filters[filterKey];
  if (
    typeof filter === 'object' &&
    !Array.isArray(filter) &&
    filter !== null
  ) {
    return {min: filter.min, max: filter.max};
  }
  return {min: undefined, max: undefined};
}

