import type {Cart} from '../types/cart.js';

/**
 * Normalizes a cart by removing lines with zero or negative quantities.
 *
 * @param cart - Cart to normalize
 * @returns Normalized cart
 *
 * @example
 * ```ts
 * const normalized = normalizeCart(cart);
 * ```
 */
export function normalizeCart(cart: Cart): Cart {
  return {
    lines: cart.lines.filter((line) => line.quantity > 0),
  };
}

