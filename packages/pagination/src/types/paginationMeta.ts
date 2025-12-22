/**
 * Pagination metadata for UI display.
 */
export interface PaginationMeta {
  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Current page number (1-based)
   */
  currentPage: number;

  /**
   * Whether there is a next page
   */
  hasNext: boolean;

  /**
   * Whether there is a previous page
   */
  hasPrevious: boolean;
}

