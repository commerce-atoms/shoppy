import {describe, expect, test} from 'vitest';
import {getSelectedOptionsFromUrl} from './getSelectedOptionsFromUrl.js';

describe('getSelectedOptionsFromUrl', () => {
  test('parses options from URLSearchParams', () => {
    const params = new URLSearchParams('?Color=Red&Size=Large');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]);
  });

  test('parses options from Record', () => {
    const record = {Color: 'Red', Size: 'Large'};
    const result = getSelectedOptionsFromUrl(record);

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]);
  });

  test('filters by optionKeys when provided', () => {
    const params = new URLSearchParams('?Color=Red&Size=Large&Other=Value');
    const result = getSelectedOptionsFromUrl(params, ['Color', 'Size']);

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'Large'},
    ]);
    expect(result.find((opt) => opt.name === 'Other')).toBeUndefined();
  });

  test('skips empty values', () => {
    const params = new URLSearchParams('?Color=Red&Size=&Empty=');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([{name: 'Color', value: 'Red'}]);
  });

  test('skips whitespace-only values', () => {
    const params = new URLSearchParams('?Color=Red&Size=   ');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([{name: 'Color', value: 'Red'}]);
  });

  test('handles empty params', () => {
    const params = new URLSearchParams();
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([]);
  });

  test('handles empty record', () => {
    const result = getSelectedOptionsFromUrl({});

    expect(result).toEqual([]);
  });

  test('preserves value casing', () => {
    const params = new URLSearchParams('?Color=Red&Size=LARGE');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([
      {name: 'Color', value: 'Red'},
      {name: 'Size', value: 'LARGE'},
    ]);
  });

  test('handles special characters in values', () => {
    const params = new URLSearchParams('?Color=Red%20Blue&Size=Large');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([
      {name: 'Color', value: 'Red Blue'},
      {name: 'Size', value: 'Large'},
    ]);
  });

  test('does not mutate input URLSearchParams', () => {
    const params = new URLSearchParams('?Color=Red');
    const original = params.toString();

    getSelectedOptionsFromUrl(params);

    expect(params.toString()).toBe(original);
  });

  test('handles duplicates in URLSearchParams - last value wins', () => {
    const params = new URLSearchParams('?Color=Red&Color=Blue&Color=Green');
    const result = getSelectedOptionsFromUrl(params);

    expect(result).toEqual([{name: 'Color', value: 'Green'}]);
  });

  test('handles duplicates in Record string[] - last value wins', () => {
    const record = {Color: ['Red', 'Blue', 'Green']};
    const result = getSelectedOptionsFromUrl(record);

    expect(result).toEqual([{name: 'Color', value: 'Green'}]);
  });

  test('handles duplicates with allowlist - last value wins', () => {
    const params = new URLSearchParams('?Color=Red&Color=Blue&Other=Value');
    const result = getSelectedOptionsFromUrl(params, ['Color']);

    expect(result).toEqual([{name: 'Color', value: 'Blue'}]);
    expect(result.find((opt) => opt.name === 'Other')).toBeUndefined();
  });
});

