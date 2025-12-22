import {describe, expect, test} from 'vitest';
import {setCursor} from './setCursor.js';
import type {SearchState} from '../types/searchState.js';

describe('setCursor', () => {
  test('sets cursor value', () => {
    const state: SearchState = {filters: {}};
    const result = setCursor(state, 'abc123');

    expect(result.cursor).toBe('abc123');
    expect(result).not.toBe(state);
  });

  test('replaces existing cursor', () => {
    const state: SearchState = {filters: {}, cursor: 'old-cursor'};
    const result = setCursor(state, 'new-cursor');

    expect(result.cursor).toBe('new-cursor');
  });

  test('clears cursor when undefined', () => {
    const state: SearchState = {filters: {}, cursor: 'abc123'};
    const result = setCursor(state, undefined);

    expect(result.cursor).toBeUndefined();
  });

  test('preserves filters and sort', () => {
    const state: SearchState = {
      filters: {color: ['red']},
      sort: 'price-asc',
    };
    const result = setCursor(state, 'abc123');

    expect(result.filters.color).toEqual(['red']);
    expect(result.sort).toBe('price-asc');
    expect(result.cursor).toBe('abc123');
  });

  test('does not mutate input state', () => {
    const state: SearchState = {filters: {}, cursor: 'old-cursor'};
    const original = JSON.parse(JSON.stringify(state));

    setCursor(state, 'new-cursor');

    expect(state).toEqual(original);
  });
});
