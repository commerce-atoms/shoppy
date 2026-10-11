# @commerce-atoms/seo

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
import {buildPageMeta} from '@commerce-atoms/seo/meta/buildPageMeta';

const meta = buildPageMeta({
  title: 'About Us',
  description: 'Learn about our company',
  canonicalUrl: 'https://example.com/about',
  images: [{url: 'https://example.com/og.jpg', alt: 'About'}],
});
```

### buildProductMeta

```typescript
import {buildProductMeta} from '@commerce-atoms/seo/meta/buildProductMeta';

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
import {buildCollectionMeta} from '@commerce-atoms/seo/meta/buildCollectionMeta';

const meta = buildCollectionMeta(collection, {
  canonicalUrl: 'https://example.com/collections/shoes',
});
```

### withMetaDefaults

Completes `openGraph` and `twitter` for any builder output. Text falls back to the page's own title / description / canonical URL; the image falls back to a site-wide default. Existing values are never overwritten.

```typescript
import {withMetaDefaults} from '@commerce-atoms/seo/meta/withMetaDefaults';

const meta = withMetaDefaults(buildPageMeta({title: 'About'}), {
  image: {url: 'https://example.com/og-default.jpg', alt: 'My Brand'},
});
```

### buildTitle

Joins title segments, most specific first, and appends the site name. Empty segments and repeats of the previous segment are dropped; the site name is not repeated when it is already last.

```typescript
import {buildTitle} from '@commerce-atoms/seo/meta/buildTitle';

buildTitle(['Wolf Study 01', 'Dark Red', 'Shop'], {siteName: 'My Brand'});
// → 'Wolf Study 01 | Dark Red | Shop | My Brand'
```

### buildOrganizationJsonLd

Organization schema for the brand, typically emitted on the homepage. `sameAs` links social profiles; empty values are dropped and duplicates removed.

```typescript
import {buildOrganizationJsonLd} from '@commerce-atoms/seo/jsonld/buildOrganizationJsonLd';

const jsonLd = buildOrganizationJsonLd({
  name: 'My Brand',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  sameAs: ['https://www.instagram.com/mybrand', 'https://x.com/mybrand'],
});
```

### buildVideoJsonLd

VideoObject schema for a page built around one video. Returns `undefined` unless `name`, `thumbnailUrl` and `uploadDate` are present (required for video rich results).

```typescript
import {buildVideoJsonLd} from '@commerce-atoms/seo/jsonld/buildVideoJsonLd';

const jsonLd = buildVideoJsonLd({
  name: 'My Short Film',
  thumbnailUrl: 'https://example.com/poster.jpg',
  uploadDate: '2026-03-01',
  embedUrl: 'https://www.youtube.com/embed/abc123',
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
