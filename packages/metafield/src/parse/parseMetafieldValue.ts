import type {ParseMode, ParseResult} from '../types/parse.js';

/**
 * Parses a metafield value string according to the specified mode.
 *
 * This is a pure parsing function that handles the conversion logic.
 * It does not handle missing/empty values - those should be checked
 * before calling this function.
 *
 * @param value - The raw string value to parse
 * @param mode - The parsing mode to use
 * @param strict - If true, returns ParseResult; if false, returns value or undefined
 * @returns Parsed value, undefined (non-strict), or ParseResult (strict)
 *
 * @example
 * ```ts
 * // Non-strict mode
 * const num = parseMetafieldValue('42', 'number', false);
 * // Returns: 42
 *
 * // Strict mode
 * const result = parseMetafieldValue('invalid', 'number', true);
 * // Returns: { ok: false, reason: 'INVALID' }
 * ```
 */
export function parseMetafieldValue<T = string>(
  value: string,
  mode: ParseMode,
  strict: false,
): T | undefined;

export function parseMetafieldValue<T = string>(
  value: string,
  mode: ParseMode,
  strict: true,
): ParseResult<T>;

export function parseMetafieldValue<T = string>(
  value: string,
  mode: ParseMode,
  strict: boolean,
): T | undefined | ParseResult<T> {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    if (strict) {
      return {ok: false, reason: 'EMPTY'};
    }
    return undefined;
  }

  switch (mode) {
    case 'string': {
      if (strict) {
        return {ok: true, value: trimmedValue as T};
      }
      return trimmedValue as T;
    }

    case 'json': {
      try {
        const parsed = JSON.parse(trimmedValue) as T;
        if (strict) {
          return {ok: true, value: parsed};
        }
        return parsed;
      } catch {
        if (strict) {
          return {ok: false, reason: 'INVALID'};
        }
        return undefined;
      }
    }

    case 'number': {
      const num = Number(trimmedValue);
      if (isNaN(num)) {
        if (strict) {
          return {ok: false, reason: 'INVALID'};
        }
        return undefined;
      }
      if (strict) {
        return {ok: true, value: num as T};
      }
      return num as T;
    }

    case 'boolean': {
      const lower = trimmedValue.toLowerCase();
      if (lower === 'true') {
        if (strict) {
          return {ok: true, value: true as T};
        }
        return true as T;
      }
      if (lower === 'false') {
        if (strict) {
          return {ok: true, value: false as T};
        }
        return false as T;
      }
      if (strict) {
        return {ok: false, reason: 'INVALID'};
      }
      return undefined;
    }

    default: {
      if (strict) {
        return {ok: false, reason: 'INVALID'};
      }
      return undefined;
    }
  }
}
