/**
 * Offset window for pagination.
 * Uses numeric offsets, not GraphQL cursors.
 */
export interface OffsetWindow {
  /**
   * Start index (0-based, inclusive)
   */
  start: number;

  /**
   * End index (0-based, exclusive)
   */
  end: number;

  /**
   * Pagination direction
   */
  direction: "forward" | "backward";
}
