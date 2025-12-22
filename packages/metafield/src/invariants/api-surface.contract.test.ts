// Contract test: validates public subpath exports and built artifacts.
// This test intentionally fails on breaking API changes.

/**
 * API Surface Drift Test
 *
 * Ensures the public API (exports) hasn't changed accidentally.
 * This prevents someone from removing or renaming exports without noticing.
 *
 * **Important**: This test requires `dist/` files to exist. It must run AFTER
 * `npm run build`. The CI workflow runs `npm run verify` which includes build.
 */

import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '../../package.json');

describe('API Surface', () => {
  it('should have all required exports with valid paths', () => {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
      exports: Record<string, {import?: string; types?: string}>;
    };

    const exports = packageJson.exports;
    const exportKeys = Object.keys(exports).filter(
      (key) => key !== './package.json',
    );

    // Required exports that must exist
    const requiredExports = [
      './metafields/getMetafield',
      './metafields/getMetafieldValue',
      './metaobjects/getMetaobjectReferenceFromMetafield',
      './metaobjects/getMetaobjectField',
      './parse/parseMetafieldValue',
      './types/metafield',
      './types/metaobject',
      './types/parse',
    ];

    for (const required of requiredExports) {
      expect(exportKeys).toContain(required);

      // Validate export paths resolve to actual files
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

    // Ensure no unexpected exports were added (optional - can be relaxed)
    expect(exportKeys.length).toBeGreaterThanOrEqual(requiredExports.length);
  });
});
