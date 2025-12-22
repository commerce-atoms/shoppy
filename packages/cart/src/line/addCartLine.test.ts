import {describe, expect, test} from 'vitest';
import {addCartLine} from './addCartLine.js';
import type {CartLine} from '../types/cartLine.js';

describe('addCartLine', () => {
  test('adds line to empty cart', () => {
    const lines: CartLine[] = [];
    const newLine: CartLine = {id: '1', quantity: 1, price: 10.0};
    const result = addCartLine(lines, newLine);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(newLine);
  });

  test('adds line to existing cart', () => {
    const lines: CartLine[] = [{id: '1', quantity: 1, price: 10.0}];
    const newLine: CartLine = {id: '2', quantity: 2, price: 20.0};
    const result = addCartLine(lines, newLine);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(newLine);
  });
});

