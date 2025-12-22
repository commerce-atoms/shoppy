import type {SearchState} from '../types/searchState.js';

/**
 * Sets a range filter (min/max values).
 *
 * Use case: Price slider, rating filter.
 *
 * @param state - Current search state
 * @param filterKey - Filter key to set
 * @param range - Range object with min and/or max
 * @returns New state with range filter set
 *
 * @example
 * ```ts
 * const newState = setRangeFilter(state, 'price', { min: 10, max: 50 });
 * ```
 */
export const setRangeFilter = (
  state: SearchState,
  filterKey: string,
  range: {min?: number; max?: number},
): SearchState => {
  // If both min and max are undefined, clear the filter
  if (range.min === undefined && range.max === undefined) {
    const {[filterKey]: _, ...restFilters} = state.filters;
    return {
      ...state,
      filters: restFilters,
    };
  }

  return {
    ...state,
    filters: {
      ...state.filters,
      [filterKey]: range,
    },
  };
};

