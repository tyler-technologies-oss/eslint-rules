import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../require-private-underscore';
import { parser } from 'typescript-eslint';

const eslintTester = new RuleTester({ languageOptions: { parser } });

// NOTE: assertions here intentionally cover `messageId` + fixer `output` rather
// than the interpolated message text. The rule's `data.nodeInfo` currently
// prepends an underscore to a name that already has one (e.g. `__test`), which
// is a pre-existing message-wording quirk we don't want to lock in here.
eslintTester.run('require-private-underscore', rule, {
  valid: [
    // Members that are already private/protected and underscore-prefixed
    `class Test { private _test = ''; }`,
    `class Test { protected _test = ''; }`,
    `class Test { private _test() { return true; } }`,
    // Public members that don't start with an underscore are out of scope
    `class Test { public test = ''; }`,
    `class Test { test = ''; }`,
  ],
  invalid: [
    // Underscore-prefixed member with no accessibility modifier: `private ` is
    // inserted (the insert branch of the fixer)
    {
      code: `class Test { _test = ''; }`,
      errors: [{ messageId: 'requirePrivateUnderscore', line: 1 }],
      output: `class Test { private _test = ''; }`,
    },
    // Underscore-prefixed member marked `public`: the `public` keyword is
    // replaced with `private` (the replace branch of the fixer)
    {
      code: `class Test { public _test = ''; }`,
      errors: [{ messageId: 'requirePrivateUnderscore' }],
      output: `class Test { private _test = ''; }`,
    },
    // Methods are covered as well as properties
    {
      code: `class Test { _test() { return true; } }`,
      errors: [{ messageId: 'requirePrivateUnderscore' }],
      output: `class Test { private _test() { return true; } }`,
    },
    // Getters are covered
    {
      code: `class Test { get _test() { return true; } }`,
      errors: [{ messageId: 'requirePrivateUnderscore' }],
      output: `class Test { private get _test() { return true; } }`,
    },
  ],
});
