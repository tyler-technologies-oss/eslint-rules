import tseslint from 'typescript-eslint';
import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import createTypeScriptRecommendedConfig from './ts-recommended';
import createStrictConfig from './strict';

/**
 * Strict ESLint configuration for TypeScript files.
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  ...createStrictConfig(plugin), // Should we be worried about the order here from JS strict config?
  ...createTypeScriptRecommendedConfig(plugin),
  {
    name: '@tylertech-eslint/typescript-strict-config',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@tylertech-eslint': plugin,
    },
    rules: {
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
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
];
