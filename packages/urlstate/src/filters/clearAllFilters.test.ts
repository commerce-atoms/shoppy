import {describe, expect, test} from 'vitest';
import {clearAllFilters} from './clearAllFilters.js';
import type {SearchState} from '../types/searchState.js';

describe('clearAllFilters', () => {
  test('removes all filters', () => {
    const state: SearchState = {
      filters: {
        color: ['red'],
        category: 'electronics',
        price: {min: 10, max: 50},
      },
    };
    const result = clearAllFilters(state);

    expect(result.filters).toEqual({});
    expect(result).not.toBe(state);
  });

  test('handles empty filters', () => {
    const state: SearchState = {filters: {}};
    const result = clearAllFilters(state);

    expect(result.filters).toEqual({});
  });

  test('preserves non-filter state', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
      sort: 'price-asc',
      page: 2,
    };
    const result = clearAllFilters(state);

    expect(result.filters).toEqual({});
    expect(result.sort).toBe('price-asc');
    expect(result.page).toBe(2);
  });

  test('does not mutate input state', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
    };
    const original = JSON.parse(JSON.stringify(state));

    clearAllFilters(state);

    expect(state).toEqual(original);
  });
});
