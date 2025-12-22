import {describe, expect, test} from 'vitest';
import {parseMetafieldValue} from './parseMetafieldValue.js';

describe('parseMetafieldValue', () => {
  describe('non-strict mode', () => {
    test('returns undefined for empty string', () => {
      const result = parseMetafieldValue('', 'string', false);
      expect(result).toBeUndefined();
    });

    test('returns undefined for whitespace only', () => {
      const result = parseMetafieldValue('   ', 'string', false);
      expect(result).toBeUndefined();
    });

    test('returns trimmed string in string mode', () => {
      const result = parseMetafieldValue('  red  ', 'string', false);
      expect(result).toBe('red');
    });

    test('parses valid JSON', () => {
      const result = parseMetafieldValue('{"enabled": true}', 'json', false);
      expect(result).toEqual({enabled: true});
    });

    test('returns undefined for invalid JSON', () => {
      const result = parseMetafieldValue('{invalid}', 'json', false);
      expect(result).toBeUndefined();
    });

    test('parses valid number', () => {
      const result = parseMetafieldValue('42', 'number', false);
      expect(result).toBe(42);
    });

    test('parses decimal number', () => {
      const result = parseMetafieldValue('19.99', 'number', false);
      expect(result).toBe(19.99);
    });

    test('returns undefined for invalid number', () => {
      const result = parseMetafieldValue('not-a-number', 'number', false);
      expect(result).toBeUndefined();
    });

    test('parses boolean true', () => {
      const result = parseMetafieldValue('true', 'boolean', false);
      expect(result).toBe(true);
    });

    test('parses boolean TRUE (uppercase)', () => {
      const result = parseMetafieldValue('TRUE', 'boolean', false);
      expect(result).toBe(true);
    });

    test('parses boolean false', () => {
      const result = parseMetafieldValue('false', 'boolean', false);
      expect(result).toBe(false);
    });

    test('returns undefined for invalid boolean', () => {
      const result = parseMetafieldValue('yes', 'boolean', false);
      expect(result).toBeUndefined();
    });
  });

  describe('strict mode', () => {
    test('returns ParseResult with EMPTY reason for empty string', () => {
      const result = parseMetafieldValue('', 'string', true);
      expect(result).toEqual({ok: false, reason: 'EMPTY'});
    });

    test('returns ParseResult with EMPTY reason for whitespace only', () => {
      const result = parseMetafieldValue('   ', 'string', true);
      expect(result).toEqual({ok: false, reason: 'EMPTY'});
    });

    test('returns ParseResult with ok:true for valid string', () => {
      const result = parseMetafieldValue('red', 'string', true);
      expect(result).toEqual({ok: true, value: 'red'});
    });

    test('returns ParseResult with ok:true for valid JSON', () => {
      const result = parseMetafieldValue('{"enabled": true}', 'json', true);
      expect(result).toEqual({ok: true, value: {enabled: true}});
    });

    test('returns ParseResult with INVALID reason for invalid JSON', () => {
      const result = parseMetafieldValue('{invalid}', 'json', true);
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });

    test('returns ParseResult with ok:true for valid number', () => {
      const result = parseMetafieldValue('42', 'number', true);
      expect(result).toEqual({ok: true, value: 42});
    });

    test('returns ParseResult with INVALID reason for invalid number', () => {
      const result = parseMetafieldValue('not-a-number', 'number', true);
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });

    test('returns ParseResult with ok:true for valid boolean', () => {
      const result = parseMetafieldValue('true', 'boolean', true);
      expect(result).toEqual({ok: true, value: true});
    });

    test('returns ParseResult with INVALID reason for invalid boolean', () => {
      const result = parseMetafieldValue('yes', 'boolean', true);
      expect(result).toEqual({ok: false, reason: 'INVALID'});
    });
  });
});

