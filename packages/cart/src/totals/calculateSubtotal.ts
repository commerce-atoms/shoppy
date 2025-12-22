import type {CartLine} from '../types/cartLine.js';

/**
 * Calculates the subtotal from cart lines.
 *
 * @param lines - Array of cart lines
 * @returns Subtotal amount
 *
 * @example
 * ```ts
 * const subtotal = calculateSubtotal([
 *   { id: '1', quantity: 2, price: 10.00 },
 *   { id: '2', quantity: 1, price: 20.00 },
 * ]);
 * // Returns: 40.00
 * ```
 */
export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => {
    return total + line.price * line.quantity;
  }, 0);
}

