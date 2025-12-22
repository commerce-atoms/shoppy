import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "totals/calculateSubtotal": "src/totals/calculateSubtotal.ts",
    "totals/calculateTotalQuantity": "src/totals/calculateTotalQuantity.ts",
    "line/addCartLine": "src/line/addCartLine.ts",
    "line/updateCartLine": "src/line/updateCartLine.ts",
    "line/removeCartLine": "src/line/removeCartLine.ts",
    "line/mergeCartLines": "src/line/mergeCartLines.ts",
    "line/getCartLineKey": "src/line/getCartLineKey.ts",
    "normalize/normalizeCart": "src/normalize/normalizeCart.ts",
    "types/cartLine": "src/types/cartLine.ts",
    "types/cart": "src/types/cart.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
