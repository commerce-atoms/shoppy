import {describe, expect, test} from 'vitest';
import {isDateExpired} from './isDateExpired.js';

describe('isDateExpired', () => {
  test('returns true for past dates', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const past = new Date('2023-12-31T00:00:00Z');
    expect(isDateExpired(past, now)).toBe(true);
  });

  test('returns false for future dates', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const future = new Date('2025-01-01T00:00:00Z');
    expect(isDateExpired(future, now)).toBe(false);
  });

  test('returns true for same date', () => {
    const date = new Date('2024-01-01T00:00:00Z');
    expect(isDateExpired(date, date)).toBe(true);
  });
});

