/**
 * Strips HTML tags from a string (basic implementation).
 *
 * Removes all HTML tags and trims whitespace. This is a simple regex-based
 * approach suitable for basic use cases. For complex HTML, consider a proper
 * HTML parser.
 *
 * @param html - The HTML string to strip
 * @returns Plain text with HTML tags removed
 *
 * @example
 * ```ts
 * const text = stripHtml('<p>Hello <strong>world</strong></p>');
 * // Returns: "Hello world"
 * ```
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

