import type {CartLine} from '../types/cartLine.js';
import {getCartLineKey} from './getCartLineKey.js';

/**
 * Merges two cart line arrays, combining lines with the same identity.
 * Uses line.id as the identity key by default.
 *
 * @param a - First cart lines array
 * @param b - Second cart lines array
 * @param keyFn - Optional function to extract identity key (defaults to line.id)
 * @returns Merged cart lines array
 *
 * @example
 * ```ts
 * const merged = mergeCartLines(lines1, lines2);
 * // Or with custom identity:
 * const merged = mergeCartLines(lines1, lines2, (line) => line.merchandiseId || line.id);
 * ```
 */
export function mergeCartLines(
  a: CartLine[],
  b: CartLine[],
  keyFn: (line: CartLine) => string = getCartLineKey,
): CartLine[] {
  const merged = new Map<string, CartLine>();

  // Add all lines from first array
  for (const line of a) {
    merged.set(keyFn(line), {...line});
  }

  // Merge lines from second array
  for (const line of b) {
    const key = keyFn(line);
    const existing = merged.get(key);
    if (existing) {
      // Merge quantities, preserve price from existing (first array takes precedence)
      merged.set(key, {
        ...existing,
        quantity: existing.quantity + line.quantity,
        // Price remains from existing line (first array)
      });
    } else {
      merged.set(key, {...line});
    }
  }

  return Array.from(merged.values());
}

