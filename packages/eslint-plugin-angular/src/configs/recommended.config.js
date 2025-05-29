import base from './base.config.js';

export default [
  ...base,
  {
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: [],
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-host-metadata-property': ['error', { allowStatic: true }],
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error'
    }
  }
];
