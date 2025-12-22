import {describe, expect, test} from 'vitest';
import {getMetafield} from './getMetafield.js';
import type {MetafieldOwnerLike} from '../types/metafield.js';

describe('getMetafield', () => {
  test('returns undefined when owner is undefined', () => {
    const result = getMetafield(undefined, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('returns undefined when owner is null', () => {
    const result = getMetafield(null, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('returns undefined when metafields is undefined', () => {
    const owner: MetafieldOwnerLike = {};
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('returns undefined when metafields is null', () => {
    const owner: MetafieldOwnerLike = {metafields: null};
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('returns undefined when metafields is empty', () => {
    const owner: MetafieldOwnerLike = {metafields: []};
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('ignores null entries in metafields array', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        null,
        {namespace: 'custom', key: 'color', value: 'red'},
        null,
      ],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toEqual({
      namespace: 'custom',
      key: 'color',
      value: 'red',
    });
  });

  test('returns first match when multiple matches exist', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {namespace: 'custom', key: 'color', value: 'red'},
        {namespace: 'custom', key: 'color', value: 'blue'},
      ],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toEqual({
      namespace: 'custom',
      key: 'color',
      value: 'red',
    });
  });

  test('requires exact namespace match', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {namespace: 'custom', key: 'color', value: 'red'},
        {namespace: 'other', key: 'color', value: 'blue'},
      ],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toEqual({
      namespace: 'custom',
      key: 'color',
      value: 'red',
    });
  });

  test('requires exact key match', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {namespace: 'custom', key: 'color', value: 'red'},
        {namespace: 'custom', key: 'size', value: 'large'},
      ],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toEqual({
      namespace: 'custom',
      key: 'color',
      value: 'red',
    });
  });

  test('is case-sensitive for namespace', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [{namespace: 'Custom', key: 'color', value: 'red'}],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('is case-sensitive for key', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [{namespace: 'custom', key: 'Color', value: 'red'}],
    };
    const result = getMetafield(owner, 'custom', 'color');
    expect(result).toBeUndefined();
  });

  test('handles metafield with all properties', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {
          namespace: 'custom',
          key: 'config',
          value: '{"enabled": true}',
          type: 'json',
          reference: {id: '123'},
        },
      ],
    };
    const result = getMetafield(owner, 'custom', 'config');
    expect(result).toEqual({
      namespace: 'custom',
      key: 'config',
      value: '{"enabled": true}',
      type: 'json',
      reference: {id: '123'},
    });
  });
});

