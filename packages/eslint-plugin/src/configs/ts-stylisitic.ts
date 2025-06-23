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

      // Warn
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'warn',
        { allow: ['private-constructors', 'protected-constructors'] },
      ],
      '@typescript-eslint/no-inferrable-types': [
        'warn',
        {
          ignoreParameters: true,
        },
      ],
    },
  },
];
