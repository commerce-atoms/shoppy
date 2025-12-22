import {describe, expect, test} from 'vitest';
import {filterByPriceRange} from './filterByPriceRange.js';
import type {Product} from '../types/product.js';

describe('filterByPriceRange', () => {
  const products: Product[] = [
    {
      priceRange: {minVariantPrice: {amount: '10.00'}},
    },
    {
      priceRange: {minVariantPrice: {amount: '50.00'}},
    },
    {
      priceRange: {minVariantPrice: {amount: '100.00'}},
    },
    {
      selectedOrFirstAvailableVariant: {price: {amount: '25.00'}},
    },
    {},
  ];

  test('returns all products when no range specified', () => {
    const result = filterByPriceRange(products, {});
    expect(result).toHaveLength(5);
  });

  test('filters by min price', () => {
    const result = filterByPriceRange(products, {min: 30});
    expect(result).toHaveLength(2);
  });

  test('filters by max price', () => {
    const result = filterByPriceRange(products, {max: 30});
    expect(result).toHaveLength(2);
  });

  test('filters by min and max price', () => {
    const result = filterByPriceRange(products, {min: 20, max: 60});
    expect(result).toHaveLength(2);
  });

  test('excludes products without price', () => {
    const result = filterByPriceRange(products, {min: 0});
    expect(result).toHaveLength(4);
  });

  test('excludes products with invalid price strings', () => {
    const productsWithInvalid: Product[] = [
      {
        priceRange: {minVariantPrice: {amount: 'invalid'}},
      },
      {
        priceRange: {minVariantPrice: {amount: '50.00'}},
      },
    ];
    const result = filterByPriceRange(productsWithInvalid, {min: 0});
    expect(result).toHaveLength(1);
  });

  test('handles variant price fallback', () => {
    const result = filterByPriceRange(products, {min: 20, max: 30});
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('selectedOrFirstAvailableVariant');
  });
});

