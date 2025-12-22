import type {Product} from '../types/product.js';

/**
 * Filters products by selected options.
 * Product must match all specified option name-value pairs.
 *
 * @param products - Array of products to filter
 * @param options - Object mapping option names to values
 * @returns Filtered array of products
 *
 * @example
 * ```ts
 * const filtered = filterByOptions(products, { color: 'red', size: 'large' });
 * ```
 */
export function filterByOptions(
  products: Product[],
  options: Record<string, string>,
): Product[] {
  if (!options || Object.keys(options).length === 0) {
    return products;
  }

  return products.filter((product) => {
    const productOptions = product.options ?? [];
    return Object.entries(options).every(([name, value]) =>
      productOptions.some(
        (option) =>
          option.name === name && option.value !== undefined && option.value === value,
      ),
    );
  });
}

