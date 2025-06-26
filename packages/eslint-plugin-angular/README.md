# Tyler Tech ESLint Plugin for Angular

An ESLint plugin with the Tyler Tech recommended rules and configurations for Angular projects. This plugin builds on top of the recommended
Angular ESLint rules, providing rules and configurations tailored to the standards and best practices of Tyler Technologies.

## Installation

To install the package, run the following command:

```bash
npm install -D @tylertech-eslint/eslint-plugin-angular
```

> This package depends on the [angular-eslint](https://github.com/angular-eslint/angular-eslint/) project, and includes the recommended rules for Angular projects.

## Usage

This package uses the ESLint flat config format **only**, and is compatible with ESLint v9 and above.

> **Note:** This plugin is for use with Angular v19 and above.

To use it, set up your ESLint config file as follows:

1. Update your `eslint.config.js` config file (or create it if it doesn't already exist) in the root of your project.
2. Import the Tyler Tech ESLint plugin for Angular and the Angular template config.
3. Specify the files to which the TypeScript rules should apply, and optionally add any custom rules or overrides.
4. Specify the files to which the HTML rules should apply for the Angular templates, and optionally add any custom rules or overrides.
5. Optionally, you can also specify files or directories to ignore.


```javascript
// eslint.config.js
import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';
import tylerAngularPlugin from '@tylertech-eslint/eslint-plugin-angular';

export default defineConfig([
  // Tyler Tech recommended TypeScript rules for Angular projects
  {
    files: ['src/**/*.ts'],
    extends: [
      tylerPlugin.configs.recommended, // General Tyler Tech recommended TypeScript rules
      tylerAngularPlugin.configs.recommended // Recommended Angular specific TypeScript rules
    ],
    rules: {
      // If applicable, add any specific rules you want to override or add here
    }
  },

  // Tyler Tech recommended HTML rules for Angular templates
  {
    files: ['src/**/*.html'],
    extends: [tylerAngularPlugin.configs.templateRecommended], // Recommended Angular specific HTML template rules
    rules: {
      // If applicable, add any specific rules you want to override or add here
    }
  }
]);
```

## Configurations

This plugin provides the following configurations:

| Configuration Name | Description |
|--------------------|-------------|
| `recommended` | A recommended set of TypeScript rules for Angular projects |
| `templateRecommended` | A recommended set of rules specifically for Angular HTML templates. |
