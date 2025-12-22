import type {SearchState} from '../types/searchState.js';

/**
 * Sets the page number in the state.
 *
 * Use case: Page number pagination controls.
 *
 * @param state - Current search state
 * @param page - Page number to set (1-indexed)
 * @returns New state with page updated
 *
 * @example
 * ```ts
 * const newState = setPage(state, 2);
 * ```
 */
export const setPage = (state: SearchState, page: number): SearchState => {
  return {
    ...state,
    page: page > 0 ? page : undefined,
  };
};

