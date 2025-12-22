import type {VariantLike} from '../types/variant.js';
import type {SelectedOption} from '../types/selectedOption.js';
import {findVariant} from '../find/findVariant.js';

/**
 * Minimal product shape for isSelectionValid.
 */
interface ProductWithOptionsAndVariants {
  options: Array<{name: string}>;
  variants: {
    nodes: VariantLike[];
  };
}

/**
 * Checks if a selection is valid (leads to an existing variant).
 *
 * Use case: Validate user input before proceeding with add-to-cart.
 *
 * @param product - The product to validate against
 * @param selectedOptions - The options to validate
 * @returns True if selection is valid and complete
 *
 * @example
 * ```ts
 * const isValid = isSelectionValid(product, [
 *   { name: 'Color', value: 'Red' },
 *   { name: 'Size', value: 'Large' },
 * ]);
 *
 * if (!isValid) {
 *   alert('Please select a valid variant');
 * }
 * ```
 */
export const isSelectionValid = (
  product: ProductWithOptionsAndVariants,
  selectedOptions: SelectedOption[],
): boolean => {
  const result = findVariant(product, selectedOptions);
  return result.found;
};

