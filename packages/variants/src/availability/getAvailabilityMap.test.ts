import {describe, expect, test} from 'vitest';
import {getAvailabilityMap} from './getAvailabilityMap.js';
import type {VariantLike} from '../types/variant.js';
import type {SelectedOption} from '../types/selectedOption.js';

const createVariant = (
  id: string,
  selectedOptions: SelectedOption[],
  availableForSale = true,
): VariantLike => ({
  id,
  availableForSale,
  selectedOptions,
  price: {amount: '10.00', currencyCode: 'USD'},
});

const createProduct = (variants: VariantLike[]) => ({
  variants: {nodes: variants},
});

describe('getAvailabilityMap', () => {
  const variants = [
    createVariant('1', [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ]),
    createVariant('2', [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]),
    createVariant('3', [
      {name: 'Color', value: 'Blue'},
      {name: 'Size', value: 'Small'},
    ]),
    createVariant('4', [
      {name: 'Color', value: 'Blue'},
      {name: 'Size', value: 'Large'},
    ]),
  ];

  test('returns all available options with no selection', () => {
    const product = createProduct(variants);
    const map = getAvailabilityMap(product, []);

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Color')?.has('Blue')).toBe(true);
    expect(map.get('Size')?.has('Small')).toBe(true);
    expect(map.get('Size')?.has('Large')).toBe(true);
  });

  test('filters options based on partial selection', () => {
    const product = createProduct(variants);
    const map = getAvailabilityMap(product, [{name: 'Color', value: 'Red'}]);

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Color')?.has('Blue')).toBe(false);
    expect(map.get('Size')?.has('Small')).toBe(true);
    expect(map.get('Size')?.has('Large')).toBe(true);
  });

  test('filters out unavailable options with complete selection', () => {
    const product = createProduct(variants);
    const map = getAvailabilityMap(product, [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ]);

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Color')?.has('Blue')).toBe(false);
    expect(map.get('Size')?.has('Small')).toBe(true);
    expect(map.get('Size')?.has('Large')).toBe(false);
  });

  test('excludes unavailable variants by default', () => {
    const product = createProduct([
      ...variants,
      createVariant(
        '5',
        [
          {name: 'Color', value: 'Green'},
          {name: 'Size', value: 'Small'},
        ],
        false,
      ),
    ]);
    const map = getAvailabilityMap(product, []);

    expect(map.get('Color')?.has('Green')).toBe(false);
    expect(map.get('Color')?.has('Red')).toBe(true);
  });

  test('includes unavailable variants when onlyAvailable=false', () => {
    const product = createProduct([
      ...variants,
      createVariant(
        '5',
        [
          {name: 'Color', value: 'Green'},
          {name: 'Size', value: 'Small'},
        ],
        false,
      ),
    ]);
    const map = getAvailabilityMap(product, [], {onlyAvailable: false});

    expect(map.get('Color')?.has('Green')).toBe(true);
  });

  test('does not normalize by default (strict mode)', () => {
    const product = createProduct(variants);
    // Default is strict (no normalization), so whitespace won't match
    const map = getAvailabilityMap(product, [
      {name: ' Color ', value: ' Red '},
    ]);

    // Without normalization, whitespace won't match, so no variants match the selection
    expect(map.size).toBe(0);
  });

  test('skips normalization when normalize=false', () => {
    const product = createProduct(variants);
    const map = getAvailabilityMap(
      product,
      [{name: ' color ', value: ' red '}],
      {normalize: false},
    );

    // Without normalization, whitespace won't match, so no variants match the selection
    // This results in an empty map since no variants pass the filter
    expect(map.size).toBe(0);
  });

  test('normalizes when explicitly requested', () => {
    const product = createProduct(variants);
    // When normalization is explicitly enabled, whitespace is trimmed
    const map = getAvailabilityMap(
      product,
      [{name: ' Color ', value: ' Red '}],
      {normalize: true, normalizeOptions: {trim: true, casing: 'none'}},
    );

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Size')?.has('Small')).toBe(true);
  });

  test('uses custom normalization options', () => {
    const product = createProduct(variants);
    // When using lowercase normalization, option names are also lowercased
    // So the map keys will be lowercase
    const map = getAvailabilityMap(product, [{name: 'Color', value: 'Red'}], {
      normalize: true,
      normalizeOptions: {trim: true, casing: 'none'},
    });

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Size')?.has('Small')).toBe(true);
  });

  test('handles empty variants', () => {
    const product = createProduct([]);
    const map = getAvailabilityMap(product, []);

    expect(map.size).toBe(0);
  });

  test('handles single option variants', () => {
    const singleOptionProduct = createProduct([
      createVariant('1', [{name: 'Color', value: 'Red'}]),
      createVariant('2', [{name: 'Color', value: 'Blue'}]),
    ]);
    const map = getAvailabilityMap(singleOptionProduct, []);

    expect(map.get('Color')?.has('Red')).toBe(true);
    expect(map.get('Color')?.has('Blue')).toBe(true);
  });
});
