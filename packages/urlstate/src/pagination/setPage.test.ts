import {describe, expect, test} from 'vitest';
import {setPage} from './setPage.js';
import type {SearchState} from '../types/searchState.js';

describe('setPage', () => {
  test('sets page number', () => {
    const state: SearchState = {filters: {}};
    const result = setPage(state, 2);

    expect(result.page).toBe(2);
    expect(result).not.toBe(state);
  });

  test('replaces existing page', () => {
    const state: SearchState = {filters: {}, page: 1};
    const result = setPage(state, 3);

    expect(result.page).toBe(3);
  });

  test('clears page when non-positive', () => {
    const state: SearchState = {filters: {}, page: 2};
    const result = setPage(state, 0);

    expect(result.page).toBeUndefined();
  });

  test('clears page when negative', () => {
    const state: SearchState = {filters: {}, page: 2};
    const result = setPage(state, -1);

    expect(result.page).toBeUndefined();
  });

  test('preserves filters and sort', () => {
    const state: SearchState = {
      filters: {color: ['red']},
      sort: 'price-asc',
    };
    const result = setPage(state, 2);

    expect(result.filters.color).toEqual(['red']);
    expect(result.sort).toBe('price-asc');
    expect(result.page).toBe(2);
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {}, page: 1};
    const original = JSON.parse(JSON.stringify(state));

    setPage(state, 2);

    expect(state).toEqual(original);
  });
});
