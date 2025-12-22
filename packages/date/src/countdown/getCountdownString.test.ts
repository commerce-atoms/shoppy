import {describe, expect, test} from 'vitest';
import {getCountdownString} from './getCountdownString.js';

describe('getCountdownString', () => {
  test('formats days and hours', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const future = new Date('2024-01-03T03:00:00Z');
    const result = getCountdownString(future, now);
    expect(result).toBe('2d 3h left');
  });

  test('formats hours and minutes when no days', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const future = new Date('2024-01-01T03:45:00Z');
    const result = getCountdownString(future, now);
    expect(result).toBe('3h 45m left');
  });

  test('returns "Expired" for past dates', () => {
    const now = new Date('2024-01-01T00:00:00Z');
    const past = new Date('2023-12-31T00:00:00Z');
    const result = getCountdownString(past, now);
    expect(result).toBe('Expired');
  });

  test('returns "Expired" for same date', () => {
    const date = new Date('2024-01-01T00:00:00Z');
    const result = getCountdownString(date, date);
    expect(result).toBe('Expired');
  });
});

