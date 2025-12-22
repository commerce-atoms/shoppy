// Contract test: validates price parsing policy across all filter functions.
// Policy: Products with missing/invalid prices are excluded when price filter exists.

import { describe, expect, it } from "vitest";
import { filterByPriceRange } from "../filter/filterByPriceRange.js";
import { filterProduct } from "../filter/filterProduct.js";
import { getProductMinPrice } from "../price/getProductMinPrice.js";
import type { Product } from "../types/product.js";
import type { FilterCriteria } from "../types/filterCriteria.js";

describe("Price Parsing Policy Contract", () => {
  const productWithPrice: Product = {
    priceRange: { minVariantPrice: { amount: "50.00" } },
  };

  const productWithoutPrice: Product = {};

  const productWithInvalidPrice: Product = {
    priceRange: { minVariantPrice: { amount: "invalid" } },
  };

  describe("getProductMinPrice", () => {
    it("returns number for valid price", () => {
      expect(getProductMinPrice(productWithPrice)).toBe(50);
    });

    it("returns undefined for missing price", () => {
      expect(getProductMinPrice(productWithoutPrice)).toBeUndefined();
    });

    it("returns undefined for invalid price string", () => {
      expect(getProductMinPrice(productWithInvalidPrice)).toBeUndefined();
    });
  });

  describe("filterByPriceRange", () => {
    it("includes products with valid prices when filter matches", () => {
      const result = filterByPriceRange([productWithPrice], {
        min: 0,
        max: 100,
      });
      expect(result).toHaveLength(1);
    });

    it("excludes products without price when price filter exists", () => {
      const result = filterByPriceRange(
        [productWithPrice, productWithoutPrice],
        { min: 0 }
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(productWithPrice);
    });

    it("excludes products with invalid price when price filter exists", () => {
      const result = filterByPriceRange(
        [productWithPrice, productWithInvalidPrice],
        { min: 0 }
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(productWithPrice);
    });

    it("includes all products when no price filter", () => {
      const result = filterByPriceRange(
        [productWithPrice, productWithoutPrice, productWithInvalidPrice],
        {}
      );
      expect(result).toHaveLength(3);
    });
  });

  describe("filterProduct", () => {
    it("includes products with valid prices when filter matches", () => {
      const criteria: FilterCriteria = { priceRange: { min: 0, max: 100 } };
      expect(filterProduct(productWithPrice, criteria)).toBe(true);
    });

    it("excludes products without price when price filter exists", () => {
      const criteria: FilterCriteria = { priceRange: { min: 0 } };
      expect(filterProduct(productWithoutPrice, criteria)).toBe(false);
    });

    it("excludes products with invalid price when price filter exists", () => {
      const criteria: FilterCriteria = { priceRange: { min: 0 } };
      expect(filterProduct(productWithInvalidPrice, criteria)).toBe(false);
    });

    it("includes all products when no price filter", () => {
      const criteria: FilterCriteria = {};
      expect(filterProduct(productWithoutPrice, criteria)).toBe(true);
      expect(filterProduct(productWithInvalidPrice, criteria)).toBe(true);
    });
  });
});
