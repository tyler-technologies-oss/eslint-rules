# @tylertech-eslint/eslint-plugin

## 4.0.0

### Major Changes

- d3a3fd8: # BREAKING CHANGE

  Upgraded to `projectService` for improved performance with typescript-eslint >= 8.0.0. This change requires `typescript-eslint >= 8.0.0` as a peer dependency.

  ## Migration Guide

  **If you extend the plugin configs directly** (recommended usage), no config changes are needed. The plugin handles `projectService` internally.

  **If you manually override parserOptions** in your ESLint config, update from `project` to `projectService`:

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

  This change provides better type-aware linting performance and reduced memory usage.

## 3.0.0

### Major Changes

- dcbe1dc: upgrade to support eslint v9 and flat config format
