import { describe, expect, test } from 'vitest';
import { buildProductMeta } from './buildProductMeta.js';
import type { ProductLike } from '../types/product.js';

describe('buildProductMeta', () => {
  test('returns fallback when product is null', () => {
    const result = buildProductMeta(null);
    expect(result.title).toBe('Product');
  });

  test('uses seo.title as first priority', () => {
    const product: ProductLike = {
      seo: { title: 'SEO Title' },
      title: 'Product Title',
    };
    const result = buildProductMeta(product);
    expect(result.title).toBe('SEO Title');
  });

  test('uses title when seo.title missing', () => {
    const product: ProductLike = { title: 'Product Title' };
    const result = buildProductMeta(product);
    expect(result.title).toBe('Product Title');
  });

  test('uses fallback when all titles missing', () => {
    const product: ProductLike = {};
    const result = buildProductMeta(product);
    expect(result.title).toBe('Product');
  });

  test('uses seo.description as first priority', () => {
    const product: ProductLike = {
      seo: { description: 'SEO Description' },
      description: 'Product Description',
    };
    const result = buildProductMeta(product);
    expect(result.description).toBe('SEO Description');
  });

  test('uses description when seo.description missing', () => {
    const product: ProductLike = { description: 'Product Description' };
    const result = buildProductMeta(product);
    expect(result.description).toBe('Product Description');
  });

  test('strips HTML from descriptionHtml', () => {
    const product: ProductLike = {
      descriptionHtml: '<p>Product <strong>Description</strong></p>',
    };
    const result = buildProductMeta(product);
    expect(result.description).toBe('Product Description');
  });

  test('prefers featuredImage over images.nodes', () => {
    const product: ProductLike = {
      title: 'Product',
      featuredImage: { url: 'https://example.com/featured.jpg' },
      images: {
        nodes: [{ url: 'https://example.com/other.jpg' }],
      },
    };
    const result = buildProductMeta(product);
    expect(result.openGraph?.images).toEqual([
      { url: 'https://example.com/featured.jpg', alt: undefined },
    ]);
  });

  test('uses first image from images.nodes when featuredImage missing', () => {
    const product: ProductLike = {
      title: 'Product',
      images: {
        nodes: [
          { url: 'https://example.com/first.jpg' },
          { url: 'https://example.com/second.jpg' },
        ],
      },
    };
    const result = buildProductMeta(product);
    expect(result.openGraph?.images).toEqual([
      { url: 'https://example.com/first.jpg', alt: undefined },
    ]);
  });

  test('generates JSON-LD only when title exists', () => {
    const product: ProductLike = { title: 'Product Title' };
    const result = buildProductMeta(product);
    expect(result.jsonLd).toBeDefined();
    expect((result.jsonLd as Record<string, unknown>).name).toBe('Product Title');
  });

  test('does not generate JSON-LD when title is fallback', () => {
    const product: ProductLike = {};
    const result = buildProductMeta(product);
    expect(result.jsonLd).toBeUndefined();
  });

  test('includes brand in JSON-LD from options', () => {
    const product: ProductLike = { title: 'Product Title' };
    const result = buildProductMeta(product, { brandName: 'My Brand' });
    const jsonLd = result.jsonLd as Record<string, unknown>;
    expect(jsonLd.brand).toEqual({
      '@type': 'Brand',
      name: 'My Brand',
    });
  });

  test('includes vendor as brand when brandName not provided', () => {
    const product: ProductLike = { title: 'Product Title', vendor: 'Vendor Name' };
    const result = buildProductMeta(product);
    const jsonLd = result.jsonLd as Record<string, unknown>;
    expect(jsonLd.brand).toEqual({
      '@type': 'Brand',
      name: 'Vendor Name',
    });
  });

  test('omits undefined fields from JSON-LD', () => {
    const product: ProductLike = { title: 'Product Title' };
    const result = buildProductMeta(product);
    const jsonLd = result.jsonLd as Record<string, unknown>;
    expect('description' in jsonLd).toBe(false);
    expect('image' in jsonLd).toBe(false);
  });
});

