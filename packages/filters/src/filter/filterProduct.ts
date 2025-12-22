import type {Product} from '../types/product.js';
import type {FilterCriteria} from '../types/filterCriteria.js';
import {getProductMinPrice} from '../price/getProductMinPrice.js';

/**
 * Checks if a single product matches filter criteria.
 * More efficient than applyFilters for single product checks.
 *
 * @param product - Product to check
 * @param criteria - Filter criteria
 * @returns Whether the product matches all criteria
 *
 * @example
 * ```ts
 * const matches = filterProduct(product, {
 *   priceRange: { min: 10, max: 100 },
 *   availability: { inStock: true },
 * });
 * ```
 */
export function filterProduct(
  product: Product,
  criteria: FilterCriteria,
): boolean {
  // Price filter
  if (criteria.priceRange) {
    const productMinPrice = getProductMinPrice(product);

    if (productMinPrice === undefined) {
      return false;
    }

    if (
      criteria.priceRange.min !== undefined &&
      productMinPrice < criteria.priceRange.min
    ) {
      return false;
    }

    if (
      criteria.priceRange.max !== undefined &&
      productMinPrice > criteria.priceRange.max
    ) {
      return false;
    }
  }

  // Availability filter
  if (criteria.availability) {
    const {inStock, outOfStock} = criteria.availability;

    // If no criteria or both true, skip filter
    if ((!inStock && !outOfStock) || (inStock && outOfStock)) {
      // No filtering needed
    } else {
      const hasAvailableVariant =
        product.variants?.nodes?.some(
          (variant) => variant.availableForSale === true,
        ) ?? false;

      const isAvailable =
        product.availableForSale === true || hasAvailableVariant;

      if (inStock && !isAvailable) {
        return false;
      }

      if (outOfStock && isAvailable) {
        return false;
      }
    }
  }

  // Tags filter
  if (criteria.tags && criteria.tags.length > 0) {
    const productTags = product.tags ?? [];
    const hasMatchingTag = criteria.tags.some((tag) =>
      productTags.includes(tag),
    );
    if (!hasMatchingTag) {
      return false;
    }
  }

  // Options filter
  if (criteria.options && Object.keys(criteria.options).length > 0) {
    const productOptions = product.options ?? [];
    const matchesAllOptions = Object.entries(criteria.options).every(
      ([name, value]) =>
        productOptions.some(
          (option) => option.name === name && option.value === value,
        ),
    );
    if (!matchesAllOptions) {
      return false;
    }
  }

  return true;
}

