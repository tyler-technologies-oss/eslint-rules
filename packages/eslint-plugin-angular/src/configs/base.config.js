// Flat config base for ESLint v9
export default [
  {
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      '@angular-eslint': (await import('@angular-eslint/eslint-plugin')).default,
    }
  }
];
