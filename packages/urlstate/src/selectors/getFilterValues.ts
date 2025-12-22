import type {SearchState} from '../types/searchState.js';

/**
 * Extracts array of selected filter values from search state.
 * Handles both single string and array values.
 *
 * @param searchState - The search state to extract from
 * @param filterKey - The filter key to extract (e.g., 'availability')
 * @returns Array of filter values, empty array if not found or invalid
 *
 * @example
 * ```ts
 * const values = getFilterValues(searchState, 'availability');
 * // ['in-stock', 'out-of-stock'] or ['in-stock'] or []
 * ```
 */
export function getFilterValues(
  searchState: SearchState,
  filterKey: string,
): string[] {
  const filter = searchState.filters[filterKey];
  if (Array.isArray(filter)) {
    return filter;
  }
  if (typeof filter === 'string') {
    return [filter];
  }
  return [];
}

