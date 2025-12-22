import {describe, expect, test} from 'vitest';
import {toggleFilter} from './toggleFilter.js';
import type {SearchState} from '../types/searchState.js';

describe('toggleFilter', () => {
  test('adds value to empty filter (creates array)', () => {
    const state: SearchState = {filters: {}};
    const result = toggleFilter(state, 'color', 'red');

    expect(result.filters.color).toEqual(['red']);
    expect(result).not.toBe(state);
  });

  test('adds value to array filter', () => {
    const state: SearchState = {filters: {color: ['red']}};
    const result = toggleFilter(state, 'color', 'blue');

    expect(result.filters.color).toEqual(['red', 'blue']);
  });

  test('removes value from array filter', () => {
    const state: SearchState = {filters: {color: ['red', 'blue']}};
    const result = toggleFilter(state, 'color', 'red');

    expect(result.filters.color).toEqual(['blue']);
  });

  test('removes filter when array becomes empty', () => {
    const state: SearchState = {filters: {color: ['red']}};
    const result = toggleFilter(state, 'color', 'red');

    expect(result.filters.color).toBeUndefined();
    expect(Object.keys(result.filters)).not.toContain('color');
  });

  test('replaces single string value when different', () => {
    const state: SearchState = {filters: {category: 'electronics'}};
    const result = toggleFilter(state, 'category', 'clothing');

    expect(result.filters.category).toBe('clothing');
  });

  test('removes single string value when same', () => {
    const state: SearchState = {filters: {category: 'electronics'}};
    const result = toggleFilter(state, 'category', 'electronics');

    expect(result.filters.category).toBeUndefined();
    expect(Object.keys(result.filters)).not.toContain('category');
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {color: ['red']}};
    const original = JSON.parse(JSON.stringify(state));

    toggleFilter(state, 'color', 'blue');

    expect(state).toEqual(original);
  });

  test('preserves other filters', () => {
    const state: SearchState = {
      filters: {color: ['red'], category: 'electronics'},
    };
    const result = toggleFilter(state, 'color', 'blue');

    expect(result.filters.category).toBe('electronics');
    expect(result.filters.color).toEqual(['red', 'blue']);
  });

  test('preserves non-filter state', () => {
    const state: SearchState = {
      filters: {color: ['red']},
      sort: 'price-asc',
      page: 2,
    };
    const result = toggleFilter(state, 'color', 'blue');

    expect(result.sort).toBe('price-asc');
    expect(result.page).toBe(2);
  });
});
