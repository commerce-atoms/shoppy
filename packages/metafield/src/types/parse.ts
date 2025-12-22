/**
 * Parse mode for metafield value extraction.
 */
export type ParseMode = "string" | "json" | "number" | "boolean";

/**
 * Parse failure reason literal strings.
 *
 * These literal strings are part of the public API contract.
 * Changing them is a breaking change (even in 0.x) and must follow the repo's versioning policy.
 */
export type ParseFailureReason = "MISSING" | "EMPTY" | "INVALID";

/**
 * Result of parsing a metafield value.
 * Discriminated union for type-safe error handling.
 */
export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: ParseFailureReason };
