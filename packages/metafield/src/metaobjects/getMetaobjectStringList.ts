import {getMetaobjectField} from './getMetaobjectField.js';
import type {MetaobjectLike} from '../types/metaobject.js';

/**
 * Gets a string array from a metaobject field by key.
 *
 * Handles multiple input formats:
 * - JSON array: `["item1", "item2"]` → `["item1", "item2"]`
 * - Comma-separated string: `"item1, item2"` → `["item1", "item2"]`
 * - Empty or missing field → `[]`
 *
 * @param metaobject - The metaobject containing fields
 * @param key - The field key to match
 * @returns Array of strings, or empty array if field is missing or invalid
 *
 * @example
 * ```ts
 * const tags = getMetaobjectStringList(metaobject, 'tags');
 * // Returns: string[]
 * ```
 */
export function getMetaobjectStringList(
  metaobject: MetaobjectLike | null | undefined,
  key: string,
): string[] {
  const field = getMetaobjectField(metaobject, key);
  if (!field?.value) {
    return [];
  }

  const trimmed = field.value.trim();
  if (trimmed === '') {
    return [];
  }

  // Try parsing as JSON array first
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      // Filter out non-string values and return valid strings
      return parsed
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter((item) => item !== '');
    }
  } catch {
    // Not valid JSON, fall through to comma-separated parsing
  }

  // Fall back to comma-separated string parsing
  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '');
}

