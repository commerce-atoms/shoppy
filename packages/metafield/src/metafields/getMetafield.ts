import type {MetafieldLike, MetafieldOwnerLike} from '../types/metafield.js';

/**
 * Locates a metafield by namespace and key.
 *
 * Scans the owner's metafields array in order and returns the first match.
 * This function is deterministic: first match wins.
 *
 * @param owner - The owner object containing metafields
 * @param namespace - The namespace to match
 * @param key - The key to match
 * @returns The matching metafield, or undefined if not found
 *
 * @example
 * ```ts
 * const metafield = getMetafield(product, 'custom', 'color');
 * if (metafield) {
 *   console.log(metafield.value);
 * }
 * ```
 */
export function getMetafield(
  owner: MetafieldOwnerLike | null | undefined,
  namespace: string,
  key: string,
): MetafieldLike | undefined {
  if (!owner?.metafields) {
    return undefined;
  }

  for (const metafield of owner.metafields) {
    if (!metafield) {
      continue;
    }

    if (metafield.namespace === namespace && metafield.key === key) {
      return metafield;
    }
  }

  return undefined;
}

