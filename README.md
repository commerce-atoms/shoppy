# @shoppy

> **Pure, composable commerce utilities.**
> Small packages. Big impact. Zero dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](package.json)
[![npm workspaces](https://img.shields.io/badge/npm-workspaces-orange)](package.json)

Designed to work seamlessly with Shopify Hydrogen, but **framework-agnostic by design**.

---

## 🎯 What This Is

Shoppy is a collection of **small, single-purpose packages** that solve specific commerce problems — the kind of logic every storefront needs but no framework standardizes.

### ✅ What Shoppy is:

- 🧩 **Pure business logic functions** — No UI, no framework coupling
- 📦 **Structural types** — Portable across frameworks
- 🎯 **Explicit imports** — No barrel files, tree-shakable
- 🗑️ **Delete-able** — Remove without rewriting your architecture
- 🔒 **TypeScript-first** — Strict types, zero runtime deps

### ❌ What Shoppy is NOT:

- ❌ A UI component library
- ❌ A cart/session framework
- ❌ A routing or layout system
- ❌ A replacement for any framework
- ❌ "The Shoppy way to build apps"

**These are utilities, not infrastructure.** Use them with Hydrogen, Next.js, Remix, or any other stack.

---

## 📦 Packages

### [@commerce-atoms/cart](./packages/cart/README.md)

Pure cart line math engine. Add/merge/update cart items, compute subtotals and quantities, normalize cart structure.

### [@commerce-atoms/date](./packages/date/README.md)

Commerce-safe date helpers. Generate countdown strings, calculate time differences, check expiration dates.

### [@commerce-atoms/discounts](./packages/discounts/README.md)

Pure promotion logic engine. Apply percentage/fixed discounts, validate rules, compose multiple discounts.

### [@commerce-atoms/filters](./packages/filters/README.md)

Pure in-memory product filtering. Filter by tags, price range, availability, options. Compose multiple filters.

### [@commerce-atoms/metafield](./packages/metafield/README.md)

Deterministic metafield and metaobject extraction/parsing. Locate metafields by namespace/key, parse values (string, json, number, boolean), extract metaobject references and fields without optional chaining soup.

### [@commerce-atoms/money](./packages/money/README.md)

Pure money formatting and compare-at pricing. Format currency with Intl.NumberFormat, format price ranges, calculate discount percentages, and apply compare-at display rules.

### [@commerce-atoms/pagination](./packages/pagination/README.md)

Pure pagination math helpers. Compute page bounds, generate pagination metadata, calculate offset windows.

### [@commerce-atoms/seo](./packages/seo/README.md)

Deterministic SEO meta and JSON-LD builder. Build consistent meta objects for pages, products, and collections with safe fallbacks, OpenGraph/Twitter cards, and structured data schemas.

### [@commerce-atoms/urlstate](./packages/urlstate/README.md)

Schema-driven filter/sort/pagination state management for URLs. Parse URL params → typed state, serialize state → URL params, filter primitives (toggle, range, clear), sort and pagination helpers.

### [@commerce-atoms/variants](./packages/variants/README.md)

Pure variant selection logic for Shopify products. Find variants by selected options, pick default variants (4 policies), compute availability maps, URL ↔ selection sync, normalize options.

---

## 🚀 Quick Start

### Installation

```bash
npm install @commerce-atoms/metafield
npm install @commerce-atoms/money
npm install @commerce-atoms/seo
npm install @commerce-atoms/urlstate
npm install @commerce-atoms/variants
```

### Usage

```typescript
// Explicit imports (no barrel files)
import { getMetafieldValue } from "@commerce-atoms/metafield/metafields/getMetafieldValue";
import { formatMoney } from "@commerce-atoms/money/format/formatMoney";
import { buildProductMeta } from "@commerce-atoms/seo/meta/buildProductMeta";
import { parseSearchState } from "@commerce-atoms/urlstate/parseSearchState";
import { toggleFilter } from "@commerce-atoms/urlstate/filters/toggleFilter";
import { findVariant } from "@commerce-atoms/variants/findVariant";

// ❌ This won't work (we don't support barrel imports)
import { findVariant } from "@commerce-atoms/variants";
```

---

## 📋 Requirements

**Node.js** `>=18.0.0`, **TypeScript** `>=5.3.0` (recommended), **npm** `>=9.0.0`. All packages are **ESM-only** (no CommonJS support). Works with modern bundlers (Vite, Webpack 5+, Rollup, esbuild).

---

## 📚 Documentation

**[Architecture](./docs/ARCHITECTURE.md)** • **[Contributing](./CONTRIBUTING.md)** • **[Docs Index](./docs/README.md)**

---

## 🎯 Development Status

**All packages are in 0.x.** APIs are usable but may change before 1.0.

---

## 📝 License

[MIT](LICENSE) — Free to use, modify, and distribute.

---

<div align="center">

**[Documentation](./docs/README.md)** • **[Contributing](./CONTRIBUTING.md)**

Made with ⚡ for modern commerce

</div>
