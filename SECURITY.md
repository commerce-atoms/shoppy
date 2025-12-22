# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version        | Supported          |
| -------------- | ------------------ |
| Latest release | :white_check_mark: |

**Current Status**: Packages are in development (0.x versions). Security updates are provided for the latest published version. Once packages reach 1.0.0, we will follow semantic versioning with support for the latest minor release within each major version.

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue.

Instead, please report it via GitHub's private vulnerability reporting feature:

1. **GitHub Security Advisory**: Use the "Report a vulnerability" button on the repository's Security tab, or visit: https://github.com/commerce-atoms/shoppy/security/advisories/new

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity and complexity

### Disclosure Policy

- We will acknowledge receipt of your report within 48 hours
- We will keep you informed of the progress toward fixing the vulnerability
- We will notify you when the vulnerability has been fixed
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using Shoppy packages:

- Always use the latest stable version
- Review dependency updates regularly
- Follow secure coding practices in your application
- Do not commit sensitive data (API keys, tokens, etc.) to version control

## Known Security Considerations

- **No runtime dependencies**: Shoppy packages are designed to be dependency-free to minimize attack surface
- **Pure functions**: All functions are pure (no side effects), reducing risk of injection attacks
- **Type safety**: TypeScript strict mode helps prevent type-related vulnerabilities
