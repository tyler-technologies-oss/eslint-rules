import angularEslint from 'angular-eslint';

/**
 * Recommended ESLint configuration for Angular templates.
 */
export default [
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
