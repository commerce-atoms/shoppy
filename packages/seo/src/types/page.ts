/**
 * Input for building generic page meta.
 * Used for non-product, non-collection pages.
 */
export interface PageMetaInput {
  /**
   * Page title.
   */
  title: string;

  /**
   * Meta description.
   */
  description?: string;

  /**
   * Canonical URL.
   */
  canonicalUrl?: string;

  /**
   * Page images for social sharing.
   */
  images?: Array<{url: string; alt?: string}>;
}
