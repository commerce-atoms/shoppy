import {describe, expect, test} from 'vitest';
import {filterByTags} from './filterByTags.js';
import type {Product} from '../types/product.js';

describe('filterByTags', () => {
  const products: Product[] = [
    {tags: ['new', 'featured']},
    {tags: ['sale', 'clearance']},
    {tags: ['new']},
    {tags: []},
    {},
  ];

  test('returns all products when no tags specified', () => {
    const result = filterByTags(products, []);
    expect(result).toHaveLength(5);
  });

  test('filters by single tag', () => {
    const result = filterByTags(products, ['new']);
    expect(result).toHaveLength(2);
  });

  test('filters by multiple tags (OR logic)', () => {
    const result = filterByTags(products, ['new', 'sale']);
    expect(result).toHaveLength(3);
  });

  test('handles products without tags', () => {
    const result = filterByTags(products, ['new']);
    expect(result.every((p) => p.tags?.includes('new'))).toBe(true);
  });

  test('returns empty array when no matches', () => {
    const result = filterByTags(products, ['nonexistent']);
    expect(result).toHaveLength(0);
  });
});

