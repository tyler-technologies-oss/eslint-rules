/**
 * Configuration for test files with relaxed rules
 */
export default [
  {
    files: ['**/*.{test,spec}.{ts,mts,js,mjs}'],
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
      'spaced-comment': 'off',
      'prefer-const': 'off'
    },
    name: '@tylertech-eslint/test-config'
  }
];
