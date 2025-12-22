import { describe, expect, test } from "vitest";
import { applyFilters } from "../apply/applyFilters.js";
import type { Product } from "../types/product.js";
import type { FilterCriteria } from "../types/filterCriteria.js";

describe("applyFilters", () => {
  const products: Product[] = [
    {
      priceRange: { minVariantPrice: { amount: "50.00" } },
      availableForSale: true,
      tags: ["new"],
    },
    {
      priceRange: { minVariantPrice: { amount: "150.00" } },
      availableForSale: true,
      tags: ["sale"],
    },
    {
      priceRange: { minVariantPrice: { amount: "75.00" } },
      availableForSale: false,
      tags: ["new"],
    },
  ];

  test("returns all products when no criteria specified", () => {
    const result = applyFilters(products, {});
    expect(result).toHaveLength(3);
  });

  test("applies price range filter", () => {
    const criteria: FilterCriteria = {
      priceRange: { min: 60, max: 100 },
    };
    const result = applyFilters(products, criteria);
    expect(result).toHaveLength(1);
  });

  test("applies availability filter", () => {
    const criteria: FilterCriteria = {
      availability: { inStock: true },
    };
    const result = applyFilters(products, criteria);
    expect(result).toHaveLength(2);
  });

  test("applies tags filter", () => {
    const criteria: FilterCriteria = {
      tags: ["new"],
    };
    const result = applyFilters(products, criteria);
    expect(result).toHaveLength(2);
  });

  test("applies multiple filters (AND logic)", () => {
    const criteria: FilterCriteria = {
      priceRange: { min: 0, max: 100 },
      availability: { inStock: true },
      tags: ["new"],
    };
    const result = applyFilters(products, criteria);
    expect(result).toHaveLength(1);
  });

  test("returns empty array when no products match all criteria", () => {
    const criteria: FilterCriteria = {
      priceRange: { min: 200 },
      availability: { inStock: true },
    };
    const result = applyFilters(products, criteria);
    expect(result).toHaveLength(0);
  });
});
