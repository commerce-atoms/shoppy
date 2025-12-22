import type {PageBounds} from '../types/pageBounds.js';

/**
 * Calculates page bounds (start and end indices) for array slicing.
 *
 * @param totalItems - Total number of items
 * @param perPage - Number of items per page
 * @param currentPage - Current page number (1-based)
 * @returns Page bounds with start and end indices
 *
 * @example
 * ```ts
 * const bounds = getPageBounds(100, 10, 2);
 * // Returns: { start: 10, end: 20 }
 * ```
 */
export function getPageBounds(
  totalItems: number,
  perPage: number,
  currentPage: number,
): PageBounds {
  if (totalItems <= 0 || perPage <= 0 || currentPage < 1) {
    return {start: 0, end: 0};
  }

  const start = (currentPage - 1) * perPage;
  const end = Math.min(start + perPage, totalItems);

  return {start, end};
}

