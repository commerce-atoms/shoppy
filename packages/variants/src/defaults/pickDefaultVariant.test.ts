import {describe, expect, test} from 'vitest';
import {pickDefaultVariant} from './pickDefaultVariant.js';
import type {VariantLike} from '../types/variant.js';

const createVariant = (
  id: string,
  availableForSale: boolean,
  price: string,
): VariantLike => ({
  id,
  availableForSale,
  selectedOptions: [],
  price: {amount: price, currencyCode: 'USD'},
});

const createProduct = (variants: VariantLike[]) => ({
  variants: {nodes: variants},
});

describe('pickDefaultVariant', () => {
  test('returns null for empty variants', () => {
    const product = createProduct([]);
    const result = pickDefaultVariant(product, 'first-available');

    expect(result).toBeNull();
  });

  describe('first-available policy', () => {
    test('returns first available variant', () => {
      const product = createProduct([
        createVariant('1', false, '10.00'),
        createVariant('2', true, '20.00'),
        createVariant('3', true, '30.00'),
      ]);
      const result = pickDefaultVariant(product, 'first-available');

      expect(result?.id).toBe('2');
    });

    test('returns null when no variants are available', () => {
      const product = createProduct([
        createVariant('1', false, '10.00'),
        createVariant('2', false, '20.00'),
      ]);
      const result = pickDefaultVariant(product, 'first-available');

      expect(result).toBeNull();
    });
  });

  describe('cheapest-available policy', () => {
    test('returns cheapest available variant', () => {
      const product = createProduct([
        createVariant('1', true, '30.00'),
        createVariant('2', true, '10.00'),
        createVariant('3', true, '20.00'),
      ]);
      const result = pickDefaultVariant(product, 'cheapest-available');

      expect(result?.id).toBe('2');
    });

    test('ignores unavailable variants', () => {
      const product = createProduct([
        createVariant('1', false, '5.00'),
        createVariant('2', true, '20.00'),
        createVariant('3', true, '10.00'),
      ]);
      const result = pickDefaultVariant(product, 'cheapest-available');

      expect(result?.id).toBe('3');
    });

    test('returns null when no variants are available', () => {
      const product = createProduct([
        createVariant('1', false, '10.00'),
        createVariant('2', false, '20.00'),
      ]);
      const result = pickDefaultVariant(product, 'cheapest-available');

      expect(result).toBeNull();
    });
  });

  describe('first policy', () => {
    test('returns first variant regardless of availability', () => {
      const product = createProduct([
        createVariant('1', false, '10.00'),
        createVariant('2', true, '20.00'),
      ]);
      const result = pickDefaultVariant(product, 'first');

      expect(result?.id).toBe('1');
    });
  });

  describe('cheapest policy', () => {
    test('returns cheapest variant regardless of availability', () => {
      const product = createProduct([
        createVariant('1', false, '30.00'),
        createVariant('2', true, '10.00'),
        createVariant('3', false, '5.00'),
      ]);
      const result = pickDefaultVariant(product, 'cheapest');

      expect(result?.id).toBe('3');
    });
  });

  test('defaults to first-available policy', () => {
    const product = createProduct([
      createVariant('1', false, '10.00'),
      createVariant('2', true, '20.00'),
    ]);
    const result = pickDefaultVariant(product);

    expect(result?.id).toBe('2');
  });

  test('handles single variant', () => {
    const product = createProduct([createVariant('1', true, '10.00')]);
    const result = pickDefaultVariant(product, 'first-available');

    expect(result?.id).toBe('1');
  });

  test('handles decimal prices correctly', () => {
    const product = createProduct([
      createVariant('1', true, '10.50'),
      createVariant('2', true, '10.25'),
      createVariant('3', true, '10.75'),
    ]);
    const result = pickDefaultVariant(product, 'cheapest-available');

    expect(result?.id).toBe('2');
  });
});

