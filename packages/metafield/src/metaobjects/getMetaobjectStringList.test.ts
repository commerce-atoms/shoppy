import {describe, expect, test} from 'vitest';
import {getMetaobjectStringList} from './getMetaobjectStringList.js';
import type {MetaobjectLike} from '../types/metaobject.js';

describe('getMetaobjectStringList', () => {
  test('returns empty array when metaobject is undefined', () => {
    const result = getMetaobjectStringList(undefined, 'tags');
    expect(result).toEqual([]);
  });

  test('returns empty array when metaobject is null', () => {
    const result = getMetaobjectStringList(null, 'tags');
    expect(result).toEqual([]);
  });

  test('returns empty array when field is missing', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'title', value: 'Test'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual([]);
  });

  test('returns empty array when field value is null', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: null}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual([]);
  });

  test('returns empty array when field value is empty string', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: ''}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual([]);
  });

  test('returns empty array when field value is only whitespace', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '   \n\t  '}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual([]);
  });

  test('parses JSON array correctly', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '["tag1", "tag2", "tag3"]'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('trims items in JSON array', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '["  tag1  ", "tag2", "  tag3  "]'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('filters out empty strings from JSON array', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '["tag1", "", "tag2", "   "]'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2']);
  });

  test('filters out non-string values from JSON array', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '["tag1", 42, true, null, "tag2"]'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2']);
  });

  test('falls back to comma-separated parsing when JSON is invalid', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: 'tag1, tag2, tag3'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('falls back to comma-separated parsing when JSON is not an array', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '{"key": "value"}'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['{"key": "value"}']);
  });

  test('trims items in comma-separated string', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '  tag1  ,  tag2  ,  tag3  '}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('filters out empty strings from comma-separated string', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: 'tag1, , tag2,   , tag3'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1', 'tag2', 'tag3']);
  });

  test('handles single item in comma-separated string', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: 'tag1'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1']);
  });

  test('handles single item in JSON array', () => {
    const metaobject: MetaobjectLike = {
      fields: [{key: 'tags', value: '["tag1"]'}],
    };
    const result = getMetaobjectStringList(metaobject, 'tags');
    expect(result).toEqual(['tag1']);
  });
});

