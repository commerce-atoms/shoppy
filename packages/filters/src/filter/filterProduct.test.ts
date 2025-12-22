import {describe, expect, test} from 'vitest';
import {filterProduct} from './filterProduct.js';
import type {Product} from '../types/product.js';
import type {FilterCriteria} from '../types/filterCriteria.js';

describe('filterProduct', () => {
  const product: Product = {
    priceRange: {minVariantPrice: {amount: '50.00'}},
    availableForSale: true,
    tags: ['new'],
    options: [{name: 'color', value: 'red'}],
  };

  test('returns true when no criteria', () => {
    const criteria: FilterCriteria = {};
    expect(filterProduct(product, criteria)).toBe(true);
  });

  test('filters by price range', () => {
    expect(
      filterProduct(product, {priceRange: {min: 40, max: 60}}),
    ).toBe(true);
    expect(
      filterProduct(product, {priceRange: {min: 100, max: 200}}),
    ).toBe(false);
  });

  test('filters by availability', () => {
    expect(
      filterProduct(product, {availability: {inStock: true}}),
    ).toBe(true);
    expect(
      filterProduct(product, {availability: {outOfStock: true}}),
    ).toBe(false);
  });

  test('filters by tags', () => {
    expect(filterProduct(product, {tags: ['new']})).toBe(true);
    expect(filterProduct(product, {tags: ['sale']})).toBe(false);
  });

  test('filters by options', () => {
    expect(
      filterProduct(product, {options: {color: 'red'}}),
    ).toBe(true);
    expect(
      filterProduct(product, {options: {color: 'blue'}}),
    ).toBe(false);
  });

  test('applies all filters (AND logic)', () => {
    const criteria: FilterCriteria = {
      priceRange: {min: 40, max: 60},
      availability: {inStock: true},
      tags: ['new'],
    };
    expect(filterProduct(product, criteria)).toBe(true);
  });
});

