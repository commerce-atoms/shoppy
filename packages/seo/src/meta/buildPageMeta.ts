import type {PageMetaInput} from '../types/page.js';
import type {MetaOutput} from '../types/meta.js';
import {normalizeText} from '../normalize/normalizeText.js';

/**
 * Builds SEO meta output for a generic page.
 *
 * Creates a normalized meta object with title, description, canonical URL,
 * and optional OpenGraph/Twitter cards when images are provided.
 *
 * @param input - Page meta input data
 * @returns Normalized meta output object
 *
 * @example
 * ```ts
 * const meta = buildPageMeta({
 *   title: 'About Us',
 *   description: 'Learn about our company',
 *   canonicalUrl: 'https://example.com/about',
 *   images: [{ url: 'https://example.com/og.jpg', alt: 'About' }]
 * });
 * ```
 */
export function buildPageMeta(input: PageMetaInput): MetaOutput {
  const title = normalizeText(input.title) || 'Page';
  const description = normalizeText(input.description);

  const output: MetaOutput = {
    title,
  };

  if (description) {
    output.description = description;
  }

  if (input.canonicalUrl) {
    output.canonicalUrl = input.canonicalUrl;
  }

  // Build OpenGraph and Twitter only if images exist
  const validImages = input.images?.filter(
    (img) => img?.url && normalizeText(img.url),
  );

  if (validImages && validImages.length > 0) {
    output.openGraph = {
      title,
      url: input.canonicalUrl,
    };

    if (description) {
      output.openGraph.description = description;
    }

    output.openGraph.images = validImages.map((img) => ({
      url: normalizeText(img.url!)!,
      alt: img.alt,
    }));

    output.twitter = {
      card: validImages.length > 0 ? 'summary_large_image' : 'summary',
      title,
    };

    if (description) {
      output.twitter.description = description;
    }

    output.twitter.images = validImages.map((img) => normalizeText(img.url!)!);
  }

  return output;
}

