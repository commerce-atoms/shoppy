import { describe, expect, test } from 'vitest';
import { buildOrganizationJsonLd } from './buildOrganizationJsonLd.js';

describe('buildOrganizationJsonLd', () => {
  test('returns undefined when name is empty', () => {
    expect(buildOrganizationJsonLd({ name: '   ' })).toBeUndefined();
  });

  test('builds a minimal Organization', () => {
    expect(buildOrganizationJsonLd({ name: '  Brand  ' })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Brand',
    });
  });

  test('includes url, logo and description when present', () => {
    expect(
      buildOrganizationJsonLd({
        name: 'Brand',
        url: 'https://example.com',
        logo: 'https://example.com/logo.png',
        description: 'We make things',
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Brand',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      description: 'We make things',
    });
  });

  test('cleans sameAs: drops empties, trims, dedupes', () => {
    const result = buildOrganizationJsonLd({
      name: 'Brand',
      sameAs: [
        'https://x.com/brand',
        '',
        null,
        undefined,
        '  https://x.com/brand  ',
        'https://www.instagram.com/brand',
      ],
    }) as { sameAs?: string[] };
    expect(result.sameAs).toEqual([
      'https://x.com/brand',
      'https://www.instagram.com/brand',
    ]);
  });

  test('omits sameAs when no links survive', () => {
    const result = buildOrganizationJsonLd({
      name: 'Brand',
      sameAs: ['', null],
    }) as Record<string, unknown>;
    expect(result).not.toHaveProperty('sameAs');
  });
});
