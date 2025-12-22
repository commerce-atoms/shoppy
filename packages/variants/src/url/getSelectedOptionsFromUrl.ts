import type { SelectedOption } from "../types/selectedOption.js";

/**
 * Parses selected options from URL search parameters.
 *
 * Use case: Restore variant selection from URL on page load.
 *
 * When the same option name appears multiple times, the LAST value wins (deterministic).
 *
 * @param searchParams - URLSearchParams or Record<string, string | string[]>
 * @param optionKeys - Optional list of option names to filter/allowlist (recommended for stability with merchant-editable names)
 * @returns Array of selected options
 *
 * @example
 * ```ts
 * // URL: ?Color=Red&Size=Large
 * const options = getSelectedOptionsFromUrl(
 *   new URLSearchParams(window.location.search),
 *   ['Color', 'Size']
 * );
 * // Result: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'Large' }]
 * ```
 */
export const getSelectedOptionsFromUrl = (
  searchParams: URLSearchParams | Record<string, string | string[]>,
  optionKeys?: string[]
): SelectedOption[] => {
  const selectedOptions: SelectedOption[] = [];
  const seenKeys = new Map<string, number>(); // Track last index for each key

  // Convert to iterable entries
  if (searchParams instanceof URLSearchParams) {
    // For URLSearchParams, use getAll to get all values, then take the last
    // Deduplicate keys since keys() returns each occurrence
    const uniqueKeys = [...new Set(searchParams.keys())];
    for (const key of uniqueKeys) {
      // If optionKeys provided, only include valid keys
      if (optionKeys && !optionKeys.includes(key)) {
        continue;
      }

      // Get all values for this key and take the last one (last wins)
      const allValues = searchParams.getAll(key);
      if (allValues.length > 0) {
        const value = allValues[allValues.length - 1];

        // Skip empty values
        if (value && value.trim() !== "") {
          seenKeys.set(key, selectedOptions.length);
          selectedOptions.push({
            name: key,
            value: value,
          });
        }
      }
    }
  } else {
    // For Record, handle both string and string[] values
    for (const [key, valueOrArray] of Object.entries(searchParams)) {
      // If optionKeys provided, only include valid keys
      if (optionKeys && !optionKeys.includes(key)) {
        continue;
      }

      // Handle string[] - take last value (last wins)
      let value: string | undefined;
      if (Array.isArray(valueOrArray)) {
        if (valueOrArray.length === 0) {
          continue;
        }
        const lastItem = valueOrArray[valueOrArray.length - 1];
        value = typeof lastItem === "string" ? lastItem : undefined;
      } else {
        value = typeof valueOrArray === "string" ? valueOrArray : undefined;
      }

      // Skip empty or invalid values
      if (!value || value.trim() === "") {
        continue;
      }

      // Update or add the option (last wins)
      const existingIndex = seenKeys.get(key);
      if (existingIndex !== undefined) {
        selectedOptions[existingIndex] = { name: key, value };
      } else {
        seenKeys.set(key, selectedOptions.length);
        selectedOptions.push({ name: key, value });
      }
    }
  }

  return selectedOptions;
};
