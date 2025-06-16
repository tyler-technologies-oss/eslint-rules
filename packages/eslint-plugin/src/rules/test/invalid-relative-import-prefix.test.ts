import { RuleTester } from 'eslint';
import rule from '../invalid-relative-import-prefix';

const eslintTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaVersion: 2020, sourceType: 'module' } }
});

eslintTester.run('invalid-relative-import-prefix', rule as any, {
  valid: ['import test from "../../test"'],
  invalid: [
    {
      code: 'import test from "./../test"',
      errors: [{ message: 'Relative import statements cannot start with "./../' }],
      output: 'import test from "../../test"'
    }
  ]
});
