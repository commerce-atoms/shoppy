/**
 * Builds JSON-LD schema for a collection page.
 *
 * Creates a CollectionPage schema.org object with name, description, and images.
 *
 * @param title - Collection title (required)
 * @param description - Collection description (optional)
 * @param images - Array of image URLs (optional)
 * @returns JSON-LD object, or undefined if title is missing
 *
 * @example
 * ```ts
 * const jsonLd = buildCollectionJsonLd(
 *   'Collection Name',
 *   'Collection description',
 *   ['https://example.com/img.jpg']
 * );
 * ```
 */
import type {JsonLdValue} from '../types/meta.js';

export function buildCollectionJsonLd(
  title: string,
  description?: string,
  images?: string[],
): JsonLdValue | undefined {
  if (!title || title.trim() === '') {
    return undefined;
  }

  const jsonLd: {[k: string]: JsonLdValue} = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title.trim(),
  };

  if (description?.trim()) {
    jsonLd.description = description.trim();
  }

  if (images && images.length > 0) {
    jsonLd.image = images;
  }

  return jsonLd;
}
