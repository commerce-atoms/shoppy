/**
 * Builds JSON-LD schema for the organization behind a site.
 *
 * Creates an Organization schema.org object. `sameAs` links the brand to its
 * social profiles so search engines can associate them.
 *
 * @param input - Organization data (name required)
 * @returns JSON-LD object, or undefined if name is missing
 *
 * @example
 * ```ts
 * const jsonLd = buildOrganizationJsonLd({
 *   name: 'My Brand',
 *   url: 'https://example.com',
 *   logo: 'https://example.com/logo.png',
 *   sameAs: ['https://www.instagram.com/mybrand'],
 * });
 * ```
 */
import {normalizeText} from '../normalize/normalizeText.js';
import type {JsonLdValue} from '../types/meta.js';
import type {OrganizationJsonLdInput} from '../types/organization.js';

export function buildOrganizationJsonLd(
  input: OrganizationJsonLdInput,
): JsonLdValue | undefined {
  const name = normalizeText(input.name);
  if (!name) {
    return undefined;
  }

  const jsonLd: {[k: string]: JsonLdValue} = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
  };

  const url = normalizeText(input.url);
  if (url) {
    jsonLd.url = url;
  }

  const logo = normalizeText(input.logo);
  if (logo) {
    jsonLd.logo = logo;
  }

  const description = normalizeText(input.description);
  if (description) {
    jsonLd.description = description;
  }

  const sameAs = [
    ...new Set(
      (input.sameAs ?? [])
        .map((link) => normalizeText(link))
        .filter((link): link is string => Boolean(link)),
    ),
  ];
  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return jsonLd;
}
