import {describe, expect, test} from 'vitest';
import {patchSearchParams} from './patchSearchParams.js';
import {defineSearchSchema} from '../schema/defineSearchSchema.js';
import type {SearchState} from '../types/searchState.js';
import type {SearchSchema} from '../types/schema.js';

describe('patchSearchParams', () => {
  const schema: SearchSchema = defineSearchSchema({
    filters: {
      category: {type: 'single', param: 'cat'},
      color: {type: 'multiple', param: 'color'},
    },
    sort: {param: 'sort'},
    pagination: {type: 'page', param: 'page'},
  });

  test('replaces params with new state', () => {
    const current = new URLSearchParams('?cat=electronics&sort=relevance');
    const nextState: SearchState = {
      filters: {category: 'clothing'},
      sort: 'price-asc',
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.get('cat')).toBe('clothing');
    expect(result.get('sort')).toBe('price-asc');
    expect(result.get('color')).toBeNull();
  });

  test('preserves unknown params when preserveUnknownParams=true', () => {
    const current = new URLSearchParams(
      '?cat=electronics&custom=value&other=123',
    );
    const nextState: SearchState = {
      filters: {category: 'clothing'},
    };
    const result = patchSearchParams(current, nextState, schema, {
      preserveUnknownParams: true,
    });

    expect(result.get('cat')).toBe('clothing');
    expect(result.get('custom')).toBe('value');
    expect(result.get('other')).toBe('123');
  });

  test('removes unknown params when preserveUnknownParams=false', () => {
    const current = new URLSearchParams('?cat=electronics&custom=value');
    const nextState: SearchState = {
      filters: {category: 'clothing'},
    };
    const result = patchSearchParams(current, nextState, schema, {
      preserveUnknownParams: false,
    });

    expect(result.get('cat')).toBe('clothing');
    expect(result.get('custom')).toBeNull();
  });

  test('handles empty current params', () => {
    const current = new URLSearchParams();
    const nextState: SearchState = {
      filters: {category: 'electronics'},
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.get('cat')).toBe('electronics');
  });

  test('handles empty next state', () => {
    const current = new URLSearchParams('?cat=electronics');
    const nextState: SearchState = {filters: {}};
    const result = patchSearchParams(current, nextState, schema);

    expect(result.get('cat')).toBeNull();
  });

  test('respects excludeDefaults option', () => {
    const schemaWithDefaults = defineSearchSchema({
      filters: {
        category: {type: 'single', param: 'cat', default: 'all'},
      },
    });
    const current = new URLSearchParams();
    const nextState: SearchState = {
      filters: {category: 'all'},
    };
    const result = patchSearchParams(current, nextState, schemaWithDefaults, {
      excludeDefaults: true,
    });

    expect(result.get('cat')).toBeNull();
  });

  test('does not mutate input params', () => {
    const current = new URLSearchParams('?cat=electronics');
    const original = current.toString();
    const nextState: SearchState = {
      filters: {category: 'clothing'},
    };

    patchSearchParams(current, nextState, schema);

    expect(current.toString()).toBe(original);
  });

  test('removes single filter when set to undefined', () => {
    const current = new URLSearchParams('?cat=electronics');
    const nextState: SearchState = {
      filters: {category: undefined},
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.get('cat')).toBeNull();
  });

  test('removes single filter when set to empty string', () => {
    const current = new URLSearchParams('?cat=electronics');
    const nextState: SearchState = {
      filters: {category: ''},
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.get('cat')).toBeNull();
  });

  test('removes multiple filter when set to empty array', () => {
    const current = new URLSearchParams('?color=red&color=blue');
    const nextState: SearchState = {
      filters: {color: []},
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.getAll('color')).toEqual([]);
  });

  test('removes multiple filter when set to undefined', () => {
    const current = new URLSearchParams('?color=red&color=blue');
    const nextState: SearchState = {
      filters: {color: undefined},
    };
    const result = patchSearchParams(current, nextState, schema);

    expect(result.getAll('color')).toEqual([]);
  });

  test('removes range filter when both min and max are undefined', () => {
    const schemaWithRange = defineSearchSchema({
      filters: {
        price: {type: 'range', param: 'price'},
      },
    });
    const current = new URLSearchParams('?price=10-50');
    const nextState: SearchState = {
      filters: {price: {min: undefined, max: undefined}},
    };
    const result = patchSearchParams(current, nextState, schemaWithRange);

    expect(result.get('price')).toBeNull();
  });

  test('removes range filter when set to undefined', () => {
    const schemaWithRange = defineSearchSchema({
      filters: {
        price: {type: 'range', param: 'price'},
      },
    });
    const current = new URLSearchParams('?price=10-50');
    const nextState: SearchState = {
      filters: {price: undefined},
    };
    const result = patchSearchParams(current, nextState, schemaWithRange);

    expect(result.get('price')).toBeNull();
  });

  test('sorts params deterministically when sortParams=true', () => {
    const current = new URLSearchParams();
    const nextState: SearchState = {
      filters: {
        zeta: 'z',
        alpha: 'a',
        beta: 'b',
      },
    };
    const schemaMulti = defineSearchSchema({
      filters: {
        zeta: {type: 'single', param: 'z'},
        alpha: {type: 'single', param: 'a'},
        beta: {type: 'single', param: 'b'},
      },
    });
    const result = patchSearchParams(current, nextState, schemaMulti, {
      sortParams: true,
    });

    const keys = Array.from(result.keys());
    expect(keys).toEqual(['a', 'b', 'z']);
  });

  test('sorts multi-value params deterministically when sortParams=true', () => {
    const current = new URLSearchParams();
    const nextState: SearchState = {
      filters: {
        color: ['zebra', 'alpha', 'beta'],
      },
    };
    const result = patchSearchParams(current, nextState, schema, {
      sortParams: true,
    });

    // Keys are sorted, and multi-value params maintain their order within the param
    const keys = Array.from(result.keys());
    expect(keys).toEqual(['color', 'color', 'color']);
    const values = result.getAll('color');
    // Values maintain the order they were added (from the array)
    expect(values).toEqual(['zebra', 'alpha', 'beta']);
  });
});
