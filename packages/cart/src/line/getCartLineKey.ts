import type {CartLine} from '../types/cartLine.js';

/**
 * Default identity strategy for cart lines.
 * Uses line.id as the key.
 *
 * @param line - Cart line
 * @returns Unique key for the line
 */
export function getCartLineKey(line: CartLine): string {
  return line.id;
}

/**
 * Creates a custom identity strategy for cart lines.
 * Useful for merging by variantId + attributes instead of line.id.
 *
 * @param keyFn - Function that extracts a unique key from a cart line
 * @returns Identity function for cart lines
 *
 * @example
 * ```ts
 * const byVariantAndAttrs = createCartLineKeyFn((line) => {
 *   const attrs = line.customAttributes
 *     ?.map((a) => `${a.key}:${a.value}`)
 *     .sort()
 *     .join('|') || '';
 *   return `${line.merchandiseId || line.id}|${attrs}`;
 * });
 * ```
 */
export function createCartLineKeyFn(
  keyFn: (line: CartLine) => string,
): (line: CartLine) => string {
  return keyFn;
}

