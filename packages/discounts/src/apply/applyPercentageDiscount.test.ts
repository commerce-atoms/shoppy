import {describe, expect, test} from 'vitest';
import {applyPercentageDiscount} from './applyPercentageDiscount.js';

describe('applyPercentageDiscount', () => {
  test('applies 20% discount', () => {
    const result = applyPercentageDiscount(100, 20);
    expect(result).toBe(80);
  });

  test('applies 50% discount', () => {
    const result = applyPercentageDiscount(100, 50);
    expect(result).toBe(50);
  });

  test('handles 0% discount', () => {
    const result = applyPercentageDiscount(100, 0);
    expect(result).toBe(100);
  });

  test('handles 100% discount', () => {
    const result = applyPercentageDiscount(100, 100);
    expect(result).toBe(0);
  });

  test('returns original price for invalid percentage', () => {
    expect(applyPercentageDiscount(100, -10)).toBe(100);
    expect(applyPercentageDiscount(100, 150)).toBe(100);
  });

  test('returns original price for invalid price', () => {
    expect(applyPercentageDiscount(-10, 20)).toBe(-10);
    expect(applyPercentageDiscount(0, 20)).toBe(0);
  });
});

