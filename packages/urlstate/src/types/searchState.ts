/**
 * Filter value types.
 */
export type FilterValue = string | string[] | {min?: number; max?: number};

/**
 * Search state representing current filters, sort, and pagination.
 */
export interface SearchState {
  filters: Record<string, FilterValue | undefined>;
  sort?: string;
  page?: number;
  cursor?: string;
  [key: string]: unknown;
}
