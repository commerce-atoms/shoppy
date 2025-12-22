import {describe, expect, test} from 'vitest';
import {serializeSearchState} from './serializeSearchState.js';
import {defineSearchSchema} from '../schema/defineSearchSchema.js';
import type {SearchState} from '../types/searchState.js';
import type {SearchSchema} from '../types/schema.js';

describe('serializeSearchState', () => {
  const baseSchema: SearchSchema = defineSearchSchema({
    filters: {
      category: {type: 'single', param: 'cat'},
      color: {type: 'multiple', param: 'color'},
      price: {type: 'range', param: 'price'},
    },
    sort: {param: 'sort'},
    pagination: {type: 'page', param: 'page'},
  });

  test('serializes single filter', () => {
    const state: SearchState = {
      filters: {category: 'electronics'},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('cat')).toBe('electronics');
  });

  test('serializes multiple filter', () => {
    const state: SearchState = {
      filters: {color: ['red', 'blue']},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.getAll('color')).toEqual(['red', 'blue']);
  });

  test('serializes range filter', () => {
    const state: SearchState = {
      filters: {price: {min: 10, max: 50}},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('price')).toBe('10-50');
  });

  test('serializes range filter with only min', () => {
    const state: SearchState = {
      filters: {price: {min: 10}},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('price')).toBe('10-');
  });

  test('serializes range filter with only max', () => {
    const state: SearchState = {
      filters: {price: {max: 50}},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('price')).toBe('-50');
  });

  test('serializes sort', () => {
    const state: SearchState = {
      filters: {},
      sort: 'price-asc',
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('sort')).toBe('price-asc');
  });

  test('serializes page pagination', () => {
    const state: SearchState = {
      filters: {},
      page: 2,
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('page')).toBe('2');
  });

  test('serializes cursor pagination', () => {
    const schema = defineSearchSchema({
      filters: {},
      pagination: {type: 'cursor', param: 'cursor'},
    });
    const state: SearchState = {
      filters: {},
      cursor: 'abc123',
    };
    const params = serializeSearchState(state, schema);

    expect(params.get('cursor')).toBe('abc123');
  });

  test('excludes defaults when excludeDefaults=true', () => {
    const schema = defineSearchSchema({
      filters: {
        category: {type: 'single', param: 'cat', default: 'all'},
      },
      sort: {param: 'sort', default: 'relevance'},
      pagination: {type: 'page', param: 'page', defaultPage: 1},
    });
    const state: SearchState = {
      filters: {category: 'all'},
      sort: 'relevance',
      page: 1,
    };
    const params = serializeSearchState(state, schema, {excludeDefaults: true});

    expect(params.get('cat')).toBeNull();
    expect(params.get('sort')).toBeNull();
    expect(params.get('page')).toBeNull();
  });

  test('includes defaults when excludeDefaults=false', () => {
    const schema = defineSearchSchema({
      filters: {
        category: {type: 'single', param: 'cat', default: 'all'},
      },
      sort: {param: 'sort', default: 'relevance'},
      pagination: {type: 'page', param: 'page', defaultPage: 1},
    });
    const state: SearchState = {
      filters: {category: 'all'},
      sort: 'relevance',
      page: 1,
    };
    const params = serializeSearchState(state, schema, {excludeDefaults: false});

    expect(params.get('cat')).toBe('all');
    expect(params.get('sort')).toBe('relevance');
    expect(params.get('page')).toBe('1');
  });

  test('sorts params alphabetically when sortParams=true', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
      sort: 'price',
    };
    const params = serializeSearchState(state, baseSchema, {sortParams: true});

    const keys = Array.from(params.keys());
    expect(keys).toEqual(['cat', 'color', 'sort']);
  });

  test('preserves param order when sortParams=false', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
      sort: 'price',
    };
    const params = serializeSearchState(state, baseSchema, {sortParams: false});

    // Order is not guaranteed, but should not be alphabetical
    const keys = Array.from(params.keys());
    expect(keys.length).toBe(3);
    expect(keys).toContain('cat');
    expect(keys).toContain('color');
    expect(keys).toContain('sort');
  });

  test('skips undefined filters', () => {
    const state: SearchState = {
      filters: {category: 'electronics'},
    };
    const params = serializeSearchState(state, baseSchema);

    expect(params.get('cat')).toBe('electronics');
    expect(params.get('color')).toBeNull();
  });

  test('does not mutate input state', () => {
    const state: SearchState = {
      filters: {category: 'electronics'},
    };
    const original = JSON.parse(JSON.stringify(state));

    serializeSearchState(state, baseSchema);

    expect(state).toEqual(original);
  });

  test('handles empty state', () => {
    const state: SearchState = {filters: {}};
    const params = serializeSearchState(state, baseSchema);

    expect(Array.from(params.keys())).toHaveLength(0);
  });
});

