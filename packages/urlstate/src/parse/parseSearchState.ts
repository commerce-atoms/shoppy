import type {SearchSchema} from '../types/schema.js';
import type {SearchState, FilterValue} from '../types/searchState.js';
import type {ParseSearchStateOptions} from '../types/options.js';

/**
 * Parses URL search params into typed search state using a schema.
 *
 * Use case: Convert URLSearchParams into your app's filter state.
 *
 * @param searchParams - URL search parameters
 * @param schema - Search schema definition
 * @param options - Parse options
 * @returns Typed search state
 *
 * @example
 * ```ts
 * const state = parseSearchState(
 *   new URLSearchParams('?color=red&color=blue&price=10-50'),
 *   schema
 * );
 * ```
 */
export const parseSearchState = (
  searchParams: URLSearchParams,
  schema: SearchSchema,
  options: ParseSearchStateOptions = {},
): SearchState => {
  const {includeDefaults = true} = options;
  const state: SearchState = {filters: {}};

  // Parse filters
  for (const [filterKey, filterConfig] of Object.entries(schema.filters)) {
    const paramValue = searchParams.get(filterConfig.param);
    const paramValues = searchParams.getAll(filterConfig.param);

    let filterValue: FilterValue | undefined;

    if (filterConfig.type === 'single') {
      filterValue = paramValue || undefined;
    } else if (filterConfig.type === 'multiple') {
      filterValue = paramValues.length > 0 ? paramValues : undefined;
    } else if (filterConfig.type === 'range') {
      if (paramValue) {
        const [minStr, maxStr] = paramValue.split('-');
        const min = minStr ? parseFloat(minStr) : undefined;
        const max = maxStr ? parseFloat(maxStr) : undefined;
        if (min !== undefined || max !== undefined) {
          filterValue = {min, max};
        }
      }
    }

    // Use parsed value or default
    if (filterValue !== undefined) {
      state.filters[filterKey] = filterValue;
    } else if (includeDefaults && filterConfig.default !== undefined) {
      state.filters[filterKey] = filterConfig.default;
    }
  }

  // Parse sort
  if (schema.sort) {
    const sortValue = searchParams.get(schema.sort.param);
    if (sortValue) {
      // Filter to validValues if provided (best-effort, not strict validation)
      if (
        !schema.sort.validValues ||
        schema.sort.validValues.includes(sortValue)
      ) {
        state.sort = sortValue;
      }
    } else if (includeDefaults && schema.sort.default) {
      state.sort = schema.sort.default;
    }
  }

  // Parse pagination
  if (schema.pagination) {
    if (schema.pagination.type === 'page') {
      const pageStr = searchParams.get(schema.pagination.param);
      const page = pageStr ? parseInt(pageStr, 10) : undefined;
      if (page && page > 0) {
        state.page = page;
      } else if (includeDefaults && schema.pagination.defaultPage) {
        state.page = schema.pagination.defaultPage;
      }
    } else if (schema.pagination.type === 'cursor') {
      const cursor = searchParams.get(schema.pagination.param);
      if (cursor) {
        state.cursor = cursor;
      }
    }
  }

  return state;
};

