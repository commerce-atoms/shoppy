// Contract test: validates public subpath exports and built artifacts.
// This test intentionally fails on breaking API changes.

import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {describe, expect, it} from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '../../package.json');

describe('API Surface', () => {
  it('should have all required exports with valid paths', () => {
    const packageJson = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8'),
    ) as {
      exports: Record<string, {import?: string; types?: string}>;
    };

    const exports = packageJson.exports;
    const exportKeys = Object.keys(exports).filter(
      (key) => key !== './package.json',
    );

    const requiredExports = [
      './apply/applyFilters',
      './filter/filterByTags',
      './filter/filterByPriceRange',
      './filter/filterByAvailability',
      './filter/filterByOptions',
      './filter/filterProduct',
      './price/getProductMinPrice',
      './types/filterCriteria',
      './types/product',
    ];

    for (const required of requiredExports) {
      expect(exportKeys).toContain(required);

      const exportConfig = exports[required];
      if (exportConfig?.import) {
        const importPath = join(__dirname, '../../', exportConfig.import);
        expect(existsSync(importPath)).toBe(true);
      }
      if (exportConfig?.types) {
        const typesPath = join(__dirname, '../../', exportConfig.types);
        expect(existsSync(typesPath)).toBe(true);
      }
    }

    expect(exportKeys.length).toBeGreaterThanOrEqual(requiredExports.length);
  });
});

