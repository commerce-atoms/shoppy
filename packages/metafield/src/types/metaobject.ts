/**
 * Minimal metaobject field shape for extraction operations.
 */
export interface MetaobjectFieldLike {
  /**
   * Field key.
   */
  key: string;

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
  fields?: ReadonlyArray<MetaobjectFieldLike | null> | null;
}

/**
 * Reference field object shape for media image extraction.
 * Used for aliased field selections (e.g., `metaobject.heroImageField`).
 */
export type MetaobjectReferenceFieldLike =
  | {
      reference?: {
        image?: {
          url: string;
          altText?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      } | null;
    }
  | null
  | undefined;

/**
 * References field object shape for media image list extraction.
 * Used for aliased field selections (e.g., `metaobject.galleryField`).
 */
export type MetaobjectReferencesFieldLike =
  | {
      references?: {
        nodes?: ReadonlyArray<{
          image?: {
            url: string;
            altText?: string | null;
            width?: number | null;
            height?: number | null;
          } | null;
        } | null> | null;
      } | null;
    }
  | null
  | undefined;
