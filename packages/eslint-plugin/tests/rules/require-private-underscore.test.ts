import { TSESLint } from '@typescript-eslint/experimental-utils';
import rule from '../../src/rules/require-private-underscore';

const parser = require.resolve('@typescript-eslint/parser');
var eslintTester = new TSESLint.RuleTester({ parser: parser });
const invalidCode = `
class Test {
    _test = '';
}
`;
const validCode = `
class Test {
    private _test = '';
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
    private _test() { 
        return true
    }
}
`;

const invalidCodeGetMethod = `
class Test {
    get _test() { 
        return true
    }
}
`;
const validCodeGetMethod = `
class Test {
    private get _test() { 
        return true
    }
}
`;

eslintTester.run('require-private-underscore', rule as any, {
    valid: [validCode],
    invalid: [
        {
            code: invalidCode,
            errors: [{ messageId: 'requirePrivateUnderscore', }],
            output: validCode
        }]
})

eslintTester.run('require-private-underscore-member', rule as any, {
    valid: [validCodeMethod],
    invalid: [
        {
            code: invalidCodeMethod,
            errors: [{ messageId: 'requirePrivateUnderscore', }],
            output: validCodeMethod
        }]
})

eslintTester.run('require-private-underscore-member', rule as any, {
    valid: [validCodeGetMethod],
    invalid: [
        {
            code: invalidCodeGetMethod,
            errors: [{ messageId: 'requirePrivateUnderscore', }],
            output: validCodeGetMethod
        }]
})