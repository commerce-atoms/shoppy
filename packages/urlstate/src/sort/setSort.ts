import type {SearchState} from '../types/searchState.js';

/**
 * Sets the sort value in the state.
 *
 * Use case: Sort dropdown or toggle.
 *
 * @param state - Current search state
 * @param sortValue - Sort value to set (or undefined to clear)
 * @returns New state with sort updated
 *
 * @example
 * ```ts
 * const newState = setSort(state, 'price-asc');
 * ```
 */
export const setSort = (
  state: SearchState,
  sortValue: string | undefined,
): SearchState => {
  return {
    ...state,
    sort: sortValue,
  };
};

