import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "page/getPageBounds": "src/page/getPageBounds.ts",
    "page/getPaginationMeta": "src/page/getPaginationMeta.ts",
    "window/getOffsetWindow": "src/window/getOffsetWindow.ts",
    "types/pageBounds": "src/types/pageBounds.ts",
    "types/paginationMeta": "src/types/paginationMeta.ts",
    "types/offsetWindow": "src/types/offsetWindow.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: false,
});
