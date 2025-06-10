import { globalIgnores } from 'eslint/config';
import baseConfig from './base';
import typescriptConfig from './typescript';
import testConfig from './test';

export default [
  globalIgnores(
    [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/temp/',
      '**/.cache/',
      '**/coverage/',
      '**/.coverage/',
      '**/*.min.js',
      '**/*.d.ts'
    ],
    'Global ignores'
  ),
  ...baseConfig,
  ...typescriptConfig,
  ...testConfig
];
