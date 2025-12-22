import { filterByPriceRange } from "../filter/filterByPriceRange.js";
import { filterByAvailability } from "../filter/filterByAvailability.js";
import { filterByTags } from "../filter/filterByTags.js";
import { filterByOptions } from "../filter/filterByOptions.js";
import type { Product } from "../types/product.js";
import type { FilterCriteria } from "../types/filterCriteria.js";

/**
 * Applies multiple filters to a product array.
 * All specified filters are applied in sequence (AND logic).
 * - Tags use OR logic (product must have at least one tag)
 * - All other filters use AND logic (product must match all)
 *
 * @param products - Array of products to filter
 * @param criteria - Filter criteria object
 * @returns Filtered array of products (preserves input type)
 *
 * @example
 * ```ts
 * const filtered = applyFilters(products, {
 *   priceRange: { min: 10, max: 100 },
 *   availability: { inStock: true },
 *   tags: ['new', 'sale'], // OR logic: has 'new' OR 'sale'
 * });
 * ```
 */
export function applyFilters<T extends Product>(
  products: T[],
  criteria: FilterCriteria
): T[] {
  let result: T[] = products;

  if (criteria.priceRange) {
    result = filterByPriceRange(result, criteria.priceRange) as T[];
  }

  if (criteria.availability) {
    const {inStock, outOfStock} = criteria.availability;
    // Skip if no criteria or both true (no filtering needed)
    if ((inStock || outOfStock) && !(inStock && outOfStock)) {
      result = filterByAvailability(result, criteria.availability) as T[];
    }
  }

  if (criteria.tags && criteria.tags.length > 0) {
    result = filterByTags(result, criteria.tags) as T[];
  }

  if (criteria.options && Object.keys(criteria.options).length > 0) {
    result = filterByOptions(result, criteria.options) as T[];
  }

  return result;
}
