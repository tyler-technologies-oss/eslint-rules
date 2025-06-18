# Ensure relative import paths do not start with redundant `./../` (`@tylertech-eslint/require-private-underscore`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/tyler-technologies-oss/eslint-rules/blob/main/packages/eslint-plugin/src/configs/typescript.ts).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This

The following patterns are considered errors:

```js
import { MyClass } from './../my-class'; // Error: Relative import path starts with `./../`
```

These patterns would not be considered errors:

```js
import { MyClass } from './my-class'; // Correct: Relative import path does not start with `./../`
import { MyClass } from '../my-class'; // Correct: Relative import path does not start with `./../`
```

## When Not To Use It

- If you are not using relative imports or do not have a need for this rule, you can disable it.
- If your project does not _require_ relative import paths to avoid starting with `./../`, you can disable this rule. Some build tooling does not handle this convention well.
