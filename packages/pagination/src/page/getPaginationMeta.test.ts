import {describe, expect, test} from 'vitest';
import {getPaginationMeta} from './getPaginationMeta.js';

describe('getPaginationMeta', () => {
  test('calculates metadata for first page', () => {
    const result = getPaginationMeta(100, 10, 1);
    expect(result).toEqual({
      totalPages: 10,
      currentPage: 1,
      hasNext: true,
      hasPrevious: false,
    });
  });

  test('calculates metadata for middle page', () => {
    const result = getPaginationMeta(100, 10, 5);
    expect(result).toEqual({
      totalPages: 10,
      currentPage: 5,
      hasNext: true,
      hasPrevious: true,
    });
  });

  test('calculates metadata for last page', () => {
    const result = getPaginationMeta(100, 10, 10);
    expect(result).toEqual({
      totalPages: 10,
      currentPage: 10,
      hasNext: false,
      hasPrevious: true,
    });
  });

  test('handles partial last page', () => {
    const result = getPaginationMeta(95, 10, 10);
    expect(result.totalPages).toBe(10);
    expect(result.hasNext).toBe(false);
  });

  test('handles single page', () => {
    const result = getPaginationMeta(5, 10, 1);
    expect(result).toEqual({
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
    });
  });

  test('clamps current page to valid range', () => {
    const result = getPaginationMeta(100, 10, 0);
    expect(result.currentPage).toBe(1);
    expect(result.hasPrevious).toBe(false);
  });

  test('returns zero metadata for invalid inputs', () => {
    const result = getPaginationMeta(0, 10, 1);
    expect(result.totalPages).toBe(0);
    expect(result.hasNext).toBe(false);
    expect(result.hasPrevious).toBe(false);
  });
});

