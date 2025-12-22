import { describe, expect, test } from 'vitest';
import { buildPageMeta } from './buildPageMeta.js';
import type { PageMetaInput } from '../types/page.js';

describe('buildPageMeta', () => {
  test('trims title and uses fallback when empty', () => {
    const input: PageMetaInput = { title: '   ' };
    const result = buildPageMeta(input);
    expect(result.title).toBe('Page');
  });

  test('trims title', () => {
    const input: PageMetaInput = { title: '  About Us  ' };
    const result = buildPageMeta(input);
    expect(result.title).toBe('About Us');
  });

  test('omits description when empty', () => {
    const input: PageMetaInput = { title: 'Page', description: '' };
    const result = buildPageMeta(input);
    expect(result.description).toBeUndefined();
  });

  test('trims description', () => {
    const input: PageMetaInput = {
      title: 'Page',
      description: '  Description  ',
    };
    const result = buildPageMeta(input);
    expect(result.description).toBe('Description');
  });

  test('includes canonicalUrl when provided', () => {
    const input: PageMetaInput = {
      title: 'Page',
      canonicalUrl: 'https://example.com/page',
    };
    const result = buildPageMeta(input);
    expect(result.canonicalUrl).toBe('https://example.com/page');
  });

  test('builds OpenGraph only when images exist', () => {
    const input: PageMetaInput = { title: 'Page' };
    const result = buildPageMeta(input);
    expect(result.openGraph).toBeUndefined();
  });

  test('builds OpenGraph with images', () => {
    const input: PageMetaInput = {
      title: 'Page',
      images: [{ url: 'https://example.com/image.jpg', alt: 'Image' }],
    };
    const result = buildPageMeta(input);
    expect(result.openGraph).toBeDefined();
    expect(result.openGraph?.images).toEqual([
      { url: 'https://example.com/image.jpg', alt: 'Image' },
    ]);
  });

  test('filters out invalid images', () => {
    const input: PageMetaInput = {
      title: 'Page',
      images: [
        { url: '', alt: 'Empty' },
        { url: 'https://example.com/image.jpg', alt: 'Valid' },
        { url: '   ', alt: 'Whitespace' },
      ],
    };
    const result = buildPageMeta(input);
    expect(result.openGraph?.images).toEqual([
      { url: 'https://example.com/image.jpg', alt: 'Valid' },
    ]);
  });

  test('builds Twitter card based on image count', () => {
    const input: PageMetaInput = {
      title: 'Page',
      images: [{ url: 'https://example.com/image.jpg' }],
    };
    const result = buildPageMeta(input);
    expect(result.twitter?.card).toBe('summary_large_image');
  });

  test('includes description in OpenGraph when present', () => {
    const input: PageMetaInput = {
      title: 'Page',
      description: 'Description',
      images: [{ url: 'https://example.com/image.jpg' }],
    };
    const result = buildPageMeta(input);
    expect(result.openGraph?.description).toBe('Description');
  });

  test('does not create keys with undefined values', () => {
    const input: PageMetaInput = { title: 'Page' };
    const result = buildPageMeta(input);
    expect('description' in result).toBe(false);
    expect('canonicalUrl' in result).toBe(false);
  });
});

