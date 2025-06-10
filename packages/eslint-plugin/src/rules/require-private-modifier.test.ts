import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './require-private-modifier';
import { parser } from 'typescript-eslint';

const eslintTester = new RuleTester({ languageOptions: { parser } });

const invalidCode = `
class Test {
    private test = '';
}
`;

const validCode = `
class Test {
    private _test = '';
}
`;

const invalidCodeMethod = `
class Test {
    private test() { 
        return true
    }
}
`;

const validCodeMethod = `
class Test {
    private _test() { 
        return true
    }
}
`;

eslintTester.run('require-private-modifier', rule as any, {
  valid: [validCode],
  invalid: [
    {
      code: invalidCode,
      errors: [{ messageId: 'requirePrivateModifier' }],
      output: validCode
    }
  ]
});

eslintTester.run('require-private-modifier', rule, {
  valid: [validCodeMethod],
  invalid: [
    {
      code: invalidCodeMethod,
      errors: [{ messageId: 'requirePrivateModifier' }],
      output: validCodeMethod
    }
  ]
});
