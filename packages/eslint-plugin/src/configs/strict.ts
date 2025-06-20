import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import createRecommendedConfig from './recommended';

/**
 * Strict ESLint configuration for JavaScript files.
 */
export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [
  ...createRecommendedConfig(plugin),
  {
    name: '@tylertech-eslint/strict-config',
    rules: {
      'no-prototype-builtins': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-extra-boolean-cast': 'error',
      'no-useless-escape': 'error',
      'prefer-rest-params': 'error',
      'no-loss-of-precision': 'error',
      'dot-notation': 'error',
      'prefer-object-has-own': 'error',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-undef': 'error',
      camelcase: 'error',
    },
  },
];
