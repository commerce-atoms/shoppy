import {getTimeUntil} from '../diff/getTimeUntil.js';

/**
 * Generates a countdown string for display.
 *
 * @param to - Target date
 * @param now - Current date (defaults to now)
 * @returns Countdown string like "2d 3h left" or "Expired"
 *
 * @example
 * ```ts
 * const countdown = getCountdownString(new Date('2025-12-25'));
 * // Returns: "2d 3h left"
 * ```
 */
export function getCountdownString(
  to: Date,
  now: Date = new Date(),
): string {
  const time = getTimeUntil(to, now);

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return 'Expired';
  }

  const parts: string[] = [];

  if (time.days > 0) {
    parts.push(`${time.days}d`);
  }

  if (time.hours > 0) {
    parts.push(`${time.hours}h`);
  }

  // Show minutes only if no days (to avoid clutter)
  if (time.minutes > 0 && time.days === 0) {
    parts.push(`${time.minutes}m`);
  }

  // Show seconds only if nothing else to show
  if (parts.length === 0 && time.seconds > 0) {
    parts.push(`${time.seconds}s`);
  }

  return parts.length > 0 ? `${parts.join(' ')} left` : 'Expired';
}

