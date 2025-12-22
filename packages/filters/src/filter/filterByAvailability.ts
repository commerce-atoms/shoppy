import type {Product} from '../types/product.js';

interface AvailabilityCriteria {
  inStock?: boolean;
  outOfStock?: boolean;
}

/**
 * Filters products by availability.
 *
 * @param products - Array of products to filter
 * @param criteria - Availability criteria with inStock/outOfStock flags
 * @returns Filtered array of products
 *
 * @example
 * ```ts
 * const filtered = filterByAvailability(products, {inStock: true});
 * ```
 */
export function filterByAvailability(
  products: Product[],
  criteria: AvailabilityCriteria,
): Product[] {
  // If no criteria or both true, return all
  if (
    (!criteria.inStock && !criteria.outOfStock) ||
    (criteria.inStock && criteria.outOfStock)
  ) {
    return products;
  }

  return products.filter((product) => {
    // Check if product has available variant
    const hasAvailableVariant =
      product.variants?.nodes?.some(
        (variant) => variant.availableForSale === true,
      ) ?? false;

    // Or check direct availableForSale property
    const isAvailable =
      product.availableForSale === true || hasAvailableVariant;

    return criteria.inStock ? isAvailable : !isAvailable;
  });
}

