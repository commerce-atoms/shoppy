/**
 * Builds JSON-LD schema for a video.
 *
 * Creates a VideoObject schema.org object. `name`, `thumbnailUrl` and
 * `uploadDate` are required by search engines for video rich results, so
 * the builder returns undefined when any of them is missing.
 *
 * @param input - Video data
 * @returns JSON-LD object, or undefined if a required field is missing
 *
 * @example
 * ```ts
 * const jsonLd = buildVideoJsonLd({
 *   name: 'My Short Film',
 *   thumbnailUrl: 'https://example.com/poster.jpg',
 *   uploadDate: '2026-03-01',
 *   embedUrl: 'https://www.youtube.com/embed/abc123',
 * });
 * ```
 */
import { normalizeText } from "../normalize/normalizeText.js";
import type { JsonLdValue } from "../types/meta.js";
import type { VideoJsonLdInput } from "../types/video.js";

export function buildVideoJsonLd(
  input: VideoJsonLdInput
): JsonLdValue | undefined {
  const name = normalizeText(input.name);
  const uploadDate = normalizeText(input.uploadDate);
  const rawThumbnails = Array.isArray(input.thumbnailUrl)
    ? input.thumbnailUrl
    : [input.thumbnailUrl];
  const thumbnailUrl = [
    ...new Set(
      rawThumbnails
        .map((url) => normalizeText(url))
        .filter((url): url is string => Boolean(url))
    ),
  ];

  if (!name || !uploadDate || thumbnailUrl.length === 0) {
    return undefined;
  }

  const jsonLd: { [k: string]: JsonLdValue } = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    thumbnailUrl,
    uploadDate,
  };

  const optional = {
    description: input.description,
    duration: input.duration,
    contentUrl: input.contentUrl,
    embedUrl: input.embedUrl,
    url: input.url,
  };
  for (const [key, value] of Object.entries(optional)) {
    const text = normalizeText(value);
    if (text) {
      jsonLd[key] = text;
    }
  }

  return jsonLd;
}
