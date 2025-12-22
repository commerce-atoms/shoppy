/**
 * Minimal metaobject field shape for extraction operations.
 */
export interface MetaobjectFieldLike {
  /**
   * Field key.
   */
  key?: string | null;

  /**
   * Field value as string.
   */
  value?: string | null;

  /**
   * Reference to another resource (for reference types).
   */
  reference?: unknown | null;
}

/**
 * Minimal metaobject shape for extraction operations.
 * Uses structural typing to accept Shopify metaobjects.
 */
export interface MetaobjectLike {
  /**
   * Array of fields on this metaobject.
   */
  fields?: Array<MetaobjectFieldLike | null> | null;
}
