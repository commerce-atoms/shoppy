import { describe, expect, test } from "vitest";
import { getProductMinPrice } from "./getProductMinPrice.js";
import type { Product } from "../types/product.js";

describe("getProductMinPrice", () => {
  test("extracts price from priceRange", () => {
    const product: Product = {
      priceRange: { minVariantPrice: { amount: "50.00" } },
    };
    expect(getProductMinPrice(product)).toBe(50);
  });

  test("falls back to variant price", () => {
    const product: Product = {
      selectedOrFirstAvailableVariant: { price: { amount: "25.00" } },
    };
    expect(getProductMinPrice(product)).toBe(25);
  });

  test("returns undefined for missing price", () => {
    const product: Product = {};
    expect(getProductMinPrice(product)).toBeUndefined();
  });

  test("returns undefined for invalid price string", () => {
    const product: Product = {
      priceRange: { minVariantPrice: { amount: "invalid" } },
    };
    expect(getProductMinPrice(product)).toBeUndefined();
  });

  test("prefers priceRange over variant", () => {
    const product: Product = {
      priceRange: { minVariantPrice: { amount: "50.00" } },
      selectedOrFirstAvailableVariant: { price: { amount: "25.00" } },
    };
    expect(getProductMinPrice(product)).toBe(50);
  });
});
