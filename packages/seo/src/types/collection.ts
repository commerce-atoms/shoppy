/**
 * Minimal collection shape for SEO meta building.
 * Uses structural typing to accept Shopify collections.
 */
export interface CollectionLike {
  /**
   * Collection title.
   */
  title?: string | null;

  /**
   * Collection handle (URL slug).
   */
  handle?: string | null;

  /**
   * Plain text description.
   */
  description?: string | null;

  /**
   * HTML description.
   */
  descriptionHtml?: string | null;

  /**
   * SEO-specific overrides.
   */
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;

  /**
   * Collection image.
   */
  image?: {
    url?: string | null;
    altText?: string | null;
  } | null;
}
