# Releasing Packages

This document describes the release process for `@commerce-atoms/*` packages.

## Overview

Releases are fully automated using Changesets.

1. Add a Changeset in your PR
2. Merge to `main`
3. CI versions packages and publishes to npm

Manual tagging and `npm version` are not used.

## Release Process

### 1. Add a changeset

After making changes to a package:

```bash
npx changeset
```

This will:
- Prompt you to select which packages changed
- Ask for the bump type (patch/minor/major)
- Ask for a summary of changes
- Create a changeset file in `.changeset/`

**Version Strategy:**

- `patch`: Bug fixes (backward compatible)
- `minor`: New features (backward compatible)
- `major`: Breaking changes

**0.x Semver Policy:** During 0.x, breaking changes bump **minor** (0.MINOR.PATCH). After 1.0, breaking changes bump major.

### 2. Commit the changeset

```bash
git add .changeset
git commit -m "chore: add changeset for <package-name>"
git push
```

### 3. Merge to main

Once your PR is merged to `main`:
- GitHub Actions automatically runs `changeset version`
- Creates a "Version Packages" PR
- Merge that PR to trigger automatic publishing to npm

## Independent Versioning

Each package is versioned independently:

- `@commerce-atoms/urlstate` can be at `0.1.0` while `@commerce-atoms/variants` is at `0.2.0`
- Never synchronize versions across packages
- Each package maintains its own `CHANGELOG.md`

## Troubleshooting

### "Package already exists"

- Version already published to npm
- Run `npx changeset version` again to bump

### "No changesets found"

- You need to add a changeset first: `npx changeset`
- Commit it before running `npx changeset version`

### "Missing files in pack"

- Check `files` array in `package.json`
- Verify `dist/` was built
- Run `npm run verify` locally
