# @shoppy/variants

**Pure variant selection logic for Shopify products.**

## Purpose

Provides utilities for variant selection UX that Hydrogen doesn't standardize:

- Finding variants by selected options
- Picking default variants with policies
- Computing availability maps (which options are still valid)
- URL ↔ selection state synchronization
- Normalizing selected options

## Non-goals

This package explicitly does **NOT**:

- ❌ Provide UI components (`<VariantSelector />`)
- ❌ Fetch products from Shopify
- ❌ Manage React state or context
- ❌ Include routing logic
- ❌ Handle cart operations

## API

### Core Functions

```typescript
// Find a variant from selected options
import {findVariant} from '@shoppy/variants/findVariant';

const result = findVariant(product, [
  {name: 'Color', value: 'Red'},
  {name: 'Size', value: 'Large'},
]);

if (result.found) {
  console.log('Variant:', result.variant.id);
} else {
  console.log('Not found:', result.reason); // 'NO_MATCH' | 'INCOMPLETE' | 'INVALID_OPTION'
}
```

```typescript
// Pick a default variant with policy
import {pickDefaultVariant} from '@shoppy/variants/pickDefaultVariant';

const variant = pickDefaultVariant(product, 'first-available');
// Policies: 'first-available' | 'cheapest-available' | 'first' | 'cheapest'
```

```typescript
// Get availability map for partial selection
import {getAvailabilityMap} from '@shoppy/variants/getAvailabilityMap';

const availabilityMap = getAvailabilityMap(product, [
  {name: 'Color', value: 'Red'},
]);

// Check if "Size: Large" is available given Color: Red
const availableSizes = availabilityMap.get('Size');
const isLargeAvailable = availableSizes?.has('Large');

// Note: Returns Map for efficient lookups. For JSON/debugging:
// Array.from(availabilityMap.entries())
```

### URL Helpers

```typescript
// Parse selected options from URL
import {getSelectedOptionsFromUrl} from '@shoppy/variants/getSelectedOptionsFromUrl';

// Recommended: pass optionKeys for stability (option names are merchant-editable)
const options = getSelectedOptionsFromUrl(
  new URLSearchParams('?Color=Red&Size=Large'),
  ['Color', 'Size'], // Filters to only these keys, ignores other URL params
);
// [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'Large' }]
```

```typescript
// Serialize selected options to URL params
import {selectedOptionsToUrlParams} from '@shoppy/variants/selectedOptionsToUrlParams';

const params = selectedOptionsToUrlParams([
  {name: 'Color', value: 'Red'},
  {name: 'Size', value: 'Large'},
]);
// URLSearchParams: Color=Red&Size=Large
```

### Utilities

```typescript
// Normalize selected options (trim, case, sort)
import {normalizeSelectedOptions} from '@shoppy/variants/normalizeSelectedOptions';

const normalized = normalizeSelectedOptions(options, {
  casing: 'lowercase',
  trim: true,
  sort: true,
});
```

```typescript
// Validate a selection
import {isSelectionValid} from '@shoppy/variants/isSelectionValid';

const isValid = isSelectionValid(product, selectedOptions);
```

## Type Philosophy

Uses **structural types** with generics to preserve your original types:

```typescript
// Shoppy accepts any object matching the shape
// Returns YOUR type, not a Shoppy type
const variant = pickDefaultVariant(hydrogenProduct, 'first-available');
// ^? Returns Hydrogen's variant type, not VariantLike
```

Your types must structurally match the expected shape; no runtime validation is performed.

Minimal required shape:

```typescript
interface VariantLike {
  id: string;
  availableForSale: boolean;
  selectedOptions: Array<{name: string; value: string}>;
  price: {amount: string; currencyCode: string};
}
```

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with Hydrogen, custom backends, anything
- Types match Shopify shapes but don't require them

## Delete-ability

Removing this package = replacing imports. That's it.
