---
'@tylertech-eslint/eslint-plugin': major
'@tylertech-eslint/eslint-plugin-angular': patch
---

# BREAKING CHANGE

Upgraded to `projectService` for improved performance with typescript-eslint >= 8.0.0. This change requires updating your ESLint configuration.

## Migration Guide

Update your ESLint config to use `projectService` instead of `project`:

**Before:**
```js
parserOptions: {
  project: true,
}
```

**After:**
```js
parserOptions: {
  projectService: true,
}
```

This change provides better type-aware linting performance and resolves security vulnerabilities in transitive dependencies.
