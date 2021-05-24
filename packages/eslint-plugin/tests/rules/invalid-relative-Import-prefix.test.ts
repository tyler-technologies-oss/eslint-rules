/**
 * @fileoverview Tests for no-with rule.
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../src/rules/invalid-relative-Import-prefix';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: "module" }, });

eslintTester.run('invalid-relative-import-prefix', rule as any, {
    valid: ['import test from "../../"'],
    invalid: [{ code: 'import test from "./../"', errors: [{ message: 'Relative import statements cannot start with "./../' }] }]
})