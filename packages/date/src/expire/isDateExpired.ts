/**
 * Checks if a date has expired.
 *
 * @param date - Date to check
 * @param now - Current date (defaults to now)
 * @returns Whether the date has expired
 *
 * @example
 * ```ts
 * const expired = isDateExpired(new Date('2025-12-25'));
 * ```
 */
export function isDateExpired(
  date: Date,
  now: Date = new Date(),
): boolean {
  return date.getTime() <= now.getTime();
}

