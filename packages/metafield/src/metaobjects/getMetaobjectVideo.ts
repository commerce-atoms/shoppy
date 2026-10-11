import type { MetaobjectVideoReferenceFieldLike } from "../types/metaobject.js";

/**
 * Extracts a video from a metaobject reference field.
 *
 * **Pattern:** Requires explicit field selection. Pass the field directly
 * (e.g., `metaobject.clipField`), not the metaobject itself.
 *
 * Sources without a URL are dropped; source order is preserved so callers
 * can render them as `<source>` elements in Shopify's order.
 *
 * **Return contract:** Never returns `undefined`. A missing video, or one
 * with no usable source, returns `null`.
 *
 * @param field - The metaobject reference field object
 * @returns Video sources and preview image, or null if missing (never undefined)
 *
 * @example
 * ```ts
 * const clip = getMetaobjectVideo(metaobject.clipField);
 * ```
 */
export function getMetaobjectVideo(field: MetaobjectVideoReferenceFieldLike): {
  sources: Array<{ url: string; mimeType: string | null }>;
  previewImage: {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;
} | null {
  const reference = field?.reference;
  if (!reference) {
    return null;
  }

  const sources: Array<{ url: string; mimeType: string | null }> = [];
  for (const source of reference.sources ?? []) {
    const url = source?.url?.trim();
    if (url) {
      sources.push({ url, mimeType: source?.mimeType ?? null });
    }
  }
  if (sources.length === 0) {
    return null;
  }

  const previewUrl = reference.previewImage?.url?.trim();
  const previewImage = previewUrl
    ? {
        url: previewUrl,
        altText: reference.previewImage?.altText ?? null,
        width: reference.previewImage?.width ?? null,
        height: reference.previewImage?.height ?? null,
      }
    : null;

  return { sources, previewImage };
}
