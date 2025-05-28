// Flat config for ESLint v9
import base from './base.config.js';

export default [
  ...base,
  {
    rules: {}
  },
  {
    extends: [
      'plugin:@angular-eslint/template/recommended'
    ]
  }
];
