import {describe, expect, test} from 'vitest';
import {normalizeSelectedOptions} from './normalizeSelectedOptions.js';
import type {SelectedOption} from '../types/selectedOption.js';

describe('normalizeSelectedOptions', () => {
  test('returns options unchanged with default options', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ];
    const result = normalizeSelectedOptions(options);

    expect(result).toEqual(options);
    expect(result).not.toBe(options); // New array
  });

  test('trims whitespace when trim=true', () => {
    const options: SelectedOption[] = [
      {name: ' Color ', value: ' Red '},
      {name: '  Size  ', value: '  Large  '},
    ];
    const result = normalizeSelectedOptions(options, {trim: true});

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]);
  });

  test('does not trim when trim=false', () => {
    const options: SelectedOption[] = [
      {name: ' Color ', value: ' Red '},
    ];
    const result = normalizeSelectedOptions(options, {trim: false});

    expect(result).toEqual([{name: ' Color ', value: ' Red '}]);
  });

  test('converts to lowercase when casing=lowercase', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ];
    const result = normalizeSelectedOptions(options, {casing: 'lowercase'});

    expect(result).toEqual([
      {name: 'color', value: 'red'},
      {name: 'size', value: 'large'},
    ]);
  });

  test('converts to uppercase when casing=uppercase', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
    ];
    const result = normalizeSelectedOptions(options, {casing: 'uppercase'});

    expect(result).toEqual([{name: 'COLOR', value: 'RED'}]);
  });

  test('keeps original casing when casing=none', () => {
    const options: SelectedOption[] = [
      {name: 'Color', value: 'Red'},
    ];
    const result = normalizeSelectedOptions(options, {casing: 'none'});

    expect(result).toEqual([{name: 'Color', value: 'Red'}]);
  });

  test('sorts by name when sort=true', () => {
    const options: SelectedOption[] = [
      {name: 'Size', value: 'Large'},
      {name: 'Color', value: 'Red'},
    ];
    const result = normalizeSelectedOptions(options, {sort: true});

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]);
  });

  test('preserves order when sort=false', () => {
    const options: SelectedOption[] = [
      {name: 'Size', value: 'Large'},
      {name: 'Color', value: 'Red'},
    ];
    const result = normalizeSelectedOptions(options, {sort: false});

    expect(result).toEqual([
      {name: 'Size', value: 'Large'},
      {name: 'Color', value: 'Red'},
    ]);
  });

  test('combines trim, casing, and sort', () => {
    const options: SelectedOption[] = [
      {name: ' Size ', value: ' Large '},
      {name: ' Color ', value: ' Red '},
    ];
    const result = normalizeSelectedOptions(options, {
      trim: true,
      casing: 'lowercase',
      sort: true,
    });

    expect(result).toEqual([
      {name: 'color', value: 'red'},
      {name: 'size', value: 'large'},
    ]);
  });

  test('handles empty array', () => {
    const result = normalizeSelectedOptions([]);

    expect(result).toEqual([]);
  });

  test('does not mutate input', () => {
    const options: SelectedOption[] = [
      {name: ' Color ', value: ' Red '},
    ];
    const original = JSON.parse(JSON.stringify(options));

    normalizeSelectedOptions(options, {trim: true, casing: 'lowercase'});

    expect(options).toEqual(original);
  });
});

