import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import globalIgnores from './ignores';
import js from '@eslint/js';
import globals from 'globals';

/**
 * Recommended ESLint configuration for JavaScript files.
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  globalIgnores,
  js.configs.recommended,
  {
    name: '@tylertech-eslint/recommended-config',
    languageOptions: {
      globals: {
        // Including globals from both browser and node environments for now, will reconsider later
        // if we want to limit this to just browser or node or split into separate configs.
        // We mostly work in TypeScript, and TypeScript will this for us.
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@tylertech-eslint': plugin,
    },
    rules: {
      // Recommended JavaScript rules

      // Warn (all turned to error in strict config)
      camelcase: 'warn',
      'no-prototype-builtins': 'warn',
      'no-case-declarations': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-async-promise-executor': 'warn',
      'no-useless-escape': 'warn',
      'no-loss-of-precision': 'warn',
      'dot-notation': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],

      // Error
      'prefer-rest-params': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      curly: 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-denylist': [
        'error',
        'any',
        'Number',
        'number',
        'String',
        'string',
        'Boolean',
        'boolean',
        'Undefined',
        'undefined',
      ],
      'id-match': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-eval': 'error',
      'no-new-wrappers': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      radix: 'error',
    },
  },
];
