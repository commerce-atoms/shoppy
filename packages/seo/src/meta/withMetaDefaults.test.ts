import { describe, expect, test } from 'vitest';
import { withMetaDefaults } from './withMetaDefaults.js';
import { buildPageMeta } from './buildPageMeta.js';
import type { MetaOutput } from '../types/meta.js';

const DEFAULT_IMAGE = { url: 'https://example.com/og.jpg', alt: 'Brand' };

describe('withMetaDefaults', () => {
  test('falls back to the default image when the page has none', () => {
    const result = withMetaDefaults(buildPageMeta({ title: 'About' }), {
      image: DEFAULT_IMAGE,
    });
    expect(result.openGraph?.images).toEqual([DEFAULT_IMAGE]);
    expect(result.twitter?.images).toEqual([DEFAULT_IMAGE.url]);
    expect(result.twitter?.card).toBe('summary_large_image');
  });

  test('keeps page images over the default', () => {
    const meta = buildPageMeta({
      title: 'Product',
      images: [{ url: 'https://cdn.example.com/p.jpg', alt: 'P' }],
    });
    const result = withMetaDefaults(meta, { image: DEFAULT_IMAGE });
    expect(result.openGraph?.images).toEqual([
      { url: 'https://cdn.example.com/p.jpg', alt: 'P' },
    ]);
    expect(result.twitter?.images).toEqual(['https://cdn.example.com/p.jpg']);
  });

  test('fills OpenGraph and Twitter text from page fields', () => {
    const meta = buildPageMeta({
      title: 'About',
      description: 'Who we are',
      canonicalUrl: 'https://example.com/about',
    });
    const result = withMetaDefaults(meta);
    expect(result.openGraph).toEqual({
      title: 'About',
      description: 'Who we are',
      url: 'https://example.com/about',
    });
    expect(result.twitter).toEqual({
      card: 'summary',
      title: 'About',
      description: 'Who we are',
    });
  });

  test('never overwrites existing values', () => {
    const meta: MetaOutput = {
      title: 'Page',
      openGraph: { title: 'OG title', url: 'https://example.com/og' },
      twitter: { card: 'summary', title: 'TW title' },
    };
    const result = withMetaDefaults(meta, { image: DEFAULT_IMAGE });
    expect(result.openGraph?.title).toBe('OG title');
    expect(result.openGraph?.url).toBe('https://example.com/og');
    expect(result.twitter?.card).toBe('summary');
    expect(result.twitter?.title).toBe('TW title');
  });

  test('preserves jsonLd and does not mutate input', () => {
    const meta: MetaOutput = { title: 'Page', jsonLd: { '@type': 'Thing' } };
    const snapshot = structuredClone(meta);
    const result = withMetaDefaults(meta, { image: DEFAULT_IMAGE });
    expect(result.jsonLd).toEqual({ '@type': 'Thing' });
    expect(meta).toEqual(snapshot);
  });

  test('omits images entirely when neither page nor defaults have one', () => {
    const result = withMetaDefaults(buildPageMeta({ title: 'Page' }));
    expect(result.openGraph?.images).toBeUndefined();
    expect(result.twitter?.images).toBeUndefined();
  });
});
