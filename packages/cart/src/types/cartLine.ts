/**
 * Cart line item type for calculations.
 */
export interface CartLine {
  /**
   * Line item ID
   */
  id: string;

  /**
   * Quantity of items
   */
  quantity: number;

  /**
   * Price per unit (as number)
   */
  price: number;
}

