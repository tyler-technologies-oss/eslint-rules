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
