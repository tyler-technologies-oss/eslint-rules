import tseslint from 'typescript-eslint';
import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import globalIgnores from './ignores';
import tsRecommended from './typescript';

/**
 * Strict ESLint configuration for JavaScript and TypeScript files.
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  globalIgnores,
  ...tsRecommended(plugin),
  {
    name: '@tylertech-eslint/strict-config',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@tylertech-eslint': plugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',

      // JavaScript rules
      'no-prototype-builtins': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-extra-boolean-cast': 'error',
      'no-useless-escape': 'error',
      'prefer-rest-params': 'error',
    },
  },
];
