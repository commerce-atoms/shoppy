import {describe, expect, test} from 'vitest';
import {formatMoney} from './formatMoney.js';
import type {MoneyLike} from '../types/money.js';

describe('formatMoney', () => {
  test('returns em dash for null input', () => {
    const result = formatMoney(null);
    expect(result).toBe('—');
  });

  test('returns em dash for undefined input', () => {
    const result = formatMoney(undefined);
    expect(result).toBe('—');
  });

  test('formats string amount correctly', () => {
    const money: MoneyLike = {amount: '19.99', currencyCode: 'USD'};
    const result = formatMoney(money);
    expect(result).toBe('$19.99');
  });

  test('formats number amount correctly', () => {
    const money: MoneyLike = {amount: 19.99, currencyCode: 'USD'};
    const result = formatMoney(money);
    expect(result).toBe('$19.99');
  });

  test('returns em dash for invalid string amount', () => {
    const money: MoneyLike = {amount: 'invalid', currencyCode: 'USD'};
    const result = formatMoney(money);
    expect(result).toBe('—');
  });

  test('formats EUR correctly', () => {
    const money: MoneyLike = {amount: '19.99', currencyCode: 'EUR'};
    const result = formatMoney(money);
    expect(result).toMatch(/19,99|19\.99/); // Locale-dependent
  });

  test('respects locale option', () => {
    const money: MoneyLike = {amount: '19.99', currencyCode: 'EUR'};
    const result = formatMoney(money, {locale: 'de-DE'});
    expect(result).toContain('19,99');
  });

  test('respects minimumFractionDigits option', () => {
    const money: MoneyLike = {amount: '19', currencyCode: 'USD'};
    const result = formatMoney(money, {minimumFractionDigits: 2});
    expect(result).toBe('$19.00');
  });

  test('respects maximumFractionDigits option', () => {
    const money: MoneyLike = {amount: '19.999', currencyCode: 'USD'};
    const result = formatMoney(money, {maximumFractionDigits: 2});
    expect(result).toBe('$20.00'); // Rounded
  });
});

