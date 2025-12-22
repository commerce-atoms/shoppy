import {describe, expect, test} from 'vitest';
import {validateDiscountRule} from './validateDiscountRule.js';

describe('validateDiscountRule', () => {
  test('validates minSpend', () => {
    expect(validateDiscountRule(100, {minSpend: 50})).toBe(true);
    expect(validateDiscountRule(30, {minSpend: 50})).toBe(false);
  });

  test('validates expiry date', () => {
    const future = new Date('2025-12-31');
    const past = new Date('2020-01-01');
    const now = new Date('2024-01-01');

    expect(validateDiscountRule(100, {expiresAt: future}, now)).toBe(true);
    expect(validateDiscountRule(100, {expiresAt: past}, now)).toBe(false);
  });

  test('validates both minSpend and expiry', () => {
    const future = new Date('2025-12-31');
    const now = new Date('2024-01-01');

    expect(
      validateDiscountRule(100, {minSpend: 50, expiresAt: future}, now),
    ).toBe(true);
    expect(
      validateDiscountRule(30, {minSpend: 50, expiresAt: future}, now),
    ).toBe(false);
  });

  test('returns true when no rules specified', () => {
    expect(validateDiscountRule(100, {})).toBe(true);
  });
});

