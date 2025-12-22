/**
 * Availability criteria for filtering products.
 */
export interface AvailabilityCriteria {
  inStock?: boolean;
  outOfStock?: boolean;
}

/**
 * Filter criteria for product filtering operations.
 */
export interface FilterCriteria {
  /**
   * Price range filter
   */
  priceRange?: {
    min?: number;
    max?: number;
  };

  /**
   * Availability filter criteria
   */
  availability?: AvailabilityCriteria;

  /**
   * Tag filter - array of tags to match (product must have at least one)
   */
  tags?: string[];

  /**
   * Option filter - object mapping option names to values
   */
  options?: Record<string, string>;
}

