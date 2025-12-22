/**
 * JSON-serializable value type for JSON-LD.
 * Ensures all values can be safely serialized to JSON.
 */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [k: string]: JsonLdValue };

/**
 * SEO meta output structure.
 * Used by meta builder functions to return consistent SEO data.
 */
export interface MetaOutput {
  /**
   * Page title (used in <title> tag).
   */
  title: string;

  /**
   * Meta description.
   */
  description?: string;

  /**
   * Canonical URL for the page.
   */
  canonicalUrl?: string;

  /**
   * OpenGraph metadata for social sharing.
   */
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{ url: string; alt?: string }>;
  };

  /**
   * Twitter card metadata.
   */
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    images?: string[];
  };

  /**
   * JSON-LD structured data.
   */
  jsonLd?: JsonLdValue;
}
