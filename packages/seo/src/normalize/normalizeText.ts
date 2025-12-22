/**
 * Normalizes text by trimming whitespace.
 *
 * Returns undefined for empty or whitespace-only strings.
 *
 * @param text - The text to normalize
 * @returns Trimmed text, or undefined if empty
 *
 * @example
 * ```ts
 * const normalized = normalizeText('  Hello  ');
 * // Returns: "Hello"
 *
 * const normalized = normalizeText('   ');
 * // Returns: undefined
 * ```
 */
export function normalizeText(text: string | null | undefined): string | undefined {
  if (!text) {
    return undefined;
  }
  const trimmed = text.trim();
  return trimmed === '' ? undefined : trimmed;
}

