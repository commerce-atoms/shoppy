import type {FilterValue} from './searchState.js';

/**
 * Filter field configuration.
 */
export interface FilterFieldConfig {
  /**
   * Type of filter.
   * - 'single': Single value (radio, dropdown)
   * - 'multiple': Multiple values (checkboxes)
   * - 'range': Numeric range (price, rating)
   */
  type: 'single' | 'multiple' | 'range';

  /**
   * URL param name for this filter.
   */
  param: string;

  /**
   * Default value (optional).
   */
  default?: FilterValue;
}

/**
 * Sort field configuration.
 */
export interface SortFieldConfig {
  /**
   * URL param name for sort.
   */
  param: string;

  /**
   * Default sort value (optional).
   */
  default?: string;

  /**
   * Valid sort values (used by parser for best-effort filtering, not strict validation).
   */
  validValues?: string[];
}

/**
 * Pagination configuration.
 */
export interface PaginationConfig {
  /**
   * Type of pagination.
   * - 'page': Page number pagination
   * - 'cursor': Cursor-based pagination
   */
  type: 'page' | 'cursor';

  /**
   * URL param name for page/cursor.
   */
  param: string;

  /**
   * Default page number (for 'page' type).
   */
  defaultPage?: number;
}

/**
 * Complete search schema definition.
 */
export interface SearchSchema {
  filters: Record<string, FilterFieldConfig>;
  sort?: SortFieldConfig;
  pagination?: PaginationConfig;
}

