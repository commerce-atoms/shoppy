import type {SearchState} from '../types/searchState.js';

/**
 * Sets the cursor in the state (cursor-based pagination).
 *
 * Use case: Infinite scroll, load more button.
 *
 * @param state - Current search state
 * @param cursor - Cursor value to set (or undefined to clear)
 * @returns New state with cursor updated
 *
 * @example
 * ```ts
 * const newState = setCursor(state, 'eyJpZCI6MTIzfQ==');
 * ```
 */
export const setCursor = (
  state: SearchState,
  cursor: string | undefined,
): SearchState => {
  return {
    ...state,
    cursor,
  };
};

