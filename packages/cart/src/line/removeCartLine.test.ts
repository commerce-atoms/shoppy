import {describe, expect, test} from 'vitest';
import {removeCartLine} from './removeCartLine.js';
import type {CartLine} from '../types/cartLine.js';

describe('removeCartLine', () => {
  const lines: CartLine[] = [
    {id: '1', quantity: 1, price: 10.0},
    {id: '2', quantity: 2, price: 20.0},
  ];

  test('removes line by ID', () => {
    const result = removeCartLine(lines, '1');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  test('returns unchanged when ID not found', () => {
    const result = removeCartLine(lines, '999');
    expect(result).toEqual(lines);
  });
});

