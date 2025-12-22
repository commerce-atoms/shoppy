import type {CartLine} from '../types/cartLine.js';

/**
 * Removes a cart line by ID.
 *
 * @param lines - Existing cart lines
 * @param id - Line ID to remove
 * @returns Updated cart lines array
 *
 * @example
 * ```ts
 * const updated = removeCartLine(lines, '1');
 * ```
 */
export function removeCartLine(
  lines: CartLine[],
  id: string,
): CartLine[] {
  return lines.filter((line) => line.id !== id);
}

