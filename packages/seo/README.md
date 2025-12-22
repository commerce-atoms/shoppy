# @shoppy/seo

**Pure SEO meta and JSON-LD builder.**

## Purpose

Deterministic SEO object building with safe fallbacks. Provides utilities for generating consistent meta tags and JSON-LD schemas.

## Non-goals

This package explicitly does **NOT**:

- ❌ Render JSX or HTML
- ❌ Provide framework-specific glue code
- ❌ Manage React state or context
- ❌ Include routing logic

## API

### buildPageMeta

```typescript
import {buildPageMeta} from '@shoppy/seo/meta/buildPageMeta';

const meta = buildPageMeta({
  title: 'About Us',
  description: 'Learn about our company',
  canonicalUrl: 'https://example.com/about',
  images: [{url: 'https://example.com/og.jpg', alt: 'About'}],
});
```

### buildProductMeta

```typescript
import {buildProductMeta} from '@shoppy/seo/meta/buildProductMeta';

const meta = buildProductMeta(product, {
  canonicalUrl: 'https://example.com/products/shoe',
  brandName: 'My Brand',
});
```

**Title priority:** `product.seo.title` → `product.title` → `'Product'`  
**Description priority:** `product.seo.description` → `product.description` → stripped `descriptionHtml`  
**Image priority:** `product.featuredImage` → first `product.images.nodes`

### buildCollectionMeta

```typescript
import {buildCollectionMeta} from '@shoppy/seo/meta/buildCollectionMeta';

const meta = buildCollectionMeta(collection, {
  canonicalUrl: 'https://example.com/collections/shoes',
});
```

## JSON-LD Generation

- Only generated when sufficient data exists (title not fallback)
  - **Why:** Avoids generating incomplete/invalid schemas when product data is missing
- Omits undefined/null fields entirely
- Product schema includes brand when available
- Collection schema is conservative (CollectionPage only)
- jsonLd output is serializable JSON-LD; treat as generated output (do not mutate).

## Type Philosophy

Uses **structural types** to accept any object matching the required shape.

## Status

- 0.x
- ESM only, Node >=18

## Compatibility

- Works with Hydrogen, custom backends, anything
- Output is framework-agnostic (consumer renders)

## Delete-ability

Removing this package = replacing imports. That's it.
