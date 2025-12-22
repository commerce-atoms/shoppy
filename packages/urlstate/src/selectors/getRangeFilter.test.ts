import {describe, expect, test} from 'vitest';
import {getRangeFilter} from './getRangeFilter.js';
import type {SearchState} from '../types/searchState.js';

describe('getRangeFilter', () => {
  test('extracts range filter with min and max', () => {
    const state: SearchState = {
      filters: {price: {min: 10, max: 50}},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: 10, max: 50});
  });

  test('extracts range filter with only min', () => {
    const state: SearchState = {
      filters: {price: {min: 10}},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: 10, max: undefined});
  });

  test('extracts range filter with only max', () => {
    const state: SearchState = {
      filters: {price: {max: 50}},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: undefined, max: 50});
  });

  test('returns undefined for missing filter', () => {
    const state: SearchState = {
      filters: {},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: undefined, max: undefined});
  });

  test('returns undefined for non-range filter (string)', () => {
    const state: SearchState = {
      filters: {price: '10-50'},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: undefined, max: undefined});
  });

  test('returns undefined for non-range filter (array)', () => {
    const state: SearchState = {
      filters: {price: ['10', '50']},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: undefined, max: undefined});
  });

  test('returns undefined for null filter', () => {
    const state: SearchState = {
      filters: {price: null as unknown as undefined},
    };
    const result = getRangeFilter(state, 'price');

    expect(result).toEqual({min: undefined, max: undefined});
  });

  test('works with different filter keys', () => {
    const state: SearchState = {
      filters: {
        price: {min: 10, max: 50},
        weight: {min: 1, max: 5},
      },
    };
    const priceResult = getRangeFilter(state, 'price');
    const weightResult = getRangeFilter(state, 'weight');

    expect(priceResult).toEqual({min: 10, max: 50});
    expect(weightResult).toEqual({min: 1, max: 5});
  });
});

