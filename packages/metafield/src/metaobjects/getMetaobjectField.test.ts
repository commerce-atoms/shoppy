import {describe, expect, test} from 'vitest';
import {getMetaobjectField} from './getMetaobjectField.js';
import type {MetaobjectLike} from '../types/metaobject.js';

describe('getMetaobjectField', () => {
  test('returns undefined when metaobject is undefined', () => {
    const result = getMetaobjectField(undefined, 'description');
    expect(result).toBeUndefined();
  });

  test('returns undefined when metaobject is null', () => {
    const result = getMetaobjectField(null, 'description');
    expect(result).toBeUndefined();
  });

  test('returns undefined when fields is undefined', () => {
    const metaobject: MetaobjectLike = {};
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toBeUndefined();
  });

  test('returns undefined when fields is null', () => {
    const metaobject: MetaobjectLike = {fields: null};
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toBeUndefined();
  });

  test('returns undefined when fields is empty', () => {
    const metaobject: MetaobjectLike = {fields: []};
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toBeUndefined();
  });

  test('ignores null entries in fields array', () => {
    const metaobject: MetaobjectLike = {
      fields: [
        null,
        {key: 'description', value: 'Test description'},
        null,
      ],
    };
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toEqual({key: 'description', value: 'Test description'});
  });

  test('returns first match when multiple matches exist', () => {
    const metaobject: MetaobjectLike = {
      fields: [
        {key: 'description', value: 'First'},
        {key: 'description', value: 'Second'},
      ],
    };
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toEqual({key: 'description', value: 'First'});
  });

  test('requires exact key match', () => {
    const metaobject: MetaobjectLike = {
      fields: [
        {key: 'description', value: 'Test'},
        {key: 'title', value: 'Title'},
      ],
    };
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toEqual({key: 'description', value: 'Test'});
  });

  test('is case-sensitive for key', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'Description', value: 'Test'}],
    };
    const result = getMetaobjectField(metaobject, 'description');
    expect(result).toBeUndefined();
  });

  test('handles field with all properties', () => {
    const metaobject: MetaobjectLike = {
      fields: [
        {
          key: 'config',
          value: '{"enabled": true}',
          reference: {id: '123'},
        },
      ],
    };
    const result = getMetaobjectField(metaobject, 'config');
    expect(result).toEqual({
      key: 'config',
      value: '{"enabled": true}',
      reference: {id: '123'},
    });
  });
});

