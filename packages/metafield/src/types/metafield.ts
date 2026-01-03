/**
 * Minimal metafield shape for extraction operations.
 * Uses structural typing to accept Shopify metafields.
 */
export interface MetafieldLike {
  /**
   * Metafield namespace (e.g., "custom", "my_app").
   */
  namespace?: string | null;

  /**
   * Metafield key within the namespace.
   */
  key?: string | null;

  /**
   * Metafield value as string.
   */
  value?: string | null;

  /**
   * Metafield type (e.g., "single_line_text_field", "json").
   */
  type?: string | null;

  /**
   * Reference to another resource (for reference types).
   */
  reference?: unknown | null;
}

/**
 * Object that owns metafields (product, collection, etc.).
 */
export interface MetafieldOwnerLike {
  /**
   * Array of metafields on this object.
   */
  metafields?: ReadonlyArray<MetafieldLike | null> | null;
}
