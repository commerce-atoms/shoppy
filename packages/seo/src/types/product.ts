/**
 * Minimal product shape for SEO meta building.
 * Uses structural typing to accept Shopify products.
 */
export interface ProductLike {
  /**
   * Product title.
   */
  title?: string | null;

  /**
   * Product handle (URL slug).
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
   * Featured product image.
   */
  featuredImage?: {
    url?: string | null;
    altText?: string | null;
  } | null;

  /**
   * All product images.
   */
  images?: {
    nodes?: Array<{
      url?: string | null;
      altText?: string | null;
    } | null> | null;
  } | null;

  /**
   * Product vendor/brand.
   */
  vendor?: string | null;
}
