import type {SearchState} from '../types/searchState.js';

/**
 * Clears a specific filter from the state.
 *
 * Use case: "Clear" button on a single filter.
 *
 * @param state - Current search state
 * @param filterKey - Filter key to clear
 * @returns New state with filter removed
 *
 * @example
 * ```ts
 * const newState = clearFilter(state, 'color');
 * ```
 */
export const clearFilter = (
  state: SearchState,
  filterKey: string,
): SearchState => {
  const {[filterKey]: _, ...restFilters} = state.filters;

  return {
    ...state,
    filters: restFilters,
  };
};

