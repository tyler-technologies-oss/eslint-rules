# Require `private` or `protected` modifier on members that start with `_` (`@tylertech-eslint/require-private-modifier`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/tyler-technologies-oss/eslint-rules/blob/main/packages/eslint-plugin/src/configs/typescript.ts).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This rule looks for class members that start with an underscore (`_`) and ensures that they are marked as `private` or `protected`. This is a common convention in TypeScript to indicate that a member is intended for internal use only.

The following patterns are considered errors:

```js
class MyClass {
  _myMethod() {}
}
```

These patterns would not be considered errors:

```js
// Public
class MyClass {
  myMethod() {}
}

// Private
class MyClass {
  private _myMethod() {}
}

// Protected
class MyClass {
  protected _myMethod() {}
}

// Private constructor
class MyClass {
  private constructor() {}
}
```

## When Not To Use It

- If you are not using TypeScript or do not have a need for private or protected members, you can disable this rule.
- If you prefer to use private or protected members without the underscore prefix, you can disable this rule.
