import type {ProductLike} from '../types/product.js';
import type {MetaOutput} from '../types/meta.js';
import {normalizeText} from '../normalize/normalizeText.js';
import {stripHtml} from '../normalize/stripHtml.js';
import {pickSeoImage} from '../normalize/pickSeoImage.js';
import {buildProductJsonLd} from '../jsonld/buildProductJsonLd.js';

export interface BuildProductMetaOptions {
  canonicalUrl?: string;
  siteName?: string;
  brandName?: string;
}

/**
 * Builds SEO meta output for a product page.
 *
 * Extracts title, description, and images from product data with fallback
 * priority. Generates JSON-LD schema when sufficient data is available.
 *
 * @param product - Product data
 * @param options - Additional options for canonical URL and branding
 * @returns Normalized meta output object
 *
 * @example
 * ```ts
 * const meta = buildProductMeta(product, {
 *   canonicalUrl: 'https://example.com/products/shoe',
 *   brandName: 'My Brand'
 * });
 * ```
 */
export function buildProductMeta(
  product: ProductLike | null | undefined,
  options?: BuildProductMetaOptions,
): MetaOutput {
  if (!product) {
    return {title: 'Product'};
  }

  // Title priority: seo.title -> title -> fallback
  const title =
    normalizeText(product.seo?.title) ||
    normalizeText(product.title) ||
    'Product';

  // Description priority: seo.description -> description -> stripped descriptionHtml
  let description: string | undefined;
  if (product.seo?.description) {
    description = normalizeText(product.seo.description);
  } else if (product.description) {
    description = normalizeText(product.description);
  } else if (product.descriptionHtml) {
    const stripped = stripHtml(product.descriptionHtml);
    description = normalizeText(stripped);
  }

  // Image selection: featuredImage -> first images.nodes
  const images: Array<{url: string; alt?: string}> = [];
  if (product.featuredImage?.url) {
    images.push({
      url: product.featuredImage.url,
      alt: product.featuredImage.altText || undefined,
    });
  } else if (product.images?.nodes) {
    const picked = pickSeoImage(product.images.nodes);
    if (picked) {
      images.push(picked);
    }
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
  if (title !== 'Product') {
    const brandName = options?.brandName || product.vendor || undefined;
    const jsonLd = buildProductJsonLd(
      title,
      description,
      images.map((img) => img.url),
      brandName,
    );

    if (jsonLd) {
      output.jsonLd = jsonLd;
    }
  }

  return output;
}

