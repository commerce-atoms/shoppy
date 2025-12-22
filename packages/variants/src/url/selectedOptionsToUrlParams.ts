import type {SelectedOption} from '../types/selectedOption.js';

/**
 * Converts selected options to URL search parameters.
 *
 * Use case: Update URL when user changes variant selection (for sharing/bookmarking).
 *
 * @param selectedOptions - The options to convert
 * @param optionKeys - Optional list to order/filter which options to include
 * @returns URLSearchParams ready to use
 *
 * @example
 * ```ts
 * const params = selectedOptionsToUrlParams([
 *   { name: 'Color', value: 'Red' },
 *   { name: 'Size', value: 'Large' },
 * ]);
 *
 * // Use with React Router
 * setSearchParams(params);
 * ```
 */
export const selectedOptionsToUrlParams = (
  selectedOptions: SelectedOption[],
  optionKeys?: string[],
): URLSearchParams => {
  const params = new URLSearchParams();

  // If optionKeys provided, use it to determine order
  const optionsToAdd = optionKeys
    ? optionKeys
        .map((key) => selectedOptions.find((opt) => opt.name === key))
        .filter((opt): opt is SelectedOption => opt !== undefined)
    : selectedOptions;

  for (const option of optionsToAdd) {
    if (option.value && option.value.trim() !== '') {
      params.set(option.name, option.value);
    }
  }

  return params;
};

