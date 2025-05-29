import templatePlugin from '@angular-eslint/eslint-plugin-template';

export default [
  {
    languageOptions: {
      parser: templateParser,
      parserOptions: {
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@angular-eslint/template': templatePlugin,
    },
    rules: {
      // Include all the recommended rules from @angular-eslint/template
      ...templatePlugin.configs.recommended.rules
    }
  }
];
