import type {MetafieldOwnerLike} from '../types/metafield.js';
import type {ParseMode, ParseResult} from '../types/parse.js';
import {getMetafield} from './getMetafield.js';
import {parseMetafieldValue} from '../parse/parseMetafieldValue.js';

export interface GetMetafieldValueOptions {
  mode?: ParseMode;
  strict?: boolean;
}

/**
 * Gets and parses a metafield value.
 *
 * Locates the metafield and parses its value according to the specified mode.
 * In non-strict mode, returns undefined on failure. In strict mode, returns
 * a ParseResult with a reason.
 *
 * @param owner - The owner object containing metafields
 * @param namespace - The namespace to match
 * @param key - The key to match
 * @param options - Parsing options
 * @returns The parsed value, undefined (non-strict), or ParseResult (strict)
 *
 * @example
 * ```ts
 * // Non-strict mode
 * const color = getMetafieldValue(product, 'custom', 'color');
 * // Returns string | undefined
 *
 * // Strict mode with JSON parsing
 * const result = getMetafieldValue(product, 'custom', 'config', {
 *   mode: 'json',
 *   strict: true,
 * });
 * if (result.ok) {
 *   console.log(result.value);
 * } else {
 *   console.log('Failed:', result.reason);
 * }
 * ```
 */
export function getMetafieldValue<T = string>(
  owner: MetafieldOwnerLike | null | undefined,
  namespace: string,
  key: string,
  options?: GetMetafieldValueOptions,
): T | undefined;

export function getMetafieldValue<T = string>(
  owner: MetafieldOwnerLike | null | undefined,
  namespace: string,
  key: string,
  options: GetMetafieldValueOptions & {strict: true},
): ParseResult<T>;

export function getMetafieldValue<T = string>(
  owner: MetafieldOwnerLike | null | undefined,
  namespace: string,
  key: string,
  options: GetMetafieldValueOptions = {},
): T | undefined | ParseResult<T> {
  const {mode = 'string', strict = false} = options;

  const metafield = getMetafield(owner, namespace, key);

  if (!metafield) {
    if (strict) {
      return {ok: false, reason: 'MISSING'};
    }
    return undefined;
  }

  const rawValue = metafield.value;

  if (rawValue === null || rawValue === undefined || rawValue === '') {
    if (strict) {
      return {ok: false, reason: 'EMPTY'};
    }
    return undefined;
  }

  // Convert to string for parsing
  const stringValue = String(rawValue);

  if (strict) {
    return parseMetafieldValue<T>(stringValue, mode, true);
  }
  return parseMetafieldValue<T>(stringValue, mode, false);
}
