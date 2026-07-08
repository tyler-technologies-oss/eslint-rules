import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../require-protected-modifier';
import { parser } from 'typescript-eslint';

const eslintTester = new RuleTester({ languageOptions: { parser } });

const invalidCode = `
class Test {
    _test = '';
}
`;

const validCode = `
class Test {
    protected _test = '';
}
`;

const invalidCodeMethod = `
class Test {
    _test() {
        return true
    }
}
`;

const validCodeMethod = `
class Test {
    protected _test() {
        return true
    }
}
`;

const validCodePrivate = `
class Test {
    private _test = '';
}
`;

const validCodeMethodPrivate = `
class Test {
    private _test() {
        return true
    }
}
`;

const invalidCodePublic = `
class Test {
    public _test = '';
}
`;

const invalidCodeMethodPublic = `
class Test {
    public _test() {
        return true
    }
}
`;

eslintTester.run('require-protected-modifier', rule as any, {
  valid: [validCode, validCodePrivate],
  invalid: [
    {
      code: invalidCode,
      errors: [{ messageId: 'requireProtectedModifier' }],
      output: validCode,
    },
    {
      code: invalidCodePublic,
      errors: [{ messageId: 'requireProtectedModifier' }],
      output: validCode,
    },
  ],
});

eslintTester.run('require-protected-modifier', rule, {
  valid: [validCodeMethod, validCodeMethodPrivate],
  invalid: [
    {
      code: invalidCodeMethod,
      errors: [{ messageId: 'requireProtectedModifier' }],
      output: validCodeMethod,
    },
    {
      code: invalidCodeMethodPublic,
      errors: [{ messageId: 'requireProtectedModifier' }],
      output: validCodeMethod,
    },
  ],
});
