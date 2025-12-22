import type { Product } from "../types/product.js";
import { getProductMinPrice } from "../price/getProductMinPrice.js";

/**
 * Filters products by price range.
 *
 * @param products - Array of products to filter
 * @param range - Price range with optional min and max
 * @returns Filtered array of products
 *
 * @example
 * ```ts
 * const filtered = filterByPriceRange(products, { min: 10, max: 100 });
 * ```
 */
export function filterByPriceRange(
  products: Product[],
  range: { min?: number; max?: number }
): Product[] {
  if (range.min === undefined && range.max === undefined) {
    return products;
  }

  return products.filter((product) => {
    const productMinPrice = getProductMinPrice(product);

    if (productMinPrice === undefined) {
      return false;
    }

    if (range.min !== undefined && productMinPrice < range.min) {
      return false;
    }

    if (range.max !== undefined && productMinPrice > range.max) {
      return false;
    }

    return true;
  });
}
