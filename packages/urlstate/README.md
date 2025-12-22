# @shoppy/urlstate

**Pure URL state management for filters, sort, and pagination.**

## Purpose

Provides utilities for encoding/decoding filter state in URLs:

- Schema-driven parsing and serialization
- Filter primitives (toggle, range, clear)
- Sort and pagination helpers
- Stable URL param ordering (avoids revalidation churn)

## Non-goals

This package explicitly does **NOT**:

- ❌ Provide filter UI components
- ❌ Own "how loaders should work"
- ❌ Know about Shopify Search & Discovery config
- ❌ Manage React state or routing
- ❌ Include URL navigation logic

## API

### Schema Definition

```typescript
import {defineSearchSchema} from '@shoppy/urlstate/defineSearchSchema';

// Type-level schema (identity function for type inference only, no runtime validation)
const schema = defineSearchSchema({
  filters: {
    color: {type: 'multiple', param: 'color'},
    size: {type: 'single', param: 'size'},
    price: {type: 'range', param: 'price'},
  },
  sort: {
    param: 'sort',
    default: 'best-selling',
    validValues: ['best-selling', 'price-asc', 'price-desc', 'newest'], // Used for best-effort filtering in parser
  },
  pagination: {
    type: 'cursor',
    param: 'cursor',
  },
});
```

### Parsing & Serializing

```typescript
import {parseSearchState} from '@shoppy/urlstate/parseSearchState';
import {serializeSearchState} from '@shoppy/urlstate/serializeSearchState';

const state = parseSearchState(
  new URLSearchParams('?color=red&color=blue&size=large'),
  schema,
);
// { filters: { color: ['red', 'blue'], size: 'large' }, sort: 'best-selling' }

const params = serializeSearchState(state, schema, {
  excludeDefaults: true,
  sortParams: true,
});
```

### Filter Operations

```typescript
import {toggleFilter} from '@shoppy/urlstate/filters/toggleFilter';
import {setRangeFilter} from '@shoppy/urlstate/filters/setRangeFilter';
import {clearFilter} from '@shoppy/urlstate/filters/clearFilter';
import {clearAllFilters} from '@shoppy/urlstate/filters/clearAllFilters';

const nextState = toggleFilter(state, 'color', 'green');
const withRange = setRangeFilter(state, 'price', {min: 10, max: 100});
const cleared = clearFilter(state, 'color');
const reset = clearAllFilters(state);
```

### Sort & Pagination

```typescript
import {setSort} from '@shoppy/urlstate/sort/setSort';
import {setPage} from '@shoppy/urlstate/pagination/setPage';
import {setCursor} from '@shoppy/urlstate/pagination/setCursor';

const sorted = setSort(state, 'price-asc');
const paged = setPage(state, 2);
const cursored = setCursor(state, 'eyJsYXN0X2lkIjoxMH0=');
```

### Patching URLs

```typescript
import {patchSearchParams} from '@shoppy/urlstate/patchSearchParams';

const patched = patchSearchParams(
  currentParams,
  {filters: {color: ['red']}},
  schema,
  {preserveUnknownParams: true},
);
```

## Type Philosophy

Structural types, no framework dependency:

```typescript
interface SearchState {
  filters: Record<string, FilterValue | undefined>;
  sort?: string;
  page?: number;
  cursor?: string;
}

type FilterValue = string | string[] | {min?: number; max?: number};
```

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with any router (React Router, Next.js, custom)
- No framework dependencies
- Stable param ordering (alphabetical)
- Unknown params preserved by default

## Delete-ability

Removing this package = replacing imports. That's it.
