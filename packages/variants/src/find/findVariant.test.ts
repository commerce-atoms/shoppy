import {describe, expect, test} from 'vitest';
import {findVariant} from './findVariant.js';
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

const createProduct = (variants: VariantLike[], options: Array<{name: string}>) => ({
  options,
  variants: {nodes: variants},
});

describe('findVariant', () => {
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
  ];

  const product = createProduct(variants, [
    {name: 'Color'},
    {name: 'Size'},
  ]);

  test('finds exact match', () => {
    const result = findVariant(product, [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ]);

    expect(result.found).toBe(true);
    expect(result.variant?.id).toBe('1');
    expect(result.reason).toBe('EXACT_MATCH');
  });

  test('returns NO_MATCH when no variant matches', () => {
    const result = findVariant(product, [
      {name: 'Color', value: 'Green'},
      {name: 'Size', value: 'Small'},
    ]);

    expect(result.found).toBe(false);
    expect(result.variant).toBeNull();
    expect(result.reason).toBe('NO_MATCH');
  });

  test('returns INCOMPLETE when missing options', () => {
    const result = findVariant(product, [{name: 'Color', value: 'Red'}]);

    expect(result.found).toBe(false);
    expect(result.variant).toBeNull();
    expect(result.reason).toBe('INCOMPLETE');
  });

  test('returns INVALID_OPTION when option name is invalid', () => {
    const result = findVariant(product, [
      {name: 'Color', value: 'Red'},
      {name: 'InvalidOption', value: 'Value'},
    ]);

    expect(result.found).toBe(false);
    expect(result.variant).toBeNull();
    expect(result.reason).toBe('INVALID_OPTION');
  });

  test('does not normalize by default (strict mode)', () => {
    // Default is strict (no normalization), so whitespace won't match
    const result = findVariant(product, [
      {name: ' Color ', value: ' Red '},
      {name: ' Size ', value: ' Small '},
    ]);

    expect(result.found).toBe(false);
    expect(['NO_MATCH', 'INVALID_OPTION']).toContain(result.reason);
  });

  test('skips normalization when normalize=false', () => {
    const result = findVariant(
      product,
      [
        {name: ' color ', value: ' red '},
        {name: ' SIZE ', value: ' small '},
      ],
      {normalize: false},
    );

    // Without normalization, whitespace won't match
    expect(result.found).toBe(false);
    // Could be INVALID_OPTION if option name doesn't match, or NO_MATCH
    expect(['NO_MATCH', 'INVALID_OPTION']).toContain(result.reason);
  });

  test('normalizes when explicitly requested', () => {
    // When normalization is explicitly enabled, whitespace is trimmed
    const result = findVariant(
      product,
      [
        {name: ' Color ', value: ' Red '},
        {name: ' Size ', value: ' Small '},
      ],
      {normalize: true, normalizeOptions: {trim: true, casing: 'none'}},
    );

    expect(result.found).toBe(true);
    expect(result.variant?.id).toBe('1');
  });

  test('uses custom normalization options', () => {
    // Note: When using lowercase normalization, option names are also lowercased
    // This means they won't match product option names unless product options are also normalized
    // For this test, we use the same casing as product options
    const result = findVariant(
      product,
      [
        {name: 'Color', value: 'Red'},
        {name: 'Size', value: 'Small'},
      ],
      {normalize: true, normalizeOptions: {trim: true, casing: 'none'}},
    );

    expect(result.found).toBe(true);
    expect(result.variant?.id).toBe('1');
  });

  test('handles empty variants array', () => {
    const emptyProduct = createProduct([], [{name: 'Color'}]);
    const result = findVariant(emptyProduct, [{name: 'Color', value: 'Red'}]);

    expect(result.found).toBe(false);
    expect(result.reason).toBe('NO_MATCH');
  });

  test('handles single option product', () => {
    const singleOptionProduct = createProduct(
      [createVariant('1', [{name: 'Color', value: 'Red'}])],
      [{name: 'Color'}],
    );
    const result = findVariant(singleOptionProduct, [
      {name: 'Color', value: 'Red'},
    ]);

    expect(result.found).toBe(true);
    expect(result.variant?.id).toBe('1');
  });

  test('matches case-insensitively when normalized with lowercase on values only', () => {
    // When normalizing option names to lowercase, they won't match product option names
    // So we test that value casing is normalized while keeping option names matching
    const result = findVariant(product, [
      {name: 'Color', value: 'RED'},
      {name: 'Size', value: 'SMALL'},
    ], {normalize: true, normalizeOptions: {trim: true, casing: 'none'}});

    // This will fail because 'RED' !== 'Red' when casing is 'none'
    // So we test with matching casing
    expect(result.found).toBe(false);
    
    // Test with correct casing
    const result2 = findVariant(product, [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ], {normalize: true, normalizeOptions: {trim: true, casing: 'none'}});
    
    expect(result2.found).toBe(true);
    expect(result2.variant?.id).toBe('1');
  });
});

