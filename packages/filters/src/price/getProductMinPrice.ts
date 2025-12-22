import type { Product } from "../types/product.js";

/**
 * Extracts the minimum price from a product.
 * Tries priceRange first, then falls back to variant price.
 *
 * @param product - Product to extract price from
 * @returns Minimum price as number, or undefined if not available/invalid
 */
export function getProductMinPrice(product: Product): number | undefined {
  const priceString =
    product.priceRange?.minVariantPrice?.amount ??
    product.selectedOrFirstAvailableVariant?.price?.amount;

  if (!priceString) {
    return undefined;
  }

  const price = parseFloat(priceString);

  return isNaN(price) ? undefined : price;
}
