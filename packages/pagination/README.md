# @shoppy/pagination

**Pure pagination math helpers for Shopify storefronts.**

## Purpose

Provides UI-agnostic utilities for pagination calculations:

- Compute page bounds (`start`, `end` indices)
- Generate pagination metadata (total pages, current page, has next/previous)
- Calculate offset windows for pagination

## Non-goals

This package explicitly does **NOT**:

- ❌ Provide pagination UI components (`<Paginator />`)
- ❌ Fetch products or data from Shopify
- ❌ Manage React state or routing
- ❌ Include route-based pagination logic

## API

### Core Functions

```typescript
// Get page bounds (array indices)
import { getPageBounds } from "@shoppy/pagination/page/getPageBounds";

const bounds = getPageBounds(100, 10, 2);
// Returns: {start: 10, end: 20}

// Get pagination metadata
import { getPaginationMeta } from "@shoppy/pagination/page/getPaginationMeta";

const meta = getPaginationMeta(100, 10, 2);
// Returns: {totalPages: 10, currentPage: 2, hasNext: true, hasPrevious: true}

// Get offset window (for offset-based pagination)
import { getOffsetWindow } from "@shoppy/pagination/window/getOffsetWindow";

const window = getOffsetWindow(100, { afterOffset: 5, first: 10 });
// Returns: {start: 6, end: 16, direction: 'forward'}
```

## Types

```typescript
import type { PageBounds } from "@shoppy/pagination/types/pageBounds";
import type { PaginationMeta } from "@shoppy/pagination/types/paginationMeta";
import type { OffsetWindow } from "@shoppy/pagination/types/offsetWindow";
```
