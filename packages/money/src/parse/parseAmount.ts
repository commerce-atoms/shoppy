/**
 * Parses a money amount from string or number to number.
 *
 * This is a pure parsing function that handles the conversion logic.
 * Returns NaN for invalid inputs, which should be checked by callers.
 *
 * @param amount - The amount as string or number
 * @returns Parsed number, or NaN if invalid
 *
 * @example
 * ```ts
 * const num = parseAmount('19.99');
 * // Returns: 19.99
 *
 * const num = parseAmount(42);
 * // Returns: 42
 *
 * const num = parseAmount('invalid');
 * // Returns: NaN
 * ```
 */
export function parseAmount(amount: string | number): number {
  if (typeof amount === 'number') {
    // Check for non-finite numbers (NaN, Infinity, -Infinity)
    if (!Number.isFinite(amount)) {
      return NaN;
    }
    return amount;
  }

  // Empty or whitespace-only strings parse to NaN
  if (typeof amount === 'string' && amount.trim() === '') {
    return NaN;
  }

  const parsed = Number(amount);

  // Check for non-finite results
  if (!Number.isFinite(parsed)) {
    return NaN;
  }

  return parsed;
}

