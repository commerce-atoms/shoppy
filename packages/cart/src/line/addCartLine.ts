import type {CartLine} from '../types/cartLine.js';

/**
 * Adds a new line to the cart.
 *
 * @param lines - Existing cart lines
 * @param line - New line to add
 * @returns Updated cart lines array
 *
 * @example
 * ```ts
 * const updated = addCartLine(lines, { id: '3', quantity: 1, price: 15.00 });
 * ```
 */
export function addCartLine(
  lines: CartLine[],
  line: CartLine,
): CartLine[] {
  return [...lines, line];
}

