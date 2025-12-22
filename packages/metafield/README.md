# @commerce-atoms/metafield

**Pure metafield and metaobject extraction/parsing.**

## Purpose

Deterministic metafield access without optional chaining soup. Provides utilities for extracting and parsing metafield values from Shopify objects.

## Non-goals

This package explicitly does **NOT**:

- ❌ Fetch metafields from Shopify
- ❌ Provide schema modeling or validation
- ❌ Include CMS abstractions
- ❌ Manage React state or context

## API

### getMetafield

```typescript
import {getMetafield} from '@commerce-atoms/metafield/metafields/getMetafield';

const metafield = getMetafield(product, 'custom', 'color');
if (metafield) {
  console.log(metafield.value);
}
```

### getMetafieldValue

```typescript
import {getMetafieldValue} from '@commerce-atoms/metafield/metafields/getMetafieldValue';

// Non-strict mode (returns undefined on failure)
const color = getMetafieldValue(product, 'custom', 'color');
// Returns: string | undefined

// Strict mode with JSON parsing
const result = getMetafieldValue(product, 'custom', 'config', {
  mode: 'json',
  strict: true,
});
if (result.ok) {
  console.log(result.value);
} else {
  console.log('Failed:', result.reason); // 'MISSING' | 'EMPTY' | 'INVALID'
}
```

**Parse modes:**

- `'string'` (default): Returns value as-is, trimmed
- `'json'`: Parses JSON, returns parsed object or undefined
- `'number'`: Parses number, returns number or undefined
- `'boolean'`: Parses "true"/"false" (case-insensitive), returns boolean or undefined

### getMetaobjectReferenceFromMetafield

```typescript
import {getMetaobjectReferenceFromMetafield} from '@commerce-atoms/metafield/metaobjects/getMetaobjectReferenceFromMetafield';

const reference = getMetaobjectReferenceFromMetafield(
  product,
  'custom',
  'related',
);
if (reference) {
  // Use reference (shape depends on your schema)
}
```

### getMetaobjectField

```typescript
import {getMetaobjectField} from '@commerce-atoms/metafield/metaobjects/getMetaobjectField';

const field = getMetaobjectField(metaobject, 'description');
if (field) {
  console.log(field.value);
}
```

## Type Philosophy

Uses **structural types** to accept any object matching the required shape. No runtime validation is performed.

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with Hydrogen, custom backends, anything
- Types match Shopify shapes but don't require them
- Expects a flat `metafields` array (MetafieldOwnerLike.metafields)
- If your Storefront API query returns metafields as edges/nodes, map them to a flat array first:

  ```ts
  const flatMetafields =
    product.metafields.edges?.map((edge) => edge.node) ?? [];
  const productWithFlat = {...product, metafields: flatMetafields};
  ```

## Delete-ability

Removing this package = replacing imports. That's it.
