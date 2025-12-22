import type {SearchState} from '../types/searchState.js';

/**
 * Toggles a filter value (adds if missing, removes if present).
 *
 * Use case: Checkbox or multi-select filter behavior.
 *
 * @param state - Current search state
 * @param filterKey - Filter key to toggle
 * @param value - Value to toggle
 * @returns New state with filter toggled
 *
 * @example
 * ```ts
 * const newState = toggleFilter(state, 'color', 'red');
 * // If 'red' was in colors → removes it
 * // If 'red' was not in colors → adds it
 * ```
 */
export const toggleFilter = (
  state: SearchState,
  filterKey: string,
  value: string,
): SearchState => {
  const currentValue = state.filters[filterKey];

  // If current value is an array (multiple filter)
  if (Array.isArray(currentValue)) {
    const index = currentValue.indexOf(value);
    const newValues =
      index >= 0
        ? currentValue.filter((v) => v !== value) // Remove if present
        : [...currentValue, value]; // Add if missing

    if (newValues.length === 0) {
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
        [filterKey]: newValues,
      },
    };
  }

  // If current value is a single value
  if (typeof currentValue === 'string') {
    // Toggle: remove if same, replace if different
    if (currentValue === value) {
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
        [filterKey]: value,
      },
    };
  }

  // If no current value, set as array with single value
  return {
    ...state,
    filters: {
      ...state.filters,
      [filterKey]: [value],
    },
  };
};

