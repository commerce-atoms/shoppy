import {describe, expect, test} from 'vitest';
import {clearFilter} from './clearFilter.js';
import type {SearchState} from '../types/searchState.js';

describe('clearFilter', () => {
  test('removes filter from state', () => {
    const state: SearchState = {filters: {color: ['red', 'blue']}};
    const result = clearFilter(state, 'color');

    expect(result.filters.color).toBeUndefined();
    expect(Object.keys(result.filters)).not.toContain('color');
    expect(result).not.toBe(state);
  });

  test('handles non-existent filter gracefully', () => {
    const state: SearchState = {filters: {}};
    const result = clearFilter(state, 'color');

    expect(result.filters).toEqual({});
  });

  test('preserves other filters', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
    };
    const result = clearFilter(state, 'color');

    expect(result.filters.category).toBe('electronics');
    expect(result.filters.color).toBeUndefined();
  });

  test('preserves non-filter state', () => {
    const state: SearchState = {
      filters: {color: ['red']},
      sort: 'price-asc',
      page: 2,
    };
    const result = clearFilter(state, 'color');

    expect(result.sort).toBe('price-asc');
    expect(result.page).toBe(2);
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {color: ['red', 'blue']}};
    const original = JSON.parse(JSON.stringify(state));

    clearFilter(state, 'color');

    expect(state).toEqual(original);
  });
});
