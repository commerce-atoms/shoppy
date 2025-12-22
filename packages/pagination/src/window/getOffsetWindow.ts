import type {OffsetWindow} from '../types/offsetWindow.js';

/**
 * Calculates offset window for pagination.
 * Uses numeric offsets, not GraphQL cursors.
 *
 * @param totalItems - Total number of items
 * @param args - Pagination arguments with numeric offsets
 * @returns Offset window with start, end, and direction
 *
 * @example
 * ```ts
 * const window = getOffsetWindow(100, { afterOffset: 0, first: 10 });
 * // Returns: { start: 0, end: 10, direction: 'forward' }
 * ```
 */
export function getOffsetWindow(
  totalItems: number,
  args: {
    afterOffset?: number;
    beforeOffset?: number;
    first?: number;
    last?: number;
  },
): OffsetWindow {
  const {afterOffset, beforeOffset, first, last} = args;

  // Forward pagination
  if (first !== undefined && first > 0) {
    const startIndex = afterOffset !== undefined ? afterOffset + 1 : 0;
    const endIndex = Math.min(startIndex + first, totalItems);

    return {
      start: startIndex,
      end: endIndex,
      direction: 'forward',
    };
  }

  // Backward pagination
  if (last !== undefined && last > 0) {
    const endIndex = beforeOffset !== undefined ? beforeOffset : totalItems;
    const startIndex = Math.max(0, endIndex - last);

    return {
      start: startIndex,
      end: endIndex,
      direction: 'backward',
    };
  }

  // Default: return all items
  return {
    start: 0,
    end: totalItems,
    direction: 'forward',
  };
}

