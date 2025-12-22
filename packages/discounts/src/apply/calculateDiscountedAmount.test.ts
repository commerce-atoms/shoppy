import {describe, expect, test} from 'vitest';
import {calculateDiscountedAmount} from './calculateDiscountedAmount.js';
import type {Discount} from '../types/discount.js';

describe('calculateDiscountedAmount', () => {
  test('calculates percentage discount', () => {
    const discount: Discount = {type: 'percent', value: 20};
    const result = calculateDiscountedAmount(100, discount);
    expect(result).toBe(80);
  });

  test('calculates fixed discount', () => {
    const discount: Discount = {type: 'fixed', value: 15};
    const result = calculateDiscountedAmount(100, discount);
    expect(result).toBe(85);
  });
});

