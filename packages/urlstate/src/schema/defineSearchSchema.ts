import type {SearchSchema} from '../types/schema.js';

/**
 * Defines a search schema for type-safe filter/sort/pagination handling.
 *
 * Use case: Declare your filter structure once, use everywhere.
 *
 * @param schema - The schema definition
 * @returns The same schema (identity function for type inference)
 *
 * @example
 * ```ts
 * const schema = defineSearchSchema({
 *   filters: {
 *     category: { type: 'single', param: 'category' },
 *     color: { type: 'multiple', param: 'color' },
 *     price: { type: 'range', param: 'price' },
 *   },
 *   sort: { param: 'sort', default: 'relevance' },
 *   pagination: { type: 'page', param: 'page', defaultPage: 1 },
 * });
 * ```
 */
export const defineSearchSchema = (schema: SearchSchema): SearchSchema => {
  return schema;
};

