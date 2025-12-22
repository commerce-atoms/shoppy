import type {CollectionLike} from '../types/collection.js';
import type {MetaOutput} from '../types/meta.js';
import {normalizeText} from '../normalize/normalizeText.js';
import {stripHtml} from '../normalize/stripHtml.js';
import {buildCollectionJsonLd} from '../jsonld/buildCollectionJsonLd.js';

export interface BuildCollectionMetaOptions {
  canonicalUrl?: string;
  siteName?: string;
}

/**
 * Builds SEO meta output for a collection page.
 *
 * Extracts title, description, and image from collection data with fallback
 * priority. Generates conservative JSON-LD schema when sufficient data exists.
 *
 * @param collection - Collection data
 * @param options - Additional options for canonical URL
 * @returns Normalized meta output object
 *
 * @example
 * ```ts
 * const meta = buildCollectionMeta(collection, {
 *   canonicalUrl: 'https://example.com/collections/shoes'
 * });
 * ```
 */
export function buildCollectionMeta(
  collection: CollectionLike | null | undefined,
  options?: BuildCollectionMetaOptions,
): MetaOutput {
  if (!collection) {
    return {title: 'Collection'};
  }

  // Title priority: seo.title -> title -> fallback
  const title =
    normalizeText(collection.seo?.title) ||
    normalizeText(collection.title) ||
    'Collection';

  // Description priority: seo.description -> description -> stripped descriptionHtml
  let description: string | undefined;
  if (collection.seo?.description) {
    description = normalizeText(collection.seo.description);
  } else if (collection.description) {
    description = normalizeText(collection.description);
  } else if (collection.descriptionHtml) {
    const stripped = stripHtml(collection.descriptionHtml);
    description = normalizeText(stripped);
  }

  // Image selection
  const images: Array<{url: string; alt?: string}> = [];
  if (collection.image?.url) {
    images.push({
      url: collection.image.url,
      alt: collection.image.altText || undefined,
    });
  }

  const output: MetaOutput = {
    title,
  };

  if (description) {
    output.description = description;
  }

  if (options?.canonicalUrl) {
    output.canonicalUrl = options.canonicalUrl;
  }

  // Build OpenGraph and Twitter if images exist
  if (images.length > 0) {
    output.openGraph = {
      title,
      url: options?.canonicalUrl,
    };

    if (description) {
      output.openGraph.description = description;
    }

    output.openGraph.images = images;

    output.twitter = {
      card: 'summary_large_image',
      title,
    };

    if (description) {
      output.twitter.description = description;
    }

    output.twitter.images = images.map((img) => img.url);
  }

  // Build JSON-LD only if title exists (not fallback)
  // Conservative: basic CollectionPage schema only
  if (title !== 'Collection') {
    const jsonLd = buildCollectionJsonLd(
      title,
      description,
      images.map((img) => img.url),
    );

    if (jsonLd) {
      output.jsonLd = jsonLd;
    }
  }

  return output;
}

