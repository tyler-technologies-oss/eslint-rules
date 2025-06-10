import js from '@eslint/js';
import globals from 'globals';
import customRules from '../rules';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      '@tylertech-eslint': customRules
    },
    rules: {
      // Use ESLint's recommended rules for JavaScript
      ...js.configs.recommended.rules,

      // Apply our custom rules
      '@tylertech-eslint/require-private-underscore': 'error',
      '@tylertech-eslint/require-private-modifier': 'error',
      '@tylertech-eslint/invalid-relative-import-prefix': 'error',

      // Set our general JavaScript rules
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-body-style': 'off',
      'arrow-parens': ['off', 'always'],
      'comma-dangle': 'off',
      'comma-spacing': 'error',
      complexity: 'off',
      curly: 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': [
        'error',
        'any',
        'Number',
        'number',
        'String',
        'string',
        'Boolean',
        'boolean',
        'Undefined',
        'undefined'
      ],
      'id-match': 'error',
      'import/order': 'off',
      'max-classes-per-file': 'off',
      'max-len': 'off',
      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-empty': 'off',
      'no-eval': 'error',
      'no-extra-parens': 'off',
      'no-invalid-this': 'off',
      'no-multiple-empty-lines': 'off',
      'no-new-wrappers': 'error',
      'no-restricted-imports': ['error', 'rxjs/Rx'],
      'no-throw-literal': 'error',
      'no-trailing-spaces': ['error', { ignoreComments: true, skipBlankLines: true }],
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'quote-props': ['error', 'as-needed', { unnecessary: false }],
      radix: 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          asyncArrow: 'always',
          named: 'never'
        }
      ],
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/']
        }
      ],
      'valid-typeof': 'off'
    },
    name: '@tylertech-eslint/base-config'
  }
];
