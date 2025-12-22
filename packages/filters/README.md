# @commerce-atoms/filters

**Pure in-memory product filtering for Shopify storefronts.**

## Purpose

Provides utilities for filtering product arrays by various criteria without server-side logic:

- Filter by tags
- Filter by price range
- Filter by availability
- Filter by selected options
- Compose multiple filters

## Non-goals

This package explicitly does **NOT**:

- ❌ Provide filter UI components
- ❌ Fetch products from Shopify
- ❌ Know about Search & Discovery configuration
- ❌ Manage React state or context
- ❌ Include routing logic

**Note:** Complements `@commerce-atoms/urlstate` but shares no code. Use `@commerce-atoms/urlstate` for schema-driven URL parsing, use `@commerce-atoms/filters` for the actual filtering logic.

## API

### Core Functions

```typescript
// Filter products by tags
import { filterByTags } from "@commerce-atoms/filters/filter/filterByTags";

const filtered = filterByTags(products, ["new", "sale"]);

// Filter products by price range
import { filterByPriceRange } from "@commerce-atoms/filters/filter/filterByPriceRange";

const filtered = filterByPriceRange(products, { min: 10, max: 100 });

// Filter products by availability
import { filterByAvailability } from "@commerce-atoms/filters/filter/filterByAvailability";

const filtered = filterByAvailability(products, { inStock: true });

// Filter products by selected options
import { filterByOptions } from "@commerce-atoms/filters/filter/filterByOptions";

const filtered = filterByOptions(products, { color: "red", size: "large" });

// Apply multiple filters at once
import { applyFilters } from "@commerce-atoms/filters/apply/applyFilters";

const filtered = applyFilters(products, {
  tags: ["new"],
  priceRange: { min: 10, max: 100 },
  availability: { inStock: true },
});
```

## Types

```typescript
import type { FilterCriteria } from "@commerce-atoms/filters/types/filterCriteria";
import type { Product } from "@commerce-atoms/filters/types/product";
```
