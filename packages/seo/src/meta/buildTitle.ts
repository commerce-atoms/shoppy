/**
 * Builds a document `<title>` from page segments, most specific first,
 * followed by the site name.
 *
 * Segments are trimmed; empty ones and repeats of the previous segment
 * (case-insensitive) are dropped. The site name is appended unless it is
 * already the last segment, so the homepage can pass just the site name.
 *
 * @param segments - Title parts, most specific first (e.g. item, category)
 * @param options - Site name and separator (default `' | '`)
 * @returns The joined title, or the site name (or `''`) when nothing remains
 *
 * @example
 * ```ts
 * buildTitle(['Wolf Study 01', 'Dark Red', 'Shop'], {siteName: 'My Brand'});
 * // → 'Wolf Study 01 | Dark Red | Shop | My Brand'
 * ```
 */
import {normalizeText} from '../normalize/normalizeText.js';
import type {TitleOptions} from '../types/meta.js';

export function buildTitle(
  segments: ReadonlyArray<string | null | undefined>,
  options: TitleOptions = {},
): string {
  const separator = options.separator ?? ' | ';
  const siteName = normalizeText(options.siteName);

  const parts: string[] = [];
  for (const segment of [...segments, siteName]) {
    const text = normalizeText(segment);
    if (!text) continue;
    const previous = parts[parts.length - 1];
    if (previous && previous.toLowerCase() === text.toLowerCase()) continue;
    parts.push(text);
  }

  return parts.join(separator);
}
