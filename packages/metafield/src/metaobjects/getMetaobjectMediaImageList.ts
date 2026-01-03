/**
 * Extracts an array of media images from a metaobject references field.
 *
 * Handles the common pattern where a metaobject field contains references
 * to multiple file/image resources with image properties.
 *
 * @param field - The metaobject field with optional references.nodes structure
 * @returns Array of image objects with url, altText, width, height
 *
 * @example
 * ```ts
 * const gallery = getMetaobjectMediaImageList(galleryField);
 * // Returns: Array<{url: string, altText: string | null, width: number | null, height: number | null}>
 * ```
 */
export function getMetaobjectMediaImageList(
  field?: {
    references?: {
      nodes?: Array<{
        image?: {
          url?: string | null;
          altText?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      } | null> | null;
    } | null;
  } | null,
): Array<{
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}> {
  if (!field?.references?.nodes) {
    return [];
  }

  const images: Array<{
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  }> = [];

  for (const node of field.references.nodes) {
    if (!node?.image?.url) {
      continue;
    }

    const url = node.image.url.trim();
    if (url === '') {
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

