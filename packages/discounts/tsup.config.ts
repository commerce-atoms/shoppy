import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "apply/applyPercentageDiscount": "src/apply/applyPercentageDiscount.ts",
    "apply/applyFixedDiscount": "src/apply/applyFixedDiscount.ts",
    "apply/calculateDiscountedAmount": "src/apply/calculateDiscountedAmount.ts",
    "compose/composeDiscounts": "src/compose/composeDiscounts.ts",
    "validate/validateDiscountRule": "src/validate/validateDiscountRule.ts",
    "types/discount": "src/types/discount.ts",
    "types/discountRule": "src/types/discountRule.ts",
    "types/composeOptions": "src/types/composeOptions.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
