import {describe, expect, test} from 'vitest';
import {parseSearchState} from '../parse/parseSearchState.js';
import {serializeSearchState} from '../serialize/serializeSearchState.js';
import {defineSearchSchema} from '../schema/defineSearchSchema.js';
import type {SearchSchema} from '../types/schema.js';

describe('parse ⇄ serialize round-trip', () => {
  const schema: SearchSchema = defineSearchSchema({
    filters: {
      category: {type: 'single', param: 'cat', default: 'all'},
      color: {type: 'multiple', param: 'color'},
      price: {type: 'range', param: 'price'},
    },
    sort: {param: 'sort', default: 'relevance'},
    pagination: {type: 'page', param: 'page', defaultPage: 1},
  });

  const assertRoundTrip = (
    url: string,
    options: {
      includeDefaults?: boolean;
      excludeDefaults?: boolean;
      sortParams?: boolean;
    } = {},
  ) => {
    const params = new URLSearchParams(url);
    const state = parseSearchState(params, schema, {
      includeDefaults: options.includeDefaults ?? false,
    });
    const serialized = serializeSearchState(state, schema, {
      excludeDefaults: options.excludeDefaults ?? true,
      sortParams: options.sortParams ?? true,
    });

    // Compare semantically (order-independent for params)
    const originalEntries = Array.from(params.entries()).sort();
    const serializedEntries = Array.from(serialized.entries()).sort();

    expect(serializedEntries).toEqual(originalEntries);
  };

  test('round-trip: single filter', () => {
    assertRoundTrip('?cat=electronics');
  });

  test('round-trip: multiple filter', () => {
    assertRoundTrip('?color=red&color=blue');
  });

  test('round-trip: range filter', () => {
    assertRoundTrip('?price=10-50');
  });

  test('round-trip: sort', () => {
    assertRoundTrip('?sort=price-asc');
  });

  test('round-trip: page', () => {
    assertRoundTrip('?page=2');
  });

  test('round-trip: complex state', () => {
    assertRoundTrip(
      '?cat=electronics&color=red&color=blue&price=10-50&sort=price-asc&page=2',
    );
  });

  test('round-trip: empty params', () => {
    assertRoundTrip('', {includeDefaults: false, excludeDefaults: true});
  });

  test('round-trip: with defaults included and excluded', () => {
    const params = new URLSearchParams();
    const state = parseSearchState(params, schema, {includeDefaults: true});
    const serialized = serializeSearchState(state, schema, {
      excludeDefaults: true,
    });

    // Should be empty since defaults are excluded
    expect(Array.from(serialized.keys())).toHaveLength(0);
  });
});

