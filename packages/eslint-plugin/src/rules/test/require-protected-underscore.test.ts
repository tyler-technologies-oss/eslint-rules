import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../require-protected-underscore';
import { parser } from 'typescript-eslint';

const eslintTester = new RuleTester({ languageOptions: { parser } });

const invalidCode = `
class Test {
    protected test = '';
}
`;
const validCode = `
class Test {
    protected _test = '';
}
`;
const invalidCodeMethod = `
class Test {
    protected test() {
        return true;
    }
}
`;
const validCodeMethod = `
class Test {
    protected _test() {
        return true;
    }
}
`;

const invalidCodeGetMethod = `
class Test {
    protected get test() {
        return true;
    }
}
`;
const validCodeGetMethod = `
class Test {
    protected get _test() {
        return true;
    }
}
`;

eslintTester.run('require-protected-underscore', rule as any, {
  valid: [validCode],
  invalid: [
    {
      code: invalidCode,
      errors: [{ messageId: 'requireProtectedUnderscore' }],
      output: validCode,
    },
  ],
});

eslintTester.run('require-protected-underscore-member', rule as any, {
  valid: [validCodeMethod],
  invalid: [
    {
      code: invalidCodeMethod,
      errors: [{ messageId: 'requireProtectedUnderscore' }],
      output: validCodeMethod,
    },
  ],
});

eslintTester.run('require-protected-underscore-member', rule as any, {
  valid: [validCodeGetMethod],
  invalid: [
    {
      code: invalidCodeGetMethod,
      errors: [{ messageId: 'requireProtectedUnderscore' }],
      output: validCodeGetMethod,
    },
  ],
});
