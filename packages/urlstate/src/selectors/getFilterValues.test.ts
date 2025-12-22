import {describe, expect, test} from 'vitest';
import {getFilterValues} from './getFilterValues.js';
import type {SearchState} from '../types/searchState.js';

describe('getFilterValues', () => {
  test('extracts array filter values', () => {
    const state: SearchState = {
      filters: {availability: ['in-stock', 'out-of-stock']},
    };
    const result = getFilterValues(state, 'availability');

    expect(result).toEqual(['in-stock', 'out-of-stock']);
  });

  test('extracts single string filter as array', () => {
    const state: SearchState = {
      filters: {category: 'electronics'},
    };
    const result = getFilterValues(state, 'category');

    expect(result).toEqual(['electronics']);
  });

  test('returns empty array for missing filter', () => {
    const state: SearchState = {
      filters: {},
    };
    const result = getFilterValues(state, 'availability');

    expect(result).toEqual([]);
  });

  test('returns empty array for undefined filter', () => {
    const state: SearchState = {
      filters: {availability: undefined},
    };
    const result = getFilterValues(state, 'availability');

    expect(result).toEqual([]);
  });

  test('returns empty array for range filter', () => {
    const state: SearchState = {
      filters: {price: {min: 10, max: 50}},
    };
    const result = getFilterValues(state, 'price');

    expect(result).toEqual([]);
  });

  test('returns empty array for null filter', () => {
    const state: SearchState = {
      filters: {availability: null as unknown as undefined},
    };
    const result = getFilterValues(state, 'availability');

    expect(result).toEqual([]);
  });

  test('works with different filter keys', () => {
    const state: SearchState = {
      filters: {
        availability: ['in-stock'],
        category: 'electronics',
        color: ['red', 'blue'],
      },
    };
    const availabilityResult = getFilterValues(state, 'availability');
    const categoryResult = getFilterValues(state, 'category');
    const colorResult = getFilterValues(state, 'color');

    expect(availabilityResult).toEqual(['in-stock']);
    expect(categoryResult).toEqual(['electronics']);
    expect(colorResult).toEqual(['red', 'blue']);
  });

  test('handles empty array filter', () => {
    const state: SearchState = {
      filters: {availability: []},
    };
    const result = getFilterValues(state, 'availability');

    expect(result).toEqual([]);
  });
});

