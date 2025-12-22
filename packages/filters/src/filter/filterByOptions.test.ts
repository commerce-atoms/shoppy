import {describe, expect, test} from 'vitest';
import {filterByOptions} from './filterByOptions.js';
import type {Product} from '../types/product.js';

describe('filterByOptions', () => {
  const products: Product[] = [
    {
      options: [
        {name: 'color', value: 'red'},
        {name: 'size', value: 'large'},
      ],
    },
    {
      options: [
        {name: 'color', value: 'blue'},
        {name: 'size', value: 'large'},
      ],
    },
    {
      options: [{name: 'color', value: 'red'}],
    },
    {},
  ];

  test('returns all products when no options specified', () => {
    const result = filterByOptions(products, {});
    expect(result).toHaveLength(4);
  });

  test('filters by single option', () => {
    const result = filterByOptions(products, {color: 'red'});
    expect(result).toHaveLength(2);
  });

  test('filters by multiple options (AND logic)', () => {
    const result = filterByOptions(products, {
      color: 'red',
      size: 'large',
    });
    expect(result).toHaveLength(1);
  });

  test('returns empty when no matches', () => {
    const result = filterByOptions(products, {color: 'green'});
    expect(result).toHaveLength(0);
  });

  test('handles products without options', () => {
    const result = filterByOptions(products, {color: 'red'});
    expect(result.every((p) => p.options !== undefined)).toBe(true);
  });
});

