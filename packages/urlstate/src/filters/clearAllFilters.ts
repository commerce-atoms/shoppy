import type {SearchState} from '../types/searchState.js';

/**
 * Clears all filters from the state.
 *
 * Use case: "Clear all filters" button.
 *
 * @param state - Current search state
 * @returns New state with all filters removed
 *
 * @example
 * ```ts
 * const newState = clearAllFilters(state);
 * ```
 */
export const clearAllFilters = (state: SearchState): SearchState => {
  return {
    ...state,
    filters: {},
  };
};

