import type {TimeDifference} from '../types/timeDifference.js';

/**
 * Calculates time difference until a target date.
 *
 * @param to - Target date
 * @param now - Current date (defaults to now)
 * @returns Time difference breakdown
 *
 * @example
 * ```ts
 * const time = getTimeUntil(new Date('2025-12-25'));
 * // Returns: { days: 2, hours: 3, minutes: 45, seconds: 30 }
 * ```
 */
export function getTimeUntil(
  to: Date,
  now: Date = new Date(),
): TimeDifference {
  const diffMs = to.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

