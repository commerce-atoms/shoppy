/**
 * Extracts a media image from a metaobject reference field.
 *
 * **Pattern:** Requires explicit field selection. Pass the field directly
 * (e.g., `metaobject.heroImageField`), not the metaobject itself.
 * This avoids scanning fields and provides better type safety.
 *
 * Handles the common pattern where a metaobject field contains a reference
 * to a file/image resource with image properties.
 *
 * **Return contract:** Never returns `undefined`. Missing images return `null`.
 *
 * @param field - The metaobject field with optional reference.image structure
 * @returns Image object with url, altText, width, height, or null if missing (never undefined)
 *
 * @example
 * ```ts
 * // ✅ Correct: Pass field directly from aliased query selection
 * const heroImage = getMetaobjectMediaImage(metaobject.heroImageField);
 *
 * // ❌ Wrong: Scanning fields won't contain references unless you query references on every field
 * const heroImage = getMetaobjectMediaImage(
 *   getMetaobjectField(metaobject, 'hero_image') as any
 * );
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

