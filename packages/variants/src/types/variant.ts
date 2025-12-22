import type {SelectedOption} from './selectedOption.js';

/**
 * Minimal product option shape for variant operations.
 */
export interface ProductOptionLike {
  /**
   * Option name (e.g., "Color", "Size").
   */
  name: string;

  /**
   * Available option values.
   */
  optionValues: Array<{name: string; [key: string]: unknown}>;

  [key: string]: unknown;
}

/**
 * Minimal image shape for variant operations.
 */
export interface ImageLike {
  /**
   * Image URL.
   */
  url: string;

  /**
   * Alt text for accessibility.
   */
  altText?: string | null;

  /**
   * Image width in pixels.
   */
  width?: number;

  /**
   * Image height in pixels.
   */
  height?: number;

  [key: string]: unknown;
}

/**
 * Minimal variant shape for variant operations.
 * Uses structural typing to accept Shopify variants and preserve caller's type.
 */
export interface VariantLike {
  /**
   * Variant ID.
   */
  id: string;

  /**
   * Whether the variant is available for sale.
   */
  availableForSale: boolean;

  /**
   * Selected options for this variant.
   */
  selectedOptions: SelectedOption[];

  /**
   * Variant price.
   */
  price: {
    amount: string;
    currencyCode: string;
  };

  [key: string]: unknown;
}
