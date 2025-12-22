import type {VariantLike} from '../types/variant.js';
import type {SelectedOption} from '../types/selectedOption.js';
import type {FindVariantOptions} from '../types/find.js';
import {normalizeSelectedOptions} from '../normalize/normalizeSelectedOptions.js';

/**
 * Minimal product shape for findVariant.
 * Uses generics to preserve caller's variant type.
 */
interface ProductWithOptionsAndVariants<V extends VariantLike> {
  options: Array<{name: string}>;
  variants: {
    nodes: V[];
  };
}

/**
 * Result of finding a variant, generic over the variant type.
 */
export type FindVariantResult<V extends VariantLike> =
  | {
      found: true;
      variant: V;
      reason: 'EXACT_MATCH';
    }
  | {
      found: false;
      variant: null;
      reason: 'NO_MATCH' | 'INCOMPLETE' | 'INVALID_OPTION';
    };

/**
 * Finds a variant by selected options.
 *
 * Use case: Convert user's option selection into a specific variant.
 *
 * @param product - The product to search
 * @param selectedOptions - The options selected by the user
 * @param options - Search options
 * @returns Result with variant if found, or reason why not found
 *
 * @example
 * ```ts
 * const result = findVariant(product, [
 *   { name: 'Color', value: 'Red' },
 *   { name: 'Size', value: 'Large' },
 * ]);
 *
 * if (result.found) {
 *   console.log('Variant ID:', result.variant.id);
 * } else {
 *   console.log('Not found:', result.reason);
 * }
 * ```
 */
export const findVariant = <V extends VariantLike>(
  product: ProductWithOptionsAndVariants<V>,
  selectedOptions: SelectedOption[],
  options: FindVariantOptions = {},
): FindVariantResult<V> => {
  const {normalize = false, normalizeOptions} = options;

  // Normalize input if requested
  const searchOptions = normalize
    ? normalizeSelectedOptions(selectedOptions, normalizeOptions)
    : selectedOptions;

  // Check if selection is complete
  const requiredOptionCount = product.options.length;
  if (searchOptions.length < requiredOptionCount) {
    return {
      found: false,
      variant: null,
      reason: 'INCOMPLETE',
    };
  }

  // Check if all selected options are valid
  const validOptionNames = new Set(product.options.map((opt) => opt.name));
  const invalidOption = searchOptions.find(
    (opt) => !validOptionNames.has(opt.name),
  );
  if (invalidOption) {
    return {
      found: false,
      variant: null,
      reason: 'INVALID_OPTION',
    };
  }

  // Find matching variant
  const variant = product.variants.nodes.find((v) => {
    const variantOptions = normalize
      ? normalizeSelectedOptions(v.selectedOptions, normalizeOptions)
      : v.selectedOptions;

    // Must match all selected options
    return searchOptions.every((searchOpt) => {
      const variantOpt = variantOptions.find((vo) => vo.name === searchOpt.name);
      return variantOpt && variantOpt.value === searchOpt.value;
    });
  });

  if (variant) {
    return {
      found: true,
      variant,
      reason: 'EXACT_MATCH',
    };
  }

  return {
    found: false,
    variant: null,
    reason: 'NO_MATCH',
  };
};

