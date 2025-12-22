# Releasing Packages

This document describes the release process for `@shoppy/*` packages.

## Overview

Releases are **tag-driven** and published automatically via GitHub Actions CI.

**Flow:** Bump version → Commit → Tag → Push → CI publishes

## Release Checklist

### 1. Update Version

```bash
cd packages/<package-name>
# Edit package.json version directly, or:
npm version patch|minor|major --no-git-tag-version
```

**Version Strategy:**

- `patch`: Bug fixes (backward compatible)
- `minor`: New features (backward compatible)
- `major`: Breaking changes

**0.x Semver Policy:** During 0.x, breaking changes bump **minor** (0.MINOR.PATCH). After 1.0, breaking changes bump major.

### 2. Update CHANGELOG.md

Move items from `[Unreleased]` to a new version section:

```markdown
## [0.1.0]

### Added

- Feature X

### Changed

- Improvement Z

## [Unreleased]
```

### 3. Run Verification Locally

```bash
npm run verify
```

This runs: typecheck → lint → build → test → pack:check

### 4. Commit

```bash
git add .
git commit -m "chore(<package-name>): release <version>"
```

### 5. Tag (Triggers Publish)

```bash
git tag "@commerce-atoms/<package-name>@<version>"
```

**Example:** `git tag "@commerce-atoms/variants@0.1.0"`

### 6. Push

```bash
git push origin main --tags
```

CI will:

1. Run all tests (Node 18/20/22)
2. Run consumer smoke test
3. Verify package.json version matches tag
4. Publish to npm with provenance

### 7. Verify Publication

- Check GitHub Actions for green publish job
- Verify on npm: `npm view @commerce-atoms/<package-name>`
- Test installation: `npm install @commerce-atoms/<package-name>@<version>`

## Independent Versioning

Each package is versioned independently:

- `@commerce-atoms/urlstate` can be at `0.1.0` while `@commerce-atoms/variants` is at `0.2.0`
- Never synchronize versions across packages
- Each package maintains its own `CHANGELOG.md`

## Troubleshooting

### "Package already exists"

- Version already published to npm
- Bump version and create new tag

### "Version mismatch" in CI

- Tag version doesn't match package.json version
- Delete tag, fix package.json, re-tag

```bash
git tag -d @commerce-atoms/variants@0.1.0
git push origin :refs/tags/@commerce-atoms/variants@0.1.0
# Fix package.json, commit, re-tag
```

### "Missing files in pack"

- Check `files` array in `package.json`
- Verify `dist/` was built
- Run `npm run verify` locally

### CI publish failed

- Check `NPM_TOKEN` secret is set in GitHub repo
- Verify npm token has publish access to `@commerce-atoms` scope
- Check CI logs for specific error
