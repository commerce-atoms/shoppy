import {describe, expect, test} from 'vitest';
import {calculateTotalQuantity} from './calculateTotalQuantity.js';
import type {CartLine} from '../types/cartLine.js';

describe('calculateTotalQuantity', () => {
  test('calculates total for single line', () => {
    const lines: CartLine[] = [{id: '1', quantity: 2, price: 10.0}];
    const result = calculateTotalQuantity(lines);
    expect(result).toBe(2);
  });

  test('calculates total for multiple lines', () => {
    const lines: CartLine[] = [
      {id: '1', quantity: 2, price: 10.0},
      {id: '2', quantity: 3, price: 20.0},
    ];
    const result = calculateTotalQuantity(lines);
    expect(result).toBe(5);
  });

  test('returns zero for empty array', () => {
    const result = calculateTotalQuantity([]);
    expect(result).toBe(0);
  });
});

