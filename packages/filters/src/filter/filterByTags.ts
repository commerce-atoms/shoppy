import type {Product} from '../types/product.js';

/**
 * Filters products by tags.
 * Uses OR logic: product must have at least one of the specified tags.
 *
 * @param products - Array of products to filter
 * @param tags - Array of tags to match (OR logic)
 * @returns Filtered array of products
 *
 * @example
 * ```ts
 * const filtered = filterByTags(products, ['new', 'sale']);
 * // Returns products that have 'new' OR 'sale' tag
 * ```
 */
export function filterByTags(
  products: Product[],
  tags: string[],
): Product[] {
  if (!tags || tags.length === 0) {
    return products;
  }

  return products.filter((product) => {
    const productTags = product.tags ?? [];
    return tags.some((tag) => productTags.includes(tag));
  });
}

