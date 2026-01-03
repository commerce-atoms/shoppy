---
"@commerce-atoms/metafield": minor
---

### Breaking Changes

- **getMetaobjectString**: Changed return type from `string | undefined` to `string | null`. The function now returns `null` instead of `undefined` when the field is missing or empty. The optional `fallback` parameter has been removed.

### Added

- Return contract enforcement via contract tests that assert all metaobject helpers never return `undefined`.
- Input type documentation (`MetaobjectReferenceFieldLike`, `MetaobjectReferencesFieldLike`) for media helpers.

### Changed

- Documentation is now framework-agnostic (removed Shopify/GraphQL-specific language).
- API surface contract test includes all four metaobject helper functions.
