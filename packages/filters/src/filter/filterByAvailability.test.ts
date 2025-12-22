import {describe, expect, test} from 'vitest';
import {filterByAvailability} from './filterByAvailability.js';
import type {Product} from '../types/product.js';

describe('filterByAvailability', () => {
  const products: Product[] = [
    {availableForSale: true},
    {availableForSale: false},
    {
      variants: {
        nodes: [{availableForSale: true}],
      },
    },
    {
      variants: {
        nodes: [{availableForSale: false}],
      },
    },
  ];

  test('returns all products when no criteria specified', () => {
    const result = filterByAvailability(products, {});
    expect(result).toHaveLength(4);
  });

  test('returns all products when both inStock and outOfStock are true', () => {
    const result = filterByAvailability(products, {
      inStock: true,
      outOfStock: true,
    });
    expect(result).toHaveLength(4);
  });

  test('filters for in stock only', () => {
    const result = filterByAvailability(products, {inStock: true});
    expect(result).toHaveLength(2);
  });

  test('filters for out of stock only', () => {
    const result = filterByAvailability(products, {outOfStock: true});
    expect(result).toHaveLength(2);
  });

  test('checks variants for availability', () => {
    const result = filterByAvailability(products, {inStock: true});
    const hasVariantProduct = result.some(
      (p) => p.variants?.nodes !== undefined,
    );
    expect(hasVariantProduct).toBe(true);
  });
});

