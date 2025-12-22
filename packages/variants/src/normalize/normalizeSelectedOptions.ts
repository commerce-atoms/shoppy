import type {SelectedOption} from '../types/selectedOption.js';
import type {NormalizeSelectedOptionsOptions} from '../types/normalize.js';

/**
 * Normalizes selected options for consistent matching.
 *
 * Use case: Ensure variant lookups are stable regardless of casing,
 * whitespace, or ordering inconsistencies.
 *
 * @param selectedOptions - The options to normalize
 * @param options - Normalization strategy options
 * @returns Normalized selected options
 *
 * @example
 * ```ts
 * const normalized = normalizeSelectedOptions(
 *   [{ name: ' Color ', value: 'RED' }],
 *   { trim: true, casing: 'lowercase', sort: true }
 * );
 * // Result: [{ name: 'color', value: 'red' }]
 * ```
 */
export const normalizeSelectedOptions = (
  selectedOptions: SelectedOption[],
  options: NormalizeSelectedOptionsOptions = {},
): SelectedOption[] => {
  const {trim = false, casing = 'none', sort = false} = options;

  let normalized = selectedOptions.map((opt) => {
    let {name, value} = opt;

    // Trim whitespace
    if (trim) {
      name = name.trim();
      value = value.trim();
    }

    // Apply casing
    if (casing === 'lowercase') {
      name = name.toLowerCase();
      value = value.toLowerCase();
    } else if (casing === 'uppercase') {
      name = name.toUpperCase();
      value = value.toUpperCase();
    }

    return {name, value};
  });

  // Sort by name for stable ordering
  if (sort) {
    normalized = normalized.sort((a, b) => a.name.localeCompare(b.name));
  }

  return normalized;
};

