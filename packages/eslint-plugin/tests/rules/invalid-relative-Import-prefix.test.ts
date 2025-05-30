import { RuleTester } from 'eslint';
import rule from '../../src/rules/invalid-relative-import-prefix';

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2020, sourceType: "module" } });

ruleTester.run('invalid-relative-import-prefix', rule as any, {
    valid: ['import test from "../../test"'],
    invalid: [
        {
            code: 'import test from "./../test"',
            errors: [{ message: 'Relative import statements cannot start with "./../' }],
            output: 'import test from "../../test"'
        }]
})