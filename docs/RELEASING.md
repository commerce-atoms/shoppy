# Releasing Packages

This document describes the release process for `@commerce-atoms/*` packages.

## Overview

Releases use **Changesets** for version management and changelog generation.

**Flow:** Add changeset → Version → Commit → Publish

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

### 3. Version packages (when ready to release)

```bash
npx changeset version
```

This will:
- Update package.json versions
- Update CHANGELOG.md files
- Delete consumed changeset files

### 4. Commit version changes

```bash
git add .
git commit -m "chore: version packages"
git push
```

### 5. Publish (manual for now)

```bash
npx changeset publish
```

This will:
- Build packages
- Publish to npm
- Create git tags automatically

Then push tags:

```bash
git push --follow-tags
```

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
