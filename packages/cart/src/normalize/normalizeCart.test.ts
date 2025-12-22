import {describe, expect, test} from 'vitest';
import {normalizeCart} from './normalizeCart.js';
import type {Cart} from '../types/cart.js';

describe('normalizeCart', () => {
  test('removes zero quantity lines', () => {
    const cart: Cart = {
      lines: [
        {id: '1', quantity: 1, price: 10.0},
        {id: '2', quantity: 0, price: 20.0},
      ],
    };
    const result = normalizeCart(cart);
    expect(result.lines).toHaveLength(1);
  });

  test('removes negative quantity lines', () => {
    const cart: Cart = {
      lines: [
        {id: '1', quantity: 1, price: 10.0},
        {id: '2', quantity: -1, price: 20.0},
      ],
    };
    const result = normalizeCart(cart);
    expect(result.lines).toHaveLength(1);
  });

  test('keeps valid lines', () => {
    const cart: Cart = {
      lines: [
        {id: '1', quantity: 1, price: 10.0},
        {id: '2', quantity: 2, price: 20.0},
      ],
    };
    const result = normalizeCart(cart);
    expect(result.lines).toHaveLength(2);
  });
});

