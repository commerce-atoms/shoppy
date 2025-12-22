import {describe, expect, test} from 'vitest';
import {getMetafieldValue} from './getMetafieldValue.js';
import type {MetafieldOwnerLike} from '../types/metafield.js';

describe('getMetafieldValue', () => {
  describe('non-strict mode', () => {
    test('returns undefined when metafield is missing', () => {
      const owner: MetafieldOwnerLike = {metafields: []};
      const result = getMetafieldValue(owner, 'custom', 'color');
      expect(result).toBeUndefined();
    });

    test('returns undefined when value is null', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: null}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color');
      expect(result).toBeUndefined();
    });

    test('returns undefined when value is empty string', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: ''}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color');
      expect(result).toBeUndefined();
    });

    test('returns undefined when value is whitespace only', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: '   '}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color');
      expect(result).toBeUndefined();
    });

    test('returns string value in string mode', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: 'red'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color', {
        mode: 'string',
      });
      expect(result).toBe('red');
    });

    test('trims string value', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: '  red  '}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color', {
        mode: 'string',
      });
      expect(result).toBe('red');
    });

    test('parses valid JSON', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [
          {namespace: 'custom', key: 'config', value: '{"enabled": true}'},
        ],
      };
      const result = getMetafieldValue(owner, 'custom', 'config', {
        mode: 'json',
      });
      expect(result).toEqual({enabled: true});
    });

    test('returns undefined for invalid JSON', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [
          {namespace: 'custom', key: 'config', value: '{invalid}'},
        ],
      };
      const result = getMetafieldValue(owner, 'custom', 'config', {
        mode: 'json',
      });
      expect(result).toBeUndefined();
    });

    test('parses valid number', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'count', value: '42'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'count', {
        mode: 'number',
      });
      expect(result).toBe(42);
    });

    test('parses decimal number', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'price', value: '19.99'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'price', {
        mode: 'number',
      });
      expect(result).toBe(19.99);
    });

    test('returns undefined for invalid number', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [
          {namespace: 'custom', key: 'count', value: 'not-a-number'},
        ],
      };
      const result = getMetafieldValue(owner, 'custom', 'count', {
        mode: 'number',
      });
      expect(result).toBeUndefined();
    });

    test('parses boolean true (case-insensitive)', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'enabled', value: 'true'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'enabled', {
        mode: 'boolean',
      });
      expect(result).toBe(true);
    });

    test('parses boolean TRUE (uppercase)', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'enabled', value: 'TRUE'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'enabled', {
        mode: 'boolean',
      });
      expect(result).toBe(true);
    });

    test('parses boolean false (case-insensitive)', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'enabled', value: 'false'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'enabled', {
        mode: 'boolean',
      });
      expect(result).toBe(false);
    });

    test('returns undefined for invalid boolean', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'enabled', value: 'yes'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'enabled', {
        mode: 'boolean',
      });
      expect(result).toBeUndefined();
    });

    test('defaults to string mode', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: 'red'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color');
      expect(result).toBe('red');
    });
  });

  describe('strict mode', () => {
    test('returns ParseResult with MISSING reason when metafield missing', () => {
      const owner: MetafieldOwnerLike = {metafields: []};
      const result = getMetafieldValue(owner, 'custom', 'color', {
        strict: true,
      });
      expect(result).toEqual({ok: false, reason: 'MISSING'});
    });

    test('returns ParseResult with EMPTY reason when value is empty', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: ''}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color', {
        strict: true,
      });
      expect(result).toEqual({ok: false, reason: 'EMPTY'});
    });

    test('returns ParseResult with INVALID reason for invalid JSON', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [
          {namespace: 'custom', key: 'config', value: '{invalid}'},
        ],
      };
      const result = getMetafieldValue(owner, 'custom', 'config', {
        mode: 'json',
        strict: true,
      });
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });

    test('returns ParseResult with INVALID reason for invalid number', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [
          {namespace: 'custom', key: 'count', value: 'not-a-number'},
        ],
      };
      const result = getMetafieldValue(owner, 'custom', 'count', {
        mode: 'number',
        strict: true,
      });
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });

    test('returns ParseResult with INVALID reason for invalid boolean', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'enabled', value: 'yes'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'enabled', {
        mode: 'boolean',
        strict: true,
      });
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });

    test('returns ParseResult with ok:true for valid value', () => {
      const owner: MetafieldOwnerLike = {
        metafields: [{namespace: 'custom', key: 'color', value: 'red'}],
      };
      const result = getMetafieldValue(owner, 'custom', 'color', {
        mode: 'string',
        strict: true,
      });
      expect(result).toEqual({ok: true, value: 'red'});
    });
  });
});

