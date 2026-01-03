---
"@commerce-atoms/metafield": patch
---

### Changed

- Updated types to use `ReadonlyArray` for better compatibility with Shopify codegen output
- Made `MetaobjectFieldLike.key` non-optional for stricter typing
- Added `MetaobjectReferenceFieldLike` and `MetaobjectReferencesFieldLike` types for media helpers
- Updated media helpers to properly handle `ReadonlyArray` with null-safe iteration

