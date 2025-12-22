import {describe, expect, test} from 'vitest';
import {setSort} from './setSort.js';
import type {SearchState} from '../types/searchState.js';

describe('setSort', () => {
  test('sets sort value', () => {
    const state: SearchState = {filters: {}};
    const result = setSort(state, 'price-asc');

    expect(result.sort).toBe('price-asc');
    expect(result).not.toBe(state);
  });

  test('replaces existing sort', () => {
    const state: SearchState = {filters: {}, sort: 'relevance'};
    const result = setSort(state, 'price-asc');

    expect(result.sort).toBe('price-asc');
  });

  test('clears sort when undefined', () => {
    const state: SearchState = {filters: {}, sort: 'price-asc'};
    const result = setSort(state, undefined);

    expect(result.sort).toBeUndefined();
  });

  test('preserves filters and pagination', () => {
    const state: SearchState = {
      filters: {color: ['red']},
      page: 2,
    };
    const result = setSort(state, 'price-asc');

    expect(result.filters.color).toEqual(['red']);
    expect(result.page).toBe(2);
    expect(result.sort).toBe('price-asc');
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {}, sort: 'relevance'};
    const original = JSON.parse(JSON.stringify(state));

    setSort(state, 'price-asc');

    expect(state).toEqual(original);
  });
});
