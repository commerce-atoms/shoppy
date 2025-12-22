import {describe, expect, test} from 'vitest';
import {defineSearchSchema} from './defineSearchSchema.js';
import type {SearchSchema} from '../types/schema.js';

describe('defineSearchSchema', () => {
  test('returns schema as-is (identity function)', () => {
    const schema: SearchSchema = {
      filters: {
        category: {type: 'single', param: 'category'},
      },
    };

    const result = defineSearchSchema(schema);

    expect(result).toBe(schema);
    expect(result).toEqual(schema);
  });

  test('preserves complete schema structure', () => {
    const schema: SearchSchema = {
      filters: {
        category: {type: 'single', param: 'cat', default: 'all'},
        color: {type: 'multiple', param: 'color'},
        price: {type: 'range', param: 'price'},
      },
      sort: {param: 'sort', default: 'relevance', validValues: ['relevance', 'price']},
      pagination: {type: 'page', param: 'page', defaultPage: 1},
    };

    const result = defineSearchSchema(schema);

    expect(result).toEqual(schema);
    expect(result.filters.category.default).toBe('all');
    expect(result.sort?.validValues).toEqual(['relevance', 'price']);
    expect(result.pagination?.defaultPage).toBe(1);
  });
});

