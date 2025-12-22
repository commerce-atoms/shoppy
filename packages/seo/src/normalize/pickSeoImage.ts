/**
 * Picks the first valid SEO image from an array of image nodes.
 *
 * Filters out null/undefined entries and empty URLs, returning the first
 * valid image with its URL and optional alt text.
 *
 * @param images - Array of image nodes (may contain null/undefined)
 * @returns First valid image object, or undefined if none found
 *
 * @example
 * ```ts
 * const image = pickSeoImage([
 *   null,
 *   { url: 'https://example.com/img.jpg', altText: 'Alt' },
 *   { url: '' }
 * ]);
 * // Returns: { url: 'https://example.com/img.jpg', alt: 'Alt' }
 * ```
 */
export function pickSeoImage(
  images: Array<{url?: string | null; altText?: string | null} | null | undefined> | null | undefined,
): {url: string; alt?: string} | undefined {
  if (!images) {
    return undefined;
  }

  const firstImage = images.find(
    (img) => img?.url && img.url.trim() !== '',
  );

  if (!firstImage?.url) {
    return undefined;
  }

  return {
    url: firstImage.url,
    alt: firstImage.altText || undefined,
  };
}

