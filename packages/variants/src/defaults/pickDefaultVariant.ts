import type {VariantLike} from '../types/variant.js';
import type {DefaultVariantPolicy} from '../types/defaults.js';

/**
 * Minimal product shape required for pickDefaultVariant.
 * Uses generics to preserve the caller's variant type.
 */
interface ProductWithVariants<V extends VariantLike> {
  variants: {
    nodes: V[];
  };
}

/**
 * Picks a default variant from a product using a deterministic policy.
 *
 * Use case: Pre-select a variant when a user lands on a product page.
 *
 * @param product - The product to pick from
 * @param policy - Selection policy
 * @returns The selected default variant, or null if no variants exist
 *
 * @example
 * ```ts
 * const defaultVariant = pickDefaultVariant(product, 'first-available');
 * ```
 */
export const pickDefaultVariant = <V extends VariantLike>(
  product: ProductWithVariants<V>,
  policy: DefaultVariantPolicy = 'first-available',
): V | null => {
  const variants = product.variants.nodes;

  if (variants.length === 0) {
    return null;
  }

  switch (policy) {
    case 'first-available': {
      const available = variants.find((v) => v.availableForSale);
      return available || null;
    }

    case 'cheapest-available': {
      const available = variants.filter((v) => v.availableForSale);
      if (available.length === 0) return null;

      return available.reduce((cheapest, current) => {
        const cheapestPrice = parseFloat(cheapest.price.amount);
        const currentPrice = parseFloat(current.price.amount);
        return currentPrice < cheapestPrice ? current : cheapest;
      });
    }

    case 'first': {
      return variants[0];
    }

    case 'cheapest': {
      return variants.reduce((cheapest, current) => {
        const cheapestPrice = parseFloat(cheapest.price.amount);
        const currentPrice = parseFloat(current.price.amount);
        return currentPrice < cheapestPrice ? current : cheapest;
      });
    }

    default: {
      return variants[0];
    }
  }
};

