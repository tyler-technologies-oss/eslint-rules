import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import tseslint from 'typescript-eslint';

/**
 * Stylistic ESLint configuration for TypeScript files.
 */
export default (_plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  ...tseslint.configs.stylistic,
  {
    name: '@tylertech-eslint/typescript-stylistic-config',
    rules: {
      // Off
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // Warn
      '@typescript-eslint/no-inferrable-types': [
        'warn',
        {
          ignoreParameters: true,
        },
      ],
    },
  },
];
