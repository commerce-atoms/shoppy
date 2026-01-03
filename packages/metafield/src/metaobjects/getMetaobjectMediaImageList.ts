import type { MetaobjectReferencesFieldLike } from "../types/metaobject.js";

/**
 * Extracts an array of media images from a metaobject references field.
 *
 * **Pattern:** Requires explicit field selection. Pass the field directly
 * (e.g., `metaobject.galleryField`), not the metaobject itself.
 * This avoids scanning fields and provides better type safety.
 *
 * Handles the common pattern where a metaobject field contains references
 * to multiple file/image resources with image properties.
 *
 * **Return contract:** Never returns `undefined`. Missing images return `[]`.
 *
 * @param field - The metaobject references field object
 * @returns Array of image objects with url, altText, width, height (never undefined, returns [] for missing)
 *
 * @example
 * ```ts
 * // ✅ Correct: Pass field directly from aliased query selection
 * const gallery = getMetaobjectMediaImageList(metaobject.galleryField);
 *
 * // ❌ Wrong: Scanning fields won't contain references unless you query references on every field
 * const gallery = getMetaobjectMediaImageList(
 *   getMetaobjectField(metaobject, 'gallery') as any
 * );
 * ```
 */
export function getMetaobjectMediaImageList(
  field: MetaobjectReferencesFieldLike
): Array<{
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}> {
  const nodes = field?.references?.nodes ?? [];

  const images: Array<{
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  }> = [];

  for (const node of nodes) {
    if (!node?.image?.url) {
      continue;
    }

    const url = node.image.url.trim();
    if (url === "") {
      continue;
    }

    images.push({
      url,
      altText: node.image.altText ?? null,
      width: node.image.width ?? null,
      height: node.image.height ?? null,
    });
  }

  return images;
}
