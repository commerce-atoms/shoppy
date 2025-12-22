import {describe, expect, test} from 'vitest';
import {getTimeUntil} from './getTimeUntil.js';

describe('getTimeUntil', () => {
  test('calculates time difference', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const future = new Date('2024-01-03T03:45:30Z');
    const result = getTimeUntil(future, now);
    expect(result).toEqual({
      days: 2,
      hours: 3,
      minutes: 45,
      seconds: 30,
    });
  });

  test('returns zeros for past dates', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const past = new Date('2023-12-31T00:00:00Z');
    const result = getTimeUntil(past, now);
    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  test('handles same date', () => {
    const date = new Date('2024-01-01T00:00:00Z');
    const result = getTimeUntil(date, date);
    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});

