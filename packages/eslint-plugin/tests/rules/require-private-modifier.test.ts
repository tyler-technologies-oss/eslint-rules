import { TSESLint } from '@typescript-eslint/experimental-utils';
import rule from '../../src/rules/require-private-modifier';

const parser = require.resolve('@typescript-eslint/parser');

const eslintTester = new TSESLint.RuleTester({ parser: parser });

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
            errors: [{ messageId: 'requirePrivateModifier', }],
            output: validCode
        }]
})

eslintTester.run('require-private-modifier', rule as any, {
    valid: [validCodeMethod],
    invalid: [
        {
            code: invalidCodeMethod,
            errors: [{ messageId: 'requirePrivateModifier' }],
            output: validCodeMethod
        }]
})