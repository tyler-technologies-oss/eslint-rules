# Tyler Tech ESLint Plugin

An ESLint plugin with the Tyler Tech recommended rules and configurations for JavaScript and TypeScript files. This plugin builds on top of the recommended
ESLint and TypeScript ESLint rules, providing additional custom rules and configurations tailored to the standards and best practices of Tyler Technologies.

## Installation

To install the package run the following command:

```bash
npm install -D @tylertech/eslint-plugin
```

## Usage

This package uses the ESLint flat config format **only**, and is compatible with ESLint v9 and above.

To use it, set up your ESLint config file as follows:

1. Create a file named `eslint.config.js` (use the `.mjs` extension if your package does not use `"type": "module"`) in the root of your project if it doesn't already exist.
2. Import the plugin and define your ESLint configuration using the `defineConfig` function. This will help with type checking and autocompletion in IDEs that support it.
3. Specify the files to which the recommended configuration should apply, and optionally add any custom rules or overrides.
4. Optionally, you can also specify files or directories to ignore.

```javascript
// eslint.config.js
import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech/eslint-plugin';

// Optional if you want to use Prettier integration (see below)
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig({
  // Specify which files the recommended config should apply to
  {
    files: ['**/*.ts'],
    extends: [tylerPlugin.configs.recommended],
    rules: {
      // If applicable, add any specific rules you want to override or add here
    }
  },

  // If you want to lint just JavaScript files separately, you can extend the base configuration
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tylerPlugin.configs.base],
    rules: {
      // If applicable, add any specific rules you want to override or add here
    }
  },

  // Optional: this plugin also provides recommended rules intended for test files
  {
    files: ['**/*.test.ts'],
    extends: [tylerPlugin.configs.testRecommended],
    rules: {
      // If applicable, add any specific rules you want to override or add here
    }
  }

  // Optionally ignore specific files or directories
  { ignores: ['path/to/some/direction/**/*', 'path/to/a/file.ts'] }

  // If you're using Prettier, you can also extend the Prettier recommended config to avoid conflicts with formatting
  // **Must be the last item in the config array**
  eslintPluginPrettierRecommended
});
```

## Configurations

This plugin provides the following configurations:

| Configuration Name | Description |
|--------------------|-------------|
| `base` | The base configuration that includes both the default ESLint recommended rules, and our recommended JavaScript rules. This is the foundation for all other configurations. |
| `strict` | A strict set of rules for JavaScript and TypeScript files, enforcing best practices and coding standards. |
| `recommended` | A recommended set of rules for JavaScript and TypeScript files. |
| `testRecommended` | A recommended set of rules specifically for test files, with more relaxed rules for testing purposes. |

> Note: The `recommended` configuration should cover your test files as well, but you can use the `testRecommended` configuration to apply more relaxed rules specifically for tests.

## Custom Rules

This plugin includes the following custom rules:

| Rule Name | Description | Default Severity |
|-----------|-------------| ------------|
| `@tylertech-eslint/invalid-relative-import-prefix` | Disallows relative imports that start with `./../`. | `error` |
| `@tylertech-eslint/require-private-modifier`       | Enforces the use of the `private` modifier for class members that start with an underscore (`_`). | `error` |
| `@tylertech-eslint/require-private-underscore`     | Enforces the use of an underscore (`_`) prefix for class members that are marked as `private`. | `error` |
