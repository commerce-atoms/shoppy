/**
 * Completes OpenGraph and Twitter metadata from the page's own fields and
 * site-wide defaults.
 *
 * The `build*Meta` builders only emit OpenGraph / Twitter blocks when the
 * page has images. This fills both blocks for every page: titles,
 * descriptions and URLs fall back to the page's own values, and the image
 * falls back to `defaults.image`. Values already present are never
 * overwritten. Input is not mutated.
 *
 * @param meta - Output of any `build*Meta` builder
 * @param defaults - Site-wide fallbacks
 * @returns New meta object with `openGraph` and `twitter` populated
 *
 * @example
 * ```ts
 * const meta = withMetaDefaults(buildPageMeta({title: 'About'}), {
 *   image: {url: 'https://example.com/og-default.jpg', alt: 'My Brand'},
 * });
 * // meta.openGraph.images → [{url: '…/og-default.jpg', alt: 'My Brand'}]
 * // meta.twitter.card → 'summary_large_image'
 * ```
 */
import type {MetaDefaults, MetaOutput} from '../types/meta.js';

export function withMetaDefaults(
  meta: MetaOutput,
  defaults: MetaDefaults = {},
): MetaOutput {
  const pageImages = meta.openGraph?.images?.filter((img) => img.url);
  const images =
    pageImages && pageImages.length > 0
      ? pageImages
      : defaults.image?.url
        ? [defaults.image]
        : [];

  const openGraph: NonNullable<MetaOutput['openGraph']> = {
    title: meta.openGraph?.title ?? meta.title,
  };
  const ogDescription = meta.openGraph?.description ?? meta.description;
  if (ogDescription) {
    openGraph.description = ogDescription;
  }
  const ogUrl = meta.openGraph?.url ?? meta.canonicalUrl;
  if (ogUrl) {
    openGraph.url = ogUrl;
  }
  if (images.length > 0) {
    openGraph.images = images.map((img) => ({...img}));
  }

  const twitterImages =
    meta.twitter?.images && meta.twitter.images.length > 0
      ? meta.twitter.images
      : images.map((img) => img.url);

  const twitter: NonNullable<MetaOutput['twitter']> = {
    card:
      meta.twitter?.card ??
      (twitterImages.length > 0 ? 'summary_large_image' : 'summary'),
    title: meta.twitter?.title ?? openGraph.title,
  };
  const twitterDescription = meta.twitter?.description ?? ogDescription;
  if (twitterDescription) {
    twitter.description = twitterDescription;
  }
  if (twitterImages.length > 0) {
    twitter.images = [...twitterImages];
  }

  return {...meta, openGraph, twitter};
}
