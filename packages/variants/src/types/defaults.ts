/**
 * Policy for picking default variant.
 */
export type DefaultVariantPolicy =
  | 'first-available' // First variant that's available for sale
  | 'cheapest-available' // Cheapest available variant
  | 'first' // First variant regardless of availability
  | 'cheapest'; // Cheapest variant regardless of availability

