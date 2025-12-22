/**
 * Minimal product type for filtering operations.
 * Compatible with Shopify product fragments.
 * Uses null | undefined unions to match Shopify's Maybe<T> type.
 */
export interface Product {
  /**
   * Product tags array
   */
  tags?: string[] | null;

  /**
   * Whether the product is available for sale
   */
  availableForSale?: boolean | null;

  /**
   * Price range information
   */
  priceRange?: {
    minVariantPrice?: {
      amount: string;
    } | null;
  } | null;

  /**
   * Selected or first available variant price
   */
  selectedOrFirstAvailableVariant?: {
    price?: {
      amount: string;
    } | null;
  } | null;

  /**
   * Product variants array
   */
  variants?: {
    nodes?: Array<{
      availableForSale?: boolean | null;
    }> | null;
  } | null;

  /**
   * Product options - accepts various option structures
   * Shopify uses {name, optionValues[]}, some apps use {name, value}
   */
  options?: Array<{
    name: string;
    value?: string;
    optionValues?: unknown;
  }> | null;
}
