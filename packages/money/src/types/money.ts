/**
 * Minimal money shape for formatting operations.
 * Uses structural typing to accept Shopify money objects.
 */
export interface MoneyLike {
  /**
   * Amount as string or number (e.g., "19.99" or 19.99).
   */
  amount: string | number;

  /**
   * ISO 4217 currency code (e.g., "USD", "EUR").
   */
  currencyCode: string;
}
