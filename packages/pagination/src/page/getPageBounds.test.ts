import {describe, expect, test} from 'vitest';
import {getPageBounds} from './getPageBounds.js';

describe('getPageBounds', () => {
  test('calculates bounds for first page', () => {
    const result = getPageBounds(100, 10, 1);
    expect(result).toEqual({start: 0, end: 10});
  });

  test('calculates bounds for middle page', () => {
    const result = getPageBounds(100, 10, 2);
    expect(result).toEqual({start: 10, end: 20});
  });

  test('calculates bounds for last page', () => {
    const result = getPageBounds(100, 10, 10);
    expect(result).toEqual({start: 90, end: 100});
  });

  test('handles partial last page', () => {
    const result = getPageBounds(95, 10, 10);
    expect(result).toEqual({start: 90, end: 95});
  });

  test('returns zero bounds for invalid inputs', () => {
    expect(getPageBounds(0, 10, 1)).toEqual({start: 0, end: 0});
    expect(getPageBounds(100, 0, 1)).toEqual({start: 0, end: 0});
    expect(getPageBounds(100, 10, 0)).toEqual({start: 0, end: 0});
  });

  test('handles page beyond total items', () => {
    const result = getPageBounds(100, 10, 20);
    expect(result.end).toBeLessThanOrEqual(100);
  });
});

