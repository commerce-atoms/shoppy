import {describe, expect, test} from 'vitest';
import {setRangeFilter} from './setRangeFilter.js';
import type {SearchState} from '../types/searchState.js';

describe('setRangeFilter', () => {
  test('sets range filter with min and max', () => {
    const state: SearchState = {filters: {}};
    const result = setRangeFilter(state, 'price', {min: 10, max: 50});

    expect(result.filters.price).toEqual({min: 10, max: 50});
    expect(result).not.toBe(state);
  });

  test('sets range filter with only min', () => {
    const state: SearchState = {filters: {}};
    const result = setRangeFilter(state, 'price', {min: 10});

    expect(result.filters.price).toEqual({min: 10, max: undefined});
  });

  test('sets range filter with only max', () => {
    const state: SearchState = {filters: {}};
    const result = setRangeFilter(state, 'price', {max: 50});

    expect(result.filters.price).toEqual({min: undefined, max: 50});
  });

  test('clears filter when both min and max are undefined', () => {
    const state: SearchState = {filters: {price: {min: 10, max: 50}}};
    const result = setRangeFilter(state, 'price', {});

    expect(result.filters.price).toBeUndefined();
    expect(Object.keys(result.filters)).not.toContain('price');
  });

  test('replaces existing range filter', () => {
    const state: SearchState = {filters: {price: {min: 10, max: 50}}};
    const result = setRangeFilter(state, 'price', {min: 20, max: 100});

    expect(result.filters.price).toEqual({min: 20, max: 100});
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {price: {min: 10, max: 50}}};
    const original = JSON.parse(JSON.stringify(state));

    setRangeFilter(state, 'price', {min: 20, max: 100});

    expect(state).toEqual(original);
  });

  test('preserves other filters', () => {
    const state: SearchState = {
      filters: {price: {min: 10, max: 50}, color: ['red']},
    };
    const result = setRangeFilter(state, 'price', {min: 20, max: 100});

    expect(result.filters.color).toEqual(['red']);
  });

  test('preserves non-filter state', () => {
    const state: SearchState = {
      filters: {price: {min: 10, max: 50}},
      sort: 'price-asc',
      page: 2,
    };
    const result = setRangeFilter(state, 'price', {min: 20, max: 100});

    expect(result.sort).toBe('price-asc');
    expect(result.page).toBe(2);
  });
});
