import { describe, expect, test } from 'vitest';
import { buildCollectionMeta } from './buildCollectionMeta.js';
import type { CollectionLike } from '../types/collection.js';

describe('buildCollectionMeta', () => {
  test('returns fallback when collection is null', () => {
    const result = buildCollectionMeta(null);
    expect(result.title).toBe('Collection');
  });

  test('uses seo.title as first priority', () => {
    const collection: CollectionLike = {
      seo: { title: 'SEO Title' },
      title: 'Collection Title',
    };
    const result = buildCollectionMeta(collection);
    expect(result.title).toBe('SEO Title');
  });

  test('uses title when seo.title missing', () => {
    const collection: CollectionLike = { title: 'Collection Title' };
    const result = buildCollectionMeta(collection);
    expect(result.title).toBe('Collection Title');
  });

  test('strips HTML from descriptionHtml', () => {
    const collection: CollectionLike = {
      descriptionHtml: '<p>Collection <strong>Description</strong></p>',
    };
    const result = buildCollectionMeta(collection);
    expect(result.description).toBe('Collection Description');
  });

  test('uses collection.image for images', () => {
    const collection: CollectionLike = {
      title: 'Collection',
      image: { url: 'https://example.com/image.jpg', altText: 'Alt' },
    };
    const result = buildCollectionMeta(collection);
    expect(result.openGraph?.images).toEqual([
      { url: 'https://example.com/image.jpg', alt: 'Alt' },
    ]);
  });

  test('generates JSON-LD only when title exists', () => {
    const collection: CollectionLike = { title: 'Collection Title' };
    const result = buildCollectionMeta(collection);
    expect(result.jsonLd).toBeDefined();
    expect((result.jsonLd as Record<string, unknown>).name).toBe('Collection Title');
  });

  test('does not generate JSON-LD when title is fallback', () => {
    const collection: CollectionLike = {};
    const result = buildCollectionMeta(collection);
    expect(result.jsonLd).toBeUndefined();
  });

  test('uses CollectionPage type in JSON-LD', () => {
    const collection: CollectionLike = { title: 'Collection Title' };
    const result = buildCollectionMeta(collection);
    const jsonLd = result.jsonLd as Record<string, unknown>;
    expect(jsonLd['@type']).toBe('CollectionPage');
  });
});

