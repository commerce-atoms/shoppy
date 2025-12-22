import type {CartLine} from '../types/cartLine.js';

/**
 * Updates a cart line by ID.
 *
 * @param lines - Existing cart lines
 * @param id - Line ID to update
 * @param updates - Partial line updates
 * @returns Updated cart lines array
 *
 * @example
 * ```ts
 * const updated = updateCartLine(lines, '1', { quantity: 5 });
 * ```
 */
export function updateCartLine(
  lines: CartLine[],
  id: string,
  updates: Partial<Omit<CartLine, 'id'>>,
): CartLine[] {
  return lines.map((line) =>
    line.id === id ? {...line, ...updates} : line,
  );
}

