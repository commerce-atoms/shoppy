import {describe, expect, test} from 'vitest';
import {getMetaobjectMediaImageList} from './getMetaobjectMediaImageList.js';

describe('getMetaobjectMediaImageList', () => {
  test('returns empty array when field is undefined', () => {
    const result = getMetaobjectMediaImageList(undefined);
    expect(result).toEqual([]);
  });

  test('returns empty array when field is null', () => {
    const result = getMetaobjectMediaImageList(null);
    expect(result).toEqual([]);
  });

  test('returns empty array when references is missing', () => {
    const field = {};
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([]);
  });

  test('returns empty array when references is null', () => {
    const field = {references: null};
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([]);
  });

  test('returns empty array when nodes is missing', () => {
    const field = {references: {}};
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([]);
  });

  test('returns empty array when nodes is null', () => {
    const field = {references: {nodes: null}};
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([]);
  });

  test('returns empty array when nodes is empty', () => {
    const field = {references: {nodes: []}};
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([]);
  });

  test('filters out null nodes', () => {
    const field = {
      references: {
        nodes: [
          null,
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
          null,
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('filters out nodes with missing image', () => {
    const field = {
      references: {
        nodes: [
          {},
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('filters out nodes with null image', () => {
    const field = {
      references: {
        nodes: [
          {image: null},
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('filters out nodes with missing url', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              altText: 'Alt text',
            },
          },
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('filters out nodes with empty url', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              url: '',
            },
          },
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('filters out nodes with whitespace-only url', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              url: '   ',
            },
          },
          {
            image: {
              url: 'https://example.com/image1.jpg',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });

  test('returns array of image objects', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              url: 'https://example.com/image1.jpg',
              altText: 'Image 1',
              width: 800,
              height: 600,
            },
          },
          {
            image: {
              url: 'https://example.com/image2.jpg',
              altText: 'Image 2',
              width: 1200,
              height: 900,
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: 'Image 1',
        width: 800,
        height: 600,
      },
      {
        url: 'https://example.com/image2.jpg',
        altText: 'Image 2',
        width: 1200,
        height: 900,
      },
    ]);
  });

  test('trims url whitespace', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              url: '  https://example.com/image1.jpg  ',
              altText: 'Image 1',
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: 'Image 1',
        width: null,
        height: null,
      },
    ]);
  });

  test('handles null altText, width, and height', () => {
    const field = {
      references: {
        nodes: [
          {
            image: {
              url: 'https://example.com/image1.jpg',
              altText: null,
              width: null,
              height: null,
            },
          },
        ],
      },
    };
    const result = getMetaobjectMediaImageList(field);
    expect(result).toEqual([
      {
        url: 'https://example.com/image1.jpg',
        altText: null,
        width: null,
        height: null,
      },
    ]);
  });
});

