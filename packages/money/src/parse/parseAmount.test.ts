import {describe, expect, test} from 'vitest';
import {parseAmount} from './parseAmount.js';

describe('parseAmount', () => {
  test('returns number when input is number', () => {
    const result = parseAmount(42);
    expect(result).toBe(42);
  });

  test('parses valid string number', () => {
    const result = parseAmount('19.99');
    expect(result).toBe(19.99);
  });

  test('parses integer string', () => {
    const result = parseAmount('42');
    expect(result).toBe(42);
  });

  test('returns NaN for invalid string', () => {
    const result = parseAmount('invalid');
    expect(isNaN(result)).toBe(true);
  });

  test('returns NaN for empty string', () => {
    const result = parseAmount('');
    expect(isNaN(result)).toBe(true);
  });

  test('returns NaN for whitespace-only string', () => {
    const result = parseAmount('   ');
    expect(isNaN(result)).toBe(true);
  });

  test('returns NaN for non-finite numbers', () => {
    expect(isNaN(parseAmount(Infinity))).toBe(true);
    expect(isNaN(parseAmount(-Infinity))).toBe(true);
    expect(isNaN(parseAmount(NaN))).toBe(true);
  });

  test('handles negative numbers', () => {
    const result = parseAmount('-10.50');
    expect(result).toBe(-10.5);
  });

  test('handles zero', () => {
    const result = parseAmount(0);
    expect(result).toBe(0);
  });

  test('handles zero string', () => {
    const result = parseAmount('0');
    expect(result).toBe(0);
  });
});
