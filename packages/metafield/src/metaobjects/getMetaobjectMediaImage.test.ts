import {describe, expect, test} from 'vitest';
import {getMetaobjectMediaImage} from './getMetaobjectMediaImage.js';

describe('getMetaobjectMediaImage', () => {
  test('returns null when field is undefined', () => {
    const result = getMetaobjectMediaImage(undefined);
    expect(result).toBeNull();
  });

  test('returns null when field is null', () => {
    const result = getMetaobjectMediaImage(null);
    expect(result).toBeNull();
  });

  test('returns null when reference is missing', () => {
    const field = {};
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when reference is null', () => {
    const field = {reference: null};
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when image is missing', () => {
    const field = {reference: {}};
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when image is null', () => {
    const field = {reference: {image: null}};
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when url is missing', () => {
    const field = {
      reference: {
        image: {
          altText: 'Alt text',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when url is null', () => {
    const field = {
      reference: {
        image: {
          url: null,
          altText: 'Alt text',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when url is empty string', () => {
    const field = {
      reference: {
        image: {
          url: '',
          altText: 'Alt text',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns null when url is only whitespace', () => {
    const field = {
      reference: {
        image: {
          url: '   ',
          altText: 'Alt text',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toBeNull();
  });

  test('returns image object with url only', () => {
    const field = {
      reference: {
        image: {
          url: 'https://example.com/image.jpg',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      altText: null,
      width: null,
      height: null,
    });
  });

  test('returns image object with all properties', () => {
    const field = {
      reference: {
        image: {
          url: 'https://example.com/image.jpg',
          altText: 'Example image',
          width: 800,
          height: 600,
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      altText: 'Example image',
      width: 800,
      height: 600,
    });
  });

  test('trims url whitespace', () => {
    const field = {
      reference: {
        image: {
          url: '  https://example.com/image.jpg  ',
          altText: 'Example image',
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      altText: 'Example image',
      width: null,
      height: null,
    });
  });

  test('handles null altText', () => {
    const field = {
      reference: {
        image: {
          url: 'https://example.com/image.jpg',
          altText: null,
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      altText: null,
      width: null,
      height: null,
    });
  });

  test('handles null width and height', () => {
    const field = {
      reference: {
        image: {
          url: 'https://example.com/image.jpg',
          width: null,
          height: null,
        },
      },
    };
    const result = getMetaobjectMediaImage(field);
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      altText: null,
      width: null,
      height: null,
    });
  });
});

