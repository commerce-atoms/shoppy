import type {MetafieldOwnerLike} from '../types/metafield.js';
import {getMetafield} from '../metafields/getMetafield.js';

/**
 * Gets a metaobject reference from a metafield.
 *
 * Locates the metafield and returns its reference property if present.
 * No validation is performed on the reference shape.
 *
 * @param owner - The owner object containing metafields
 * @param namespace - The namespace to match
 * @param key - The key to match
 * @returns The reference value, or undefined if not found
 *
 * @example
 * ```ts
 * const reference = getMetaobjectReferenceFromMetafield(product, 'custom', 'related');
 * if (reference) {
 *   // Use reference (shape depends on your schema)
 * }
 * ```
 */
export function getMetaobjectReferenceFromMetafield(
  owner: MetafieldOwnerLike | null | undefined,
  namespace: string,
  key: string,
): unknown | undefined {
  const metafield = getMetafield(owner, namespace, key);
  return metafield?.reference ?? undefined;
}
