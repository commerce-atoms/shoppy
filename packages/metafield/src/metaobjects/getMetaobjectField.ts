import type {MetaobjectLike, MetaobjectFieldLike} from '../types/metaobject.js';

/**
 * Gets a field from a metaobject by key.
 *
 * Scans the metaobject's fields array in order and returns the first match.
 *
 * @param metaobject - The metaobject containing fields
 * @param fieldKey - The field key to match
 * @returns The matching field, or undefined if not found
 *
 * @example
 * ```ts
 * const field = getMetaobjectField(metaobject, 'description');
 * if (field) {
 *   console.log(field.value);
 * }
 * ```
 */
export function getMetaobjectField(
  metaobject: MetaobjectLike | null | undefined,
  fieldKey: string,
): MetaobjectFieldLike | undefined {
  if (!metaobject?.fields) {
    return undefined;
  }

  for (const field of metaobject.fields) {
    if (!field) {
      continue;
    }

    if (field.key === fieldKey) {
      return field;
    }
  }

  return undefined;
}
