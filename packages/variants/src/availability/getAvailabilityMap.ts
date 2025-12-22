import type {VariantLike} from '../types/variant.js';
import type {SelectedOption} from '../types/selectedOption.js';
import type {AvailabilityMap, GetAvailabilityMapOptions} from '../types/availability.js';
import {normalizeSelectedOptions} from '../normalize/normalizeSelectedOptions.js';

/**
 * Minimal product shape for getAvailabilityMap.
 */
interface ProductWithVariants {
  variants: {
    nodes: VariantLike[];
  };
}

/**
 * Computes which option values are still available given a partial selection.
 *
 * Use case: Disable/gray out options in a variant selector that would lead
 * to no valid variant.
 *
 * @param product - The product to analyze
 * @param partialSelection - Options already selected by the user
 * @param options - Availability computation options
 * @returns Map of option name → set of available values
 *
 * @example
 * ```ts
 * // User has selected "Color: Red"
 * const availabilityMap = getAvailabilityMap(product, [
 *   { name: 'Color', value: 'Red' },
 * ]);
 *
 * // Check if "Size: Large" is available
 * const availableSizes = availabilityMap.get('Size');
 * const isLargeAvailable = availableSizes?.has('Large');
 * ```
 */
export const getAvailabilityMap = (
  product: ProductWithVariants,
  partialSelection: SelectedOption[] = [],
  options: GetAvailabilityMapOptions = {},
): AvailabilityMap => {
  const {onlyAvailable = true, normalize = false, normalizeOptions} = options;

  // Normalize partial selection if requested
  const searchOptions = normalize
    ? normalizeSelectedOptions(partialSelection, normalizeOptions)
    : partialSelection;

  // Filter variants based on availability preference
  let variants = product.variants.nodes;
  if (onlyAvailable) {
    variants = variants.filter((v) => v.availableForSale);
  }

  // Filter variants that match the partial selection
  if (searchOptions.length > 0) {
    variants = variants.filter((variant) => {
      const variantOptions = normalize
        ? normalizeSelectedOptions(variant.selectedOptions, normalizeOptions)
        : variant.selectedOptions;

      return searchOptions.every((searchOpt) => {
        const variantOpt = variantOptions.find(
          (vo) => vo.name === searchOpt.name,
        );
        return variantOpt && variantOpt.value === searchOpt.value;
      });
    });
  }

  // Build availability map from remaining variants
  const availabilityMap: AvailabilityMap = new Map();

  for (const variant of variants) {
    const variantOptions = normalize
      ? normalizeSelectedOptions(variant.selectedOptions, normalizeOptions)
      : variant.selectedOptions;

    for (const option of variantOptions) {
      if (!availabilityMap.has(option.name)) {
        availabilityMap.set(option.name, new Set());
      }
      availabilityMap.get(option.name)!.add(option.value);
    }
  }

  return availabilityMap;
};
