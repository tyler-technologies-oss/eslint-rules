import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

/**
 * Configuration for test files with relaxed rules
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  {
    name: '@tylertech-eslint/test-config',
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    plugins: {
      '@tylertech-eslint': plugin,
    },
    rules: {
      // Relaxed TypeScript rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Relaxed JavaScript rules for test files
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
];
