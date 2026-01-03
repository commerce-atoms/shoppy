import { getMetaobjectField } from "./getMetaobjectField.js";
import type { MetaobjectLike } from "../types/metaobject.js";

/**
 * Gets a string value from a metaobject field by key.
 *
 * Extracts the field value, trims whitespace, and returns the result.
 * Returns undefined if the field is missing or the value is empty after trimming.
 *
 * @param metaobject - The metaobject containing fields
 * @param key - The field key to match
 * @param fallback - Optional fallback value to return if field is missing or empty
 * @returns The trimmed string value, fallback if provided, or undefined
 *
 * @example
 * ```ts
 * const title = getMetaobjectString(metaobject, 'title');
 * // Returns: string | undefined
 *
 * const description = getMetaobjectString(metaobject, 'description', 'No description');
 * // Returns: string | undefined (with fallback as default)
 * ```
 */
export function getMetaobjectString(
  metaobject: MetaobjectLike | null | undefined,
  key: string,
  fallback?: string
): string | undefined {
  const field = getMetaobjectField(metaobject, key);
  if (!field?.value) {
    return fallback;
  }

  const trimmed = field.value.trim();
  if (trimmed === "") {
    return fallback;
  }

  return trimmed;
}
