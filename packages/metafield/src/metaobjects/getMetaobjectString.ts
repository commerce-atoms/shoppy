import { getMetaobjectField } from "./getMetaobjectField.js";
import type { MetaobjectLike } from "../types/metaobject.js";
import { parseMetafieldValue } from "../parse/parseMetafieldValue.js";

/**
 * Gets a string value from a metaobject field by key.
 *
 * **Pattern:** Scans the metaobject's `fields` array to find the matching field.
 * Use this for simple string values where field scanning is acceptable.
 *
 * Extracts the field value, parses it as a string, and returns the result.
 * Returns null if the field is missing or the value is empty after parsing.
 *
 * **Return contract:** Never returns `undefined`. Missing or empty fields return `null`.
 *
 * @param metaobject - The metaobject containing fields
 * @param key - The field key to match
 * @returns The parsed string value, or null if missing or empty (never undefined)
 *
 * @example
 * ```ts
 * const title = getMetaobjectString(metaobject, 'title');
 * // Returns: string | null
 * ```
 */
export function getMetaobjectString(
  metaobject: MetaobjectLike | null | undefined,
  key: string
): string | null {
  const field = getMetaobjectField(metaobject, key);
  if (!field?.value) {
    return null;
  }

  const parsed = parseMetafieldValue<string>(
    String(field.value),
    "string",
    false
  );
  return parsed ?? null;
}
