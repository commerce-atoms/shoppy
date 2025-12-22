import {describe, expect, test} from 'vitest';
import {applyFixedDiscount} from './applyFixedDiscount.js';

describe('applyFixedDiscount', () => {
  test('applies fixed discount', () => {
    const result = applyFixedDiscount(100, 15);
    expect(result).toBe(85);
  });

  test('handles discount larger than price', () => {
    const result = applyFixedDiscount(10, 15);
    expect(result).toBe(0);
  });

  test('handles zero discount', () => {
    const result = applyFixedDiscount(100, 0);
    expect(result).toBe(100);
  });

  test('returns original price for invalid inputs', () => {
    expect(applyFixedDiscount(-10, 15)).toBe(-10);
    expect(applyFixedDiscount(100, -5)).toBe(100);
  });
});

