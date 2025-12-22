import type {CartLine} from './cartLine.js';

/**
 * Cart type for operations.
 */
export interface Cart {
  /**
   * Cart lines
   */
  lines: CartLine[];
}

