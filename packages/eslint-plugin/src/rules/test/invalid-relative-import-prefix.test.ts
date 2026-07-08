import { RuleTester } from 'eslint';
import rule from '../invalid-relative-import-prefix';

const eslintTester = new RuleTester({
  languageOptions: {
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  },
});

eslintTester.run('invalid-relative-import-prefix', rule as any, {
  valid: [
    // Well-formed relative imports that do not start with `./../`
    'import test from "../../test"',
    'import test from "../test"',
    'import test from "./test"',
    "import test from './nested/test'",
    // Non-relative (bare / scoped package) imports are never flagged
    'import test from "test"',
    'import { thing } from "@scope/pkg"',
  ],
  invalid: [
    {
      code: 'import test from "./../test"',
      errors: [
        {
          messageId: 'invalidRelativeImportPrefix',
          line: 1,
          column: 18,
        },
      ],
      output: 'import test from "../../test"',
    },
    // Deeper redundant prefix: the fixer replaces the leading `"./` with `"../`
    {
      code: 'import test from "./../../test"',
      errors: [{ messageId: 'invalidRelativeImportPrefix' }],
      output: 'import test from "../../../test"',
    },
    // Single-quoted source is handled and the quote style is preserved
    {
      code: "import test from './../test'",
      errors: [{ messageId: 'invalidRelativeImportPrefix' }],
      output: "import test from '../../test'",
    },
  ],
});
