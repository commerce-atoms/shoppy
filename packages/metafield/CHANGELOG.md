# Changelog

## 0.3.0

### Breaking Changes

- **getMetaobjectString**: Changed return type from `string | undefined` to `string | null`. The function now returns `null` instead of `undefined` when the field is missing or empty. This aligns with domain model contracts and eliminates the need for `?? null` workarounds in consuming code. The optional `fallback` parameter has been removed.

### Added

- **Return contract enforcement**: Added contract tests (`return-contracts.contract.test.ts`) that assert all metaobject helpers never return `undefined`. This prevents accidental regressions and ensures consistent return types.
- **Input type documentation**: Added `MetaobjectReferenceFieldLike` and `MetaobjectReferencesFieldLike` type definitions in documentation to clarify expected input shapes for media helpers.

### Changed

- **Documentation**: Removed all Shopify/GraphQL-specific language and examples. Documentation is now framework-agnostic and focuses on structural typing patterns.
- **API surface contract test**: Updated to include all four metaobject helper functions (`getMetaobjectString`, `getMetaobjectStringList`, `getMetaobjectMediaImage`, `getMetaobjectMediaImageList`).

## 0.2.0

### Minor Changes

- 7e766c1: Add metaobject value coercion helpers: `getMetaobjectString`, `getMetaobjectStringList`, `getMetaobjectMediaImage`, and `getMetaobjectMediaImageList`. These helpers eliminate repetitive value extraction logic across modules by providing generic coercion functions for strings, string arrays, and media images from metaobject fields.

## 0.1.0

### Minor Changes

- 2617290: Add metaobject value coercion helpers: `getMetaobjectString`, `getMetaobjectStringList`, `getMetaobjectMediaImage`, and `getMetaobjectMediaImageList`. These helpers eliminate repetitive value extraction logic across modules by providing generic coercion functions for strings, string arrays, and media images from metaobject fields.

## 0.0.3

### Patch Changes

- 25af142: Test OIDC publishing for all packages

## 0.0.2

### Patch Changes

- f542a0c: Test OIDC publishing workflow

All notable changes to `@commerce-atoms/metafield` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Initial release.
