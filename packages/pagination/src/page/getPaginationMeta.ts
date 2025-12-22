import type {PaginationMeta} from '../types/paginationMeta.js';

/**
 * Calculates pagination metadata for UI display.
 *
 * @param totalItems - Total number of items
 * @param perPage - Number of items per page
 * @param currentPage - Current page number (1-based)
 * @returns Pagination metadata
 *
 * @example
 * ```ts
 * const meta = getPaginationMeta(100, 10, 2);
 * // Returns: { totalPages: 10, currentPage: 2, hasNext: true, hasPrevious: true }
 * ```
 */
export function getPaginationMeta(
  totalItems: number,
  perPage: number,
  currentPage: number,
): PaginationMeta {
  if (totalItems <= 0 || perPage <= 0) {
    return {
      totalPages: 0,
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
    };
  }

  const totalPages = Math.ceil(totalItems / perPage);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  return {
    totalPages,
    currentPage: safeCurrentPage,
    hasNext: safeCurrentPage < totalPages,
    hasPrevious: safeCurrentPage > 1,
  };
}

