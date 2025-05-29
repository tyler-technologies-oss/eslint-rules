import templatePlugin from '@angular-eslint/eslint-plugin-template';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
