import {describe, expect, test} from 'vitest';
import {selectedOptionsToUrlParams} from './selectedOptionsToUrlParams.js';
import type {SelectedOption} from '../types/selectedOption.js';

describe('selectedOptionsToUrlParams', () => {
  test('converts options to URLSearchParams', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ];
    const params = selectedOptionsToUrlParams(options);

    expect(params.get('Color')).toBe('Red');
    expect(params.get('Size')).toBe('Large');
  });

  test('orders by optionKeys when provided', () => {
    const options: SelectedOption[] = [
      {name: 'Size', value: 'Large'},
      {name: 'Color', value: 'Red'},
    ];
    const params = selectedOptionsToUrlParams(options, ['Color', 'Size']);

    // URLSearchParams maintains insertion order
    const keys = Array.from(params.keys());
    expect(keys).toEqual(['Color', 'Size']);
  });

  test('filters by optionKeys when provided', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
      {name: 'Other', value: 'Value'},
    ];
    const params = selectedOptionsToUrlParams(options, ['Color', 'Size']);

    expect(params.get('Color')).toBe('Red');
    expect(params.get('Size')).toBe('Large');
    expect(params.get('Other')).toBeNull();
  });

  test('skips empty values', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: ''},
      {name: 'Other', value: '   '},
    ];
    const params = selectedOptionsToUrlParams(options);

    expect(params.get('Color')).toBe('Red');
    expect(params.get('Size')).toBeNull();
    expect(params.get('Other')).toBeNull();
  });

  test('handles empty array', () => {
    const params = selectedOptionsToUrlParams([]);

    expect(Array.from(params.keys())).toHaveLength(0);
  });

  test('handles missing options in optionKeys', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
    ];
    const params = selectedOptionsToUrlParams(options, ['Color', 'Size']);

    expect(params.get('Color')).toBe('Red');
    expect(params.get('Size')).toBeNull();
  });

  test('preserves value casing', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'LARGE'},
    ];
    const params = selectedOptionsToUrlParams(options);

    expect(params.get('Color')).toBe('Red');
    expect(params.get('Size')).toBe('LARGE');
  });

  test('handles special characters in values', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red Blue'},
    ];
    const params = selectedOptionsToUrlParams(options);

    expect(params.get('Color')).toBe('Red Blue');
  });

  test('does not mutate input options', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
    ];
    const original = JSON.parse(JSON.stringify(options));

    selectedOptionsToUrlParams(options);

    expect(options).toEqual(original);
  });
});

