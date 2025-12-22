import {describe, expect, test} from 'vitest';
import {composeDiscounts} from './composeDiscounts.js';
import type {Discount} from '../types/discount.js';

describe('composeDiscounts', () => {
  test('composes percentage and fixed discounts', () => {
    const discounts: Discount[] = [
      {type: 'percent', value: 10},
      {type: 'fixed', value: 5},
    ];
    const result = composeDiscounts(100, discounts);
    // 100 - 10% = 90, then - 5 = 85
    expect(result).toBe(85);
  });

  test('handles empty array', () => {
    const result = composeDiscounts(100, []);
    expect(result).toBe(100);
  });

  test('handles multiple percentage discounts', () => {
    const discounts: Discount[] = [
      {type: 'percent', value: 10},
      {type: 'percent', value: 10},
    ];
    const result = composeDiscounts(100, discounts);
    // 100 - 10% = 90, then - 10% = 81
    expect(result).toBe(81);
  });
});

