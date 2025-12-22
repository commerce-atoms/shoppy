# Shoppy Architecture

## Overview

Shoppy is a **monorepo of independent, single-purpose npm packages** for commerce logic. Framework-agnostic by design — works with Hydrogen, Next.js, Remix, or any modern stack.

## Structure

```
shoppy/
├── docs/              # Documentation
├── packages/          # Monorepo packages
│   ├── cart/          # Cart line math engine
│   ├── date/          # Commerce-safe date helpers
│   ├── discounts/     # Promotion logic engine
│   ├── filters/       # In-memory product filtering
│   ├── metafield/     # Metafield extraction/parsing
│   ├── money/         # Money formatting
│   ├── pagination/    # Pagination math helpers
│   ├── seo/           # SEO meta & JSON-LD builder
│   ├── urlstate/      # URL-based filter, sort, pagination state
│   └── variants/      # Variant selection and availability logic
├── package.json       # Shared workspace + devDeps
├── tsconfig.base.json # Shared TypeScript config
├── vitest.config.ts   # Shared test config
├── eslint.config.js   # Shared linting
└── README.md          # Overview
```

## Design Principles

### 1. **Independent Packages**

Each package:

- Has its own `package.json`, version, and publish cycle
- Can be used independently without other packages
- Cannot import from other `@shoppy/*` packages
- Contains only business logic (no UI)

### 2. **Zero Dependencies**

- Packages ship with **zero runtime dependencies**
- Only devDeps (tsup, typescript) are shared at root
- Consumers control their own dependency versions

### 3. **Explicit Exports**

- Each package uses subpath exports (no barrel imports)
- Example: `import { toggleFilter } from '@shoppy/urlstate/filters/toggleFilter'`
- Forces tree-shaking and makes bundle analysis clear
- **Import Philosophy:** Subpath exports are the public API. Breaking changes are documented in release notes.

**Usage:**

```typescript
// ✅ Good: Explicit, tree-shakable
import { findVariant } from "@shoppy/variants/findVariant";
import { parseSearchState } from "@shoppy/urlstate/parseSearchState";

// ❌ Bad: Barrel imports not supported
import { findVariant } from "@shoppy/variants";
```

### 4. **Shared Tooling**

Root `package.json` provides:

- `tsup` for building (all packages use)
- `typescript` for type checking
- `vitest` for testing
- `eslint` for linting

This avoids duplication while maintaining per-package independence.

### 5. **Delete-ability**

Removing any Shoppy package should only require replacing imports, not rewriting your architecture. This ensures packages remain utilities, not infrastructure.

### 6. **Framework Agnostic**

All packages are pure TypeScript with zero framework coupling:

- No React dependencies
- No Hydrogen/Remix/Next.js imports
- Works anywhere JavaScript runs
- Shopify types are structural (not imports)

### 7. **Contribution Philosophy**

Shoppy grows **only when** a utility:

- Removes real duplication across multiple apps
- Fits a package's single-sentence purpose
- Doesn't belong in any specific framework

## Versioning Strategy

**Independent per package** – do not synchronize versions:

```
@shoppy/urlstate:    1.2.3    (many updates)
@shoppy/variants:    0.5.0    (fewer updates)
```

Each `package.json` maintains its own `version` field.

## Publishing Workflow

Releases are **tag-driven** — CI publishes automatically.

1. Make changes in `packages/<package>/{src,CHANGELOG.md}`
2. Update `packages/<package>/package.json` version (semver)
3. Commit and push to main
4. Tag release: `git tag @shoppy/<package>@<version>`
5. Push tag: `git push origin --tags`
6. CI runs tests → publishes to npm with provenance

See [RELEASING.md](./RELEASING.md) for full details.

## Scaling: Adding New Packages

Example: adding a new `@shoppy/inventory` package:

```bash
mkdir packages/inventory
cat > packages/inventory/package.json << 'EOF'
{
  "name": "@shoppy/inventory",
  "version": "0.0.0",
  "description": "Inventory availability utilities",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md"],
  "author": "Commerce Atoms",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/commerce-atoms/shoppy",
    "directory": "packages/inventory"
  },
  "publishConfig": { "access": "public" },
  "exports": { "./package.json": "./package.json" },
  "engines": { "node": ">=18.0.0" },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build"
  }
}
EOF

# Add to root workspaces
# npm install automatically picks it up
```

## Build Output

Each package generates:

```
<package>/dist/
├── <export-name>.js      # Bundled module
└── <export-name>.d.ts    # Type definitions
```

Built files are git-ignored and generated during:

- `npm run build` (all packages)
- `npm publish` (via prepublishOnly hook)

## Testing

```bash
npm run test         # Watch mode
npm run test:run     # CI mode
```

**Test Structure:**

**All packages use colocated unit tests:**

- **Unit tests:** `*.test.ts` files colocated next to source code in feature folders
  - Example: `src/filter/filterByTags.ts` and `src/filter/filterByTags.test.ts`
  - Example: `src/filters/toggleFilter.ts` and `src/filters/toggleFilter.test.ts`
- **Contract tests:** `src/invariants/*.contract.test.ts` for package-level guarantees
  - At least one `api-surface.contract.test.ts` per package (validates export map)
  - Optional additional policy contracts (e.g., `price-parsing.contract.test.ts`, `parse-serialize-roundtrip.contract.test.ts`)
  - Only for cross-module integration, public API contracts, and invariants
  - No unit tests in invariants folder

**No separate `tests/` directory** - all tests are colocated with source code.

## Type Safety

All packages compile with strict TypeScript settings from `tsconfig.base.json`:

- `strict: true`
- `noUnusedLocals: true`
- `noImplicitReturns: true`

Per-package type checking:

```bash
npm run typecheck    # Checks all packages
```

## Linting

Shared ESLint config at root, run globally:

```bash
npm run lint         # All packages
```

## Standalone Repository

The `@shoppy` monorepo is designed as a standalone project:

1. All packages, documentation, and configs are self-contained
2. CI/CD is configured for npm publishing with provenance
3. Independent versioning per package

The monorepo can be published directly to npm as `@shoppy/*` packages.
