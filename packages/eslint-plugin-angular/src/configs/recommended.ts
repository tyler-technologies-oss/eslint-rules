import tseslint from 'typescript-eslint';
import angularEslint from 'angular-eslint';
import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

/**
 * Recommended ESLint configuration for Angular projects.
 */
export default [
  ...angularEslint.configs.tsRecommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@angular-eslint': angularEslint.tsPlugin,
    },
    rules: {
      // JavaScript rules
      'no-restricted-imports': ['error', 'rxjs/Rx'],

      // Angular rules
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: [],
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
    },
  },
] satisfies FlatConfig.ConfigArray;
