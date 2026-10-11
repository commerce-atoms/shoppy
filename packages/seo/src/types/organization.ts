/**
 * Input for building Organization JSON-LD.
 * Typically emitted once, on the homepage.
 */
export interface OrganizationJsonLdInput {
  /**
   * Organization / brand name.
   */
  name: string;

  /**
   * Canonical site URL.
   */
  url?: string | null;

  /**
   * Absolute logo URL.
   */
  logo?: string | null;

  /**
   * Short description of the organization.
   */
  description?: string | null;

  /**
   * Profile URLs on other sites (social networks, link hubs).
   * Empty values are dropped and duplicates removed.
   */
  sameAs?: Array<string | null | undefined>;
}
