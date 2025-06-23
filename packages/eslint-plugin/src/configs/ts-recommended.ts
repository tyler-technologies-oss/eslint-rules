import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import tseslint from 'typescript-eslint';
import createRecommendedConfig from './recommended';

/**
 * Recommended ESLint configuration for TypeScript files.
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  ...createRecommendedConfig(plugin),
  ...tseslint.configs.recommended,
  {
    name: '@tylertech-eslint/typescript-recommended-config',
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@tylertech-eslint': plugin,
    },
    rules: {
      // Apply our custom TypeScript rules
      '@tylertech-eslint/require-private-underscore': 'error',
      '@tylertech-eslint/require-private-modifier': 'error',
      '@tylertech-eslint/invalid-relative-import-prefix': 'error',

      // Recommended TypeScript rules

      // Warn (all turned to error in strict config)
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'warn',

      // Error
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'always' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            Object: {
              message: 'Avoid using the `Object` type. Did you mean `object`?',
            },
            Function: {
              message:
                'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
            },
            Boolean: {
              message:
                'Avoid using the `Boolean` type. Did you mean `boolean`?',
            },
            Number: {
              message: 'Avoid using the `Number` type. Did you mean `number`?',
            },
            String: {
              message: 'Avoid using the `String` type. Did you mean `string`?',
            },
            Symbol: {
              message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
            },
          },
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all',
        },
      ],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
];
