// Contract test: validates public subpath exports and built artifacts.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, "../../package.json");

describe("API Surface", () => {
  it("should have all required exports with valid paths", () => {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as {
      exports: Record<string, { import?: string; types?: string }>;
    };

    const exports = packageJson.exports;
    const exportKeys = Object.keys(exports).filter(
      (key) => key !== "./package.json"
    );

    const requiredExports = [
      "./page/getPageBounds",
      "./page/getPaginationMeta",
      "./window/getOffsetWindow",
      "./types/pageBounds",
      "./types/paginationMeta",
      "./types/offsetWindow",
    ];

    for (const required of requiredExports) {
      expect(exportKeys).toContain(required);

      const exportConfig = exports[required];
      if (exportConfig?.import) {
        const importPath = join(__dirname, "../../", exportConfig.import);
        expect(existsSync(importPath)).toBe(true);
      }
      if (exportConfig?.types) {
        const typesPath = join(__dirname, "../../", exportConfig.types);
        expect(existsSync(typesPath)).toBe(true);
      }
    }
  });
});
