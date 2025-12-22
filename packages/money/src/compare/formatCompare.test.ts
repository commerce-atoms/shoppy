import {describe, expect, test} from 'vitest';
import {formatCompare} from './formatCompare.js';
import type {MoneyLike} from '../types/money.js';

describe('formatCompare', () => {
  test('returns show:false with em dash when price is null', () => {
    const result = formatCompare(null, {amount: '29.99', currencyCode: 'USD'});
    expect(result).toEqual({show: false, price: '—'});
  });

  test('returns show:false when compareAtPrice is missing', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const result = formatCompare(price, null);
    expect(result).toEqual({show: false, price: '$19.99'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:false when price amount is invalid', () => {
    const price: MoneyLike = {amount: 'invalid', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '29.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({show: false, price: '—'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:false when compareAt amount is invalid', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: 'invalid', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({show: false, price: '$19.99'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:false for currency mismatch', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '29.99', currencyCode: 'EUR'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({show: false, price: '$19.99'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:false when compareAt <= price', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({show: false, price: '$19.99'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:false when compareAt < price', () => {
    const price: MoneyLike = {amount: '29.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({show: false, price: '$29.99'});
    expect(result.discountPercent).toBeUndefined();
  });

  test('returns show:true when compareAt > price', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '29.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result).toEqual({
      show: true,
      price: '$19.99',
      compareAt: '$29.99',
      discountPercent: 33,
    });
  });

  test('calculates discount percent correctly', () => {
    const price: MoneyLike = {amount: '10.00', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '20.00', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result.discountPercent).toBe(50);
  });

  test('rounds discount percent', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '29.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt);
    expect(result.discountPercent).toBe(33);
  });

  test('passes options to formatMoney', () => {
    const price: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const compareAt: MoneyLike = {amount: '29.99', currencyCode: 'USD'};
    const result = formatCompare(price, compareAt, {minimumFractionDigits: 2});
    expect(result.price).toBe('$19.99');
    expect(result.compareAt).toBe('$29.99');
  });
});
