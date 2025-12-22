import {describe, expect, test} from 'vitest';
import {calculateDiscountPercent} from './calculateDiscountPercent.js';

describe('calculateDiscountPercent', () => {
  test('returns undefined when compareAt <= price', () => {
    const result = calculateDiscountPercent(19.99, 19.99);
    expect(result).toBeUndefined();
  });

  test('returns undefined when compareAt < price', () => {
    const result = calculateDiscountPercent(19.99, 29.99);
    expect(result).toBeUndefined();
  });

  test('calculates correct discount when compareAt > price', () => {
    const result = calculateDiscountPercent(29.99, 19.99);
    expect(result).toBe(33);
  });

  test('calculates 50% discount correctly', () => {
    const result = calculateDiscountPercent(20.00, 10.00);
    expect(result).toBe(50);
  });

  test('rounds discount percent', () => {
    const result = calculateDiscountPercent(30.00, 19.99);
    expect(result).toBe(33);
  });

  test('returns undefined for NaN compareAt', () => {
    const result = calculateDiscountPercent(NaN, 19.99);
    expect(result).toBeUndefined();
  });

  test('returns undefined for NaN price', () => {
    const result = calculateDiscountPercent(29.99, NaN);
    expect(result).toBeUndefined();
  });

  test('returns undefined for Infinity compareAt', () => {
    const result = calculateDiscountPercent(Infinity, 19.99);
    expect(result).toBeUndefined();
  });

  test('returns undefined for Infinity price', () => {
    const result = calculateDiscountPercent(29.99, Infinity);
    expect(result).toBeUndefined();
  });

  test('returns undefined when compareAt <= 0', () => {
    expect(calculateDiscountPercent(0, 19.99)).toBeUndefined();
    expect(calculateDiscountPercent(-10, 19.99)).toBeUndefined();
  });

  test('returns undefined when price < 0', () => {
    const result = calculateDiscountPercent(29.99, -10);
    expect(result).toBeUndefined();
  });

  test('handles 100% discount edge case', () => {
    const result = calculateDiscountPercent(20.00, 0.00);
    expect(result).toBe(100);
  });

  test('returns undefined when price >= compareAt', () => {
    expect(calculateDiscountPercent(19.99, 19.99)).toBeUndefined();
    expect(calculateDiscountPercent(19.99, 29.99)).toBeUndefined();
  });
});

