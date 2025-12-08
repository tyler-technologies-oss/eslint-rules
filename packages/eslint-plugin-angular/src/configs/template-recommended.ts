import angularEslint from 'angular-eslint';
import { type FlatConfig } from '@typescript-eslint/utils/ts-eslint';

/**
 * Recommended ESLint configuration for Angular templates.
 */
const config: FlatConfig.ConfigArray = [
  ...angularEslint.configs.templateRecommended,
  ...angularEslint.configs.templateAccessibility,
  {
    languageOptions: {
      parser: angularEslint.templateParser,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@angular-eslint/template': angularEslint.templatePlugin,
    },
    rules: {},
  },
];

export default config;
