import {describe, expect, test} from 'vitest';
import {buildTitle} from './buildTitle.js';

describe('buildTitle', () => {
  test('joins segments and appends the site name', () => {
    expect(
      buildTitle(['Wolf Study 01', 'Dark Red', 'Shop'], {siteName: 'Brand'}),
    ).toBe('Wolf Study 01 | Dark Red | Shop | Brand');
  });

  test('returns the site name alone when it is the only segment', () => {
    expect(buildTitle(['Brand'], {siteName: 'Brand'})).toBe('Brand');
    expect(buildTitle([], {siteName: 'Brand'})).toBe('Brand');
  });

  test('drops empty segments and trims', () => {
    expect(
      buildTitle(['  About ', '', null, undefined], {siteName: ' Brand '}),
    ).toBe('About | Brand');
  });

  test('drops a segment repeating the previous one, case-insensitively', () => {
    expect(buildTitle(['Shop', 'shop'], {siteName: 'Brand'})).toBe(
      'Shop | Brand',
    );
  });

  test('keeps non-adjacent repeats', () => {
    expect(buildTitle(['A', 'B', 'A'])).toBe('A | B | A');
  });

  test('supports a custom separator and no site name', () => {
    expect(buildTitle(['A', 'B'], {separator: ' / '})).toBe('A / B');
  });

  test('returns an empty string when nothing remains', () => {
    expect(buildTitle([' ', null])).toBe('');
  });
});
