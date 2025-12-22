import {describe, expect, test} from 'vitest';
import {updateCartLine} from './updateCartLine.js';
import type {CartLine} from '../types/cartLine.js';

describe('updateCartLine', () => {
  const lines: CartLine[] = [
    {id: '1', quantity: 1, price: 10.0},
    {id: '2', quantity: 2, price: 20.0},
  ];

  test('updates quantity', () => {
    const result = updateCartLine(lines, '1', {quantity: 5});
    expect(result[0].quantity).toBe(5);
    expect(result[1]).toEqual(lines[1]);
  });

  test('updates price', () => {
    const result = updateCartLine(lines, '2', {price: 25.0});
    expect(result[1].price).toBe(25.0);
  });

  test('returns unchanged when ID not found', () => {
    const result = updateCartLine(lines, '999', {quantity: 5});
    expect(result).toEqual(lines);
  });
});

