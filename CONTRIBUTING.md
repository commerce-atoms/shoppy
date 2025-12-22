# Contributing to Shoppy

## Development

```bash
# Install dependencies
npm install

# Watch mode (development)
npm run dev

# Run tests in watch mode
npm run test

# Full verification (typecheck + lint + test + build + pack)
npm run verify
```

**Note:** Always run `npm run verify` before submitting a PR. This ensures all checks pass.

## Adding a New Package

1. Create directory: `<package-name>/`
2. Add `package.json`:
   ```json
   {
     "name": "@shoppy/<package-name>",
     "version": "0.0.0",
     "description": "...",
     "type": "module",
     "sideEffects": false,
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "files": ["dist", "README.md"],
     "author": "Commerce Atoms",
     "license": "MIT",
     "repository": {
       "type": "git",
       "url": "https://github.com/commerce-atoms/shoppy",
       "directory": "<package-name>"
     },
     "publishConfig": {
       "access": "public"
     },
     "exports": {
       "./package.json": "./package.json"
     },
     "engines": {
       "node": ">=18.0.0"
     },
     "scripts": {
       "build": "tsup",
       "dev": "tsup --watch",
       "typecheck": "tsc --noEmit",
       "prepublishOnly": "npm run build"
     }
   }
   ```
3. Add `tsup.config.ts` with entry points
4. Add `tsconfig.json` that extends `../tsconfig.base.json`
5. Create `src/` directory with code
6. Add `README.md`

## Versioning

We use **semantic versioning** (semver) and **independent versioning** per package.

### Versioning Rules

- Each `package.json` maintains its own version number
- If you only change `urlstate`, only increment `@shoppy/urlstate` version
- If you change `variants`, only increment `@shoppy/variants` version
- Never synchronize versions across packages
- Follow semver: `MAJOR.MINOR.PATCH`
  - **MAJOR**: Breaking changes
  - **MINOR**: New features (backward compatible)
  - **PATCH**: Bug fixes (backward compatible)

**0.x Semver Policy:** During 0.x, breaking changes bump **minor** (0.MINOR.PATCH). After 1.0, breaking changes bump major.

**Note:** For publishing process, see [docs/RELEASING.md](./docs/RELEASING.md).

## Package Structure

```
<package-name>/
  src/
    <feature>/         # Feature-organized folders (domain nouns or verbs)
      <fn>.ts         # Public functions
      <fn>.test.ts   # Colocated unit tests
    types/            # Shared types
      *.ts
    invariants/       # Contract/invariant tests only
      *.contract.test.ts
  dist/               # Built output (git-ignored)
  tsconfig.json       # Inherits from ../tsconfig.base.json
  tsup.config.ts      # Build configuration
  package.json        # Package metadata
  README.md           # Package documentation
  CHANGELOG.md        # Version history
  LICENSE
```

### Test Structure

**All packages use colocated unit tests:**

- **Unit tests:** `*.test.ts` files colocated next to source code in feature folders
  - Example: `src/filter/filterByTags.ts` and `src/filter/filterByTags.test.ts`
- **Contract tests:** `src/invariants/*.contract.test.ts` for package-level guarantees
  - At least one `api-surface.contract.test.ts` per package
  - Optional additional policy contracts (e.g., `price-parsing.contract.test.ts`)
  - No unit tests in invariants folder

## Code Standards

- **TypeScript**: Strict mode enabled in `tsconfig.base.json`
- **Exports**: Use explicit subpath exports (no barrel files)
- **No dependencies**: Packages are dependency-free unless absolutely necessary
- **Tree-shakable**: All code must be tree-shakable
- **Pure logic**: No side effects at module load time
- **ESLint `any` policy**: `any` is allowed but discouraged. Prefer generics, `unknown`, or proper types. Use `any` only when necessary for integration with external APIs or complex type scenarios.
