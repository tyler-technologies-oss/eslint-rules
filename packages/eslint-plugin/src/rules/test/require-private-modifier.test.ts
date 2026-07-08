import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../require-private-modifier';
import { parser } from 'typescript-eslint';

const eslintTester = new RuleTester({ languageOptions: { parser } });

eslintTester.run('require-private-modifier', rule, {
  valid: [
    // Private/protected members that already start with an underscore
    `class Test { private _test = ''; }`,
    `class Test { protected _test = ''; }`,
    `class Test { private _test() { return true; } }`,
    // Members without a private/protected modifier are out of scope for this rule
    `class Test { public test = ''; }`,
    `class Test { test = ''; }`,
    // The constructor is explicitly exempt even when marked private
    `class Test { private constructor() {} }`,
  ],
  invalid: [
    // Property with a private modifier must start with an underscore
    {
      code: `class Test { private test = ''; }`,
      errors: [
        {
          messageId: 'requirePrivateModifier',
          data: { nodeInfo: '_test' },
          line: 1,
        },
      ],
      output: `class Test { private _test = ''; }`,
    },
    // Same enforcement for protected members
    {
      code: `class Test { protected test = ''; }`,
      errors: [{ messageId: 'requirePrivateModifier' }],
      output: `class Test { protected _test = ''; }`,
    },
    // Static private members are covered
    {
      code: `class Test { private static test = ''; }`,
      errors: [{ messageId: 'requirePrivateModifier' }],
      output: `class Test { private static _test = ''; }`,
    },
    // Methods are covered as well as properties
    {
      code: `class Test { private test() { return true; } }`,
      errors: [{ messageId: 'requirePrivateModifier' }],
      output: `class Test { private _test() { return true; } }`,
    },
    // Multiple violations in a single class are all reported and fixed
    {
      code: `class Test { private a = 1; protected b = 2; }`,
      errors: [
        { messageId: 'requirePrivateModifier' },
        { messageId: 'requirePrivateModifier' },
      ],
      output: `class Test { private _a = 1; protected _b = 2; }`,
    },
  ],
});
