import {describe, expect, test} from 'vitest';
import {formatRange} from './formatRange.js';
import type {MoneyLike} from '../types/money.js';

describe('formatRange', () => {
  test('returns em dash when min is null', () => {
    const max: MoneyLike = {amount: '20.00', currencyCode: 'USD'};
    const result = formatRange(null, max);
    expect(result).toBe('—');
  });

  test('returns em dash when max is null', () => {
    const min: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const result = formatRange(min, null);
    expect(result).toBe('—');
  });

  test('returns em dash when min amount is invalid', () => {
    const min: MoneyLike = {amount: 'invalid', currencyCode: 'USD'};
    const max: MoneyLike = {amount: '20.00', currencyCode: 'USD'};
    const result = formatRange(min, max);
    expect(result).toBe('—');
  });

  test('returns em dash when max amount is invalid', () => {
    const min: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const max: MoneyLike = {amount: 'invalid', currencyCode: 'USD'};
    const result = formatRange(min, max);
    expect(result).toBe('—');
  });

  test('returns em dash for currency mismatch', () => {
    const min: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const max: MoneyLike = {amount: '20.00', currencyCode: 'EUR'};
    const result = formatRange(min, max);
    expect(result).toBe('—');
  });

  test('returns single formatted price when amounts are equal', () => {
    const min: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const max: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const result = formatRange(min, max);
    expect(result).toBe('$10.00');
  });

  test('returns range when amounts differ', () => {
    const min: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const max: MoneyLike = {amount: '20.00', currencyCode: 'USD'};
    const result = formatRange(min, max);
    expect(result).toBe('$10.00–$20.00');
  });

  test('passes options to formatMoney', () => {
    const min: MoneyLike = {amount: '10', currencyCode: 'USD'};
    const max: MoneyLike = {amount: '20', currencyCode: 'USD'};
    const result = formatRange(min, max, {minimumFractionDigits: 2});
    expect(result).toBe('$10.00–$20.00');
  });
});

