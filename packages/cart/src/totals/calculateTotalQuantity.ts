import type {CartLine} from '../types/cartLine.js';

/**
 * Calculates the total quantity of items in cart.
 *
 * @param lines - Array of cart lines
 * @returns Total quantity
 *
 * @example
 * ```ts
 * const total = calculateTotalQuantity([
 *   { id: '1', quantity: 2, price: 10.00 },
 *   { id: '2', quantity: 3, price: 20.00 },
 * ]);
 * // Returns: 5
 * ```
 */
export function calculateTotalQuantity(lines: CartLine[]): number {
  return lines.reduce((total, line) => {
    return total + line.quantity;
  }, 0);
}

