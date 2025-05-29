export default [
  {
    languageOptions: {
      parser: (await import('@angular-eslint/template-parser')).default,
    },
    plugins: {
      '@angular-eslint/template': (await import('@angular-eslint/eslint-plugin-template')).default,
    }
  }
];
