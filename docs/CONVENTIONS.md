# @shoppy Conventions

This document outlines conventions for commits, PRs, and changelog entries.

## Commit Conventions

### Commit Message Format

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Test changes

### Scope (Optional)

Use package name as scope when change is package-specific:

```
feat(urlstate): add new filter helper
fix(variants): correct option matching logic
docs(money): update formatting examples
```

Use no scope for repo-wide changes:

```
docs: update README
chore: update dependencies
ci: add publish workflow
```

## Changelog Conventions

Each package maintains its own `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

### Format

```markdown
## [Unreleased]

### Added
- New features

### Changed
- Changes to existing functionality

### Fixed
- Bug fixes

## [0.1.0]

### Added
- Initial release
```

### Rules

- Add entries under `[Unreleased]` as you work
- Move entries to version section when releasing
- Use version numbers only (no dates)
- Group changes: Added, Changed, Fixed, Removed

## PR Conventions

- Keep PRs focused (one feature/fix per PR)
- Reference issues when applicable
- Ensure CI passes before requesting review
- Update changelog if user-facing changes
