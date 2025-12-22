import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "apply/applyFilters": "src/apply/applyFilters.ts",
    "filter/filterByTags": "src/filter/filterByTags.ts",
    "filter/filterByPriceRange": "src/filter/filterByPriceRange.ts",
    "filter/filterByAvailability": "src/filter/filterByAvailability.ts",
    "filter/filterByOptions": "src/filter/filterByOptions.ts",
    "filter/filterProduct": "src/filter/filterProduct.ts",
    "price/getProductMinPrice": "src/price/getProductMinPrice.ts",
    "types/filterCriteria": "src/types/filterCriteria.ts",
    "types/product": "src/types/product.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
