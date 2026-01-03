/**
 * Extracts a media image from a metaobject reference field.
 *
 * Handles the common pattern where a metaobject field contains a reference
 * to a file/image resource with image properties.
 *
 * @param field - The metaobject field with optional reference.image structure
 * @returns Image object with url, altText, width, height, or null if missing
 *
 * @example
 * ```ts
 * const heroImage = getMetaobjectMediaImage(heroImageField);
 * // Returns: {url: string, altText: string | null, width: number | null, height: number | null} | null
 * ```
 */
export function getMetaobjectMediaImage(
  field?: {
    reference?: {
      image?: {
        url?: string | null;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null,
): {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
} | null {
  if (!field?.reference?.image?.url) {
    return null;
  }

  const url = field.reference.image.url.trim();
  if (url === '') {
    return null;
  }

  return {
    url,
    altText: field.reference.image.altText ?? null,
    width: field.reference.image.width ?? null,
    height: field.reference.image.height ?? null,
  };
}

