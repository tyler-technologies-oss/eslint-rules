import { globalIgnores } from 'eslint/config';

export default globalIgnores(
  [
    '**/node_modules/',
    '**/dist/',
    '**/build/',
    '**/temp/',
    '**/.cache/',
    '**/coverage/',
    '**/.coverage/',
    '**/*.min.js',
    '**/*.d.ts',
  ],
  '@tylertech-eslint/global-ignores',
);
