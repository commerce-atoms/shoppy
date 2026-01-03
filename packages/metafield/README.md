# @commerce-atoms/metafield

**Pure metafield and metaobject extraction/parsing.**

## Purpose

Deterministic metafield access without optional chaining soup. Provides utilities for extracting and parsing metafield values from structured objects.

## Non-goals

This package explicitly does **NOT**:

- ❌ Fetch metafields from external APIs
- ❌ Provide schema modeling or validation
- ❌ Include CMS abstractions
- ❌ Manage React state or context

## API

### getMetafield

```typescript
import { getMetafield } from "@commerce-atoms/metafield/metafields/getMetafield";

const metafield = getMetafield(product, "custom", "color");
if (metafield) {
  console.log(metafield.value);
}
```

### getMetafieldValue

```typescript
import { getMetafieldValue } from "@commerce-atoms/metafield/metafields/getMetafieldValue";

// Non-strict mode (returns undefined on failure)
const color = getMetafieldValue(product, "custom", "color");
// Returns: string | undefined

// Strict mode with JSON parsing
const result = getMetafieldValue(product, "custom", "config", {
  mode: "json",
  strict: true,
});
if (result.ok) {
  console.log(result.value);
} else {
  console.log("Failed:", result.reason); // 'MISSING' | 'EMPTY' | 'INVALID'
}
```

**Parse modes:**

- `'string'` (default): Returns value as-is, trimmed
- `'json'`: Parses JSON, returns parsed object or undefined
- `'number'`: Parses number, returns number or undefined
- `'boolean'`: Parses "true"/"false" (case-insensitive), returns boolean or undefined

**Note:** Metafield helpers may return `undefined` in non-strict mode; metaobject helpers never return `undefined` (use `null` / `[]`). This split is intentional: metafield helpers are often used "optionally", while metaobject helpers provide deterministic outputs for domain mappers.

### getMetaobjectReferenceFromMetafield

```typescript
import { getMetaobjectReferenceFromMetafield } from "@commerce-atoms/metafield/metaobjects/getMetaobjectReferenceFromMetafield";

const reference = getMetaobjectReferenceFromMetafield(
  product,
  "custom",
  "related"
);
if (reference) {
  // Use reference (shape depends on your schema)
}
```

### getMetaobjectField

```typescript
import { getMetaobjectField } from "@commerce-atoms/metafield/metaobjects/getMetaobjectField";

const field = getMetaobjectField(metaobject, "description");
if (field) {
  console.log(field.value);
}
```

### getMetaobjectString

Gets a string value from a metaobject field by key. **Scans the fields array** to find the matching field.

```typescript
import { getMetaobjectString } from "@commerce-atoms/metafield/metaobjects/getMetaobjectString";

const title = getMetaobjectString(metaobject, "title");
// Returns: string | null (never undefined)
```

**Return contract:** Missing or empty fields return `null`, never `undefined`.

### getMetaobjectStringList

Gets a string array from a metaobject field by key. **Scans the fields array** to find the matching field. Handles JSON arrays and comma-separated strings.

```typescript
import { getMetaobjectStringList } from "@commerce-atoms/metafield/metaobjects/getMetaobjectStringList";

const tags = getMetaobjectStringList(metaobject, "tags");
// Returns: string[] (never undefined, returns [] for missing/invalid)
```

**Return contract:** Missing or invalid fields return `[]`, never `undefined`.

### getMetaobjectMediaImage

Extracts a media image from a metaobject reference field object. This helper does **not** scan `metaobject.fields[]`. Pass the reference field object directly.

**Input type:**

```typescript
type MetaobjectReferenceFieldLike = {
  reference?: {
    image?: {
      url: string;
      altText?: string | null;
      width?: number | null;
      height?: number | null;
    } | null;
  } | null;
};
```

**Usage:**

```typescript
import { getMetaobjectMediaImage } from "@commerce-atoms/metafield/metaobjects/getMetaobjectMediaImage";

const heroImage = getMetaobjectMediaImage(referenceField);
// Returns: MetaobjectMediaImage | null
```

**Output type:**

```typescript
type MetaobjectMediaImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};
```

**Return contract:** Missing images return `null`, never `undefined`.

### getMetaobjectMediaImageList

Extracts an array of media images from a metaobject references field object. This helper does **not** scan `metaobject.fields[]`. Pass the references field object directly.

**Input type:**

```typescript
type MetaobjectReferencesFieldLike = {
  references?: {
    nodes?: Array<{
      image?: {
        url: string;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    } | null> | null;
  } | null;
};
```

**Usage:**

```typescript
import { getMetaobjectMediaImageList } from "@commerce-atoms/metafield/metaobjects/getMetaobjectMediaImageList";

const gallery = getMetaobjectMediaImageList(referencesField);
// Returns: MetaobjectMediaImage[]
```

**Return contract:** Missing images return `[]`, never `undefined`.

## Usage Patterns

### String Helpers: Scan Fields

String helpers (`getMetaobjectString`, `getMetaobjectStringList`) accept the metaobject and a key. They scan the `fields` array internally:

```typescript
// ✅ Correct: Pass metaobject and key
const title = getMetaobjectString(metaobject, "title");
const tags = getMetaobjectStringList(metaobject, "tags");
```

### Media Helpers: Reference Field Objects

Media helpers (`getMetaobjectMediaImage`, `getMetaobjectMediaImageList`) accept reference field objects directly. They do not scan `metaobject.fields[]`:

```typescript
// ✅ Correct: Pass the reference field objects
const heroImage = getMetaobjectMediaImage(referenceField);
const gallery = getMetaobjectMediaImageList(referencesField);

// ❌ Wrong: Passing a full metaobject (media helpers don't scan fields[])
const heroImage = getMetaobjectMediaImage(metaobject as any);
```

This pattern:

- Avoids unnecessary field scanning
- Provides better type safety
- Works with any data shape that provides reference field objects

## Return Type Contracts

All metaobject helpers follow strict return contracts:

| Helper                        | Return Type                    | Missing/Empty Behavior             |
| ----------------------------- | ------------------------------ | ---------------------------------- |
| `getMetaobjectString`         | `string \| null`               | Returns `null` (never `undefined`) |
| `getMetaobjectStringList`     | `string[]`                     | Returns `[]` (never `undefined`)   |
| `getMetaobjectMediaImage`     | `MetaobjectMediaImage \| null` | Returns `null` (never `undefined`) |
| `getMetaobjectMediaImageList` | `MetaobjectMediaImage[]`       | Returns `[]` (never `undefined`)   |

Where `MetaobjectMediaImage` is:

```typescript
type MetaobjectMediaImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};
```

These contracts are enforced by contract tests to prevent accidental regressions. Each helper has a contract test asserting it never returns `undefined`.

## Type Philosophy

Uses **structural types** to accept any object matching the required shape. No runtime validation is performed.

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with any JS/TS stack
- Accepts structural types similar to Shopify, but does not depend on Shopify types
- Expects a flat `metafields` array (MetafieldOwnerLike.metafields)
- If your metafields are nested, flatten them before calling these helpers:

  ```ts
  const flatMetafields = nestedMetafields.edges?.map((edge) => edge.node) ?? [];
  const ownerWithFlat = { ...owner, metafields: flatMetafields };
  ```

## Delete-ability

Removing this package = replacing imports. That's it.
