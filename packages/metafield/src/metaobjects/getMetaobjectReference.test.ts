import {describe, expect, test} from 'vitest';
import {getMetaobjectReferenceFromMetafield} from './getMetaobjectReferenceFromMetafield.js';
import type {MetafieldOwnerLike} from '../types/metafield.js';

describe('getMetaobjectReference', () => {
  test('returns undefined when metafield is missing', () => {
    const owner: MetafieldOwnerLike = {metafields: []};
    const result = getMetaobjectReferenceFromMetafield(owner, 'custom', 'related');
    expect(result).toBeUndefined();
  });

  test('returns undefined when metafield has no reference', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {namespace: 'custom', key: 'related', value: 'some-value'},
      ],
    };
    const result = getMetaobjectReferenceFromMetafield(owner, 'custom', 'related');
    expect(result).toBeUndefined();
  });

  test('returns reference when present', () => {
    const reference = {id: '123', type: 'metaobject'};
    const owner: MetafieldOwnerLike = {
      metafields: [
        {
          namespace: 'custom',
          key: 'related',
          value: 'some-value',
          reference,
        },
      ],
    };
    const result = getMetaobjectReferenceFromMetafield(owner, 'custom', 'related');
    expect(result).toBe(reference);
  });

  test('returns null reference as undefined', () => {
    const owner: MetafieldOwnerLike = {
      metafields: [
        {
          namespace: 'custom',
          key: 'related',
          value: 'some-value',
          reference: null,
        },
      ],
    };
    const result = getMetaobjectReferenceFromMetafield(owner, 'custom', 'related');
    expect(result).toBeUndefined();
  });
});

