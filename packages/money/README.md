# @commerce-atoms/money

**Pure money formatting and compare-at pricing.**

## Purpose

Consistent money formatting without repeated Intl boilerplate. Provides deterministic formatting and compare-at pricing display rules.

## Non-goals

This package explicitly does **NOT**:

- ❌ Convert currencies or handle FX
- ❌ Fetch prices from Shopify
- ❌ Provide UI components
- ❌ Manage React state

## API

### formatMoney

```typescript
import {formatMoney} from '@commerce-atoms/money/format/formatMoney';

const formatted = formatMoney({amount: '19.99', currencyCode: 'USD'});
// Returns: "$19.99"

const formatted = formatMoney({amount: 'invalid', currencyCode: 'USD'});
// Returns: "—" (em dash for invalid inputs)
```

### formatRange

```typescript
import {formatRange} from '@commerce-atoms/money/format/formatRange';

const range = formatRange(
  {amount: '10.00', currencyCode: 'USD'},
  {amount: '20.00', currencyCode: 'USD'},
);
// Returns: "$10.00–$20.00" (en dash, not hyphen)

const single = formatRange(
  {amount: '10.00', currencyCode: 'USD'},
  {amount: '10.00', currencyCode: 'USD'},
);
// Returns: "$10.00" (single price when equal)
```

### formatCompare

```typescript
import {formatCompare} from '@commerce-atoms/money/compare/formatCompare';

const result = formatCompare(
  {amount: '19.99', currencyCode: 'USD'},
  {amount: '29.99', currencyCode: 'USD'},
);
// Returns: {
//   show: true,
//   price: "$19.99",
//   compareAt: "$29.99",
//   discountPercent: 33
// }
```

**Display rules:**

- `show: false` when compare-at is missing, invalid, or <= price
- `show: true` only when compare-at > price
- Discount percent is rounded to nearest integer
- discountPercent is display-only (not accounting-grade) and may differ by 1% due to rounding.

## Fallback Behavior

All functions return `'—'` (em dash) for invalid inputs:

- Null/undefined money objects
- Invalid amount values (NaN)
- Currency mismatches (for range/compare)

**Note:** `formatRange` uses an en dash (`–`) between min and max prices, not a hyphen. This follows typographic conventions for ranges.

## Type Philosophy

Uses **structural types** to accept any object matching the required shape.

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with Hydrogen, custom backends, anything
- Uses Intl.NumberFormat (available in Node 18+ and browsers)

## Delete-ability

Removing this package = replacing imports. That's it.
