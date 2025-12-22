import {describe, expect, test} from 'vitest';
import {isSelectionValid} from './isSelectionValid.js';
import type {VariantLike} from '../types/variant.js';
import type {SelectedOption} from '../types/selectedOption.js';

const createVariant = (
  id: string,
  selectedOptions: SelectedOption[],
): VariantLike => ({
  id,
  availableForSale: true,
  selectedOptions,
  price: {amount: '10.00', currencyCode: 'USD'},
});

const createProduct = (variants: VariantLike[], options: Array<{name: string}>) => ({
  options,
  variants: {nodes: variants},
});

describe('isSelectionValid', () => {
  const variants = [
    createVariant('1', [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ]),
    createVariant('2', [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]),
  ];

  const product = createProduct(variants, [
    {name: 'Color'},
    {name: 'Size'},
  ]);

  test('returns true for valid complete selection', () => {
    const isValid = isSelectionValid(product, [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Small'},
    ]);

    expect(isValid).toBe(true);
  });

  test('returns false for invalid selection', () => {
    const isValid = isSelectionValid(product, [
      {name: 'Color', value: 'Green'},
      {name: 'Size', value: 'Small'},
    ]);

    expect(isValid).toBe(false);
  });

  test('returns false for incomplete selection', () => {
    const isValid = isSelectionValid(product, [
      {name: 'Color', value: 'Red'},
    ]);

    expect(isValid).toBe(false);
  });

  test('returns false for invalid option name', () => {
    const isValid = isSelectionValid(product, [
      {name: 'Color', value: 'Red'},
      {name: 'InvalidOption', value: 'Value'},
    ]);

    expect(isValid).toBe(false);
  });

  test('handles empty selection', () => {
    const isValid = isSelectionValid(product, []);

    expect(isValid).toBe(false);
  });

  test('handles empty variants', () => {
    const emptyProduct = createProduct([], [{name: 'Color'}]);
    const isValid = isSelectionValid(emptyProduct, [
      {name: 'Color', value: 'Red'},
    ]);

    expect(isValid).toBe(false);
  });

  test('handles single option product', () => {
    const singleOptionProduct = createProduct(
      [createVariant('1', [{name: 'Color', value: 'Red'}])],
      [{name: 'Color'}],
    );
    const isValid = isSelectionValid(singleOptionProduct, [
      {name: 'Color', value: 'Red'},
    ]);

    expect(isValid).toBe(true);
  });
});

