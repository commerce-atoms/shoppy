import type {JsonLdValue} from '../types/meta.js';

/**
 * Builds JSON-LD schema for a product.
 *
 * Creates a Product schema.org object with name, description, images,
 * and optional brand information.
 *
 * @param title - Product title (required)
 * @param description - Product description (optional)
 * @param images - Array of image URLs (optional)
 * @param brandName - Brand name (optional)
 * @returns JSON-LD object, or undefined if title is missing
 *
 * @example
 * ```ts
 * const jsonLd = buildProductJsonLd(
 *   'Product Name',
 *   'Product description',
 *   ['https://example.com/img.jpg'],
 *   'Brand Name'
 * );
 * ```
 */
export function buildProductJsonLd(
  title: string,
  description?: string,
  images?: string[],
  brandName?: string,
): JsonLdValue | undefined {
  if (!title || title.trim() === '') {
    return undefined;
  }

  const jsonLd: {[k: string]: JsonLdValue} = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title.trim(),
  };

  if (description?.trim()) {
    jsonLd.description = description.trim();
  }

  if (images && images.length > 0) {
    jsonLd.image = images;
  }

  if (brandName?.trim()) {
    jsonLd.brand = {
      '@type': 'Brand',
      name: brandName.trim(),
    };
  }

  return jsonLd;
}
