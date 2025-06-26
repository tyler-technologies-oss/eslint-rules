# Require `_` prefix on `private` or `protected` members (`@tylertech-eslint/require-private-underscore`)

💼 This rule is enabled in the ✅ `recommended` [config](https://github.com/tyler-technologies-oss/eslint-rules/blob/main/packages/eslint-plugin/src/configs/typescript.ts).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This rule looks for class members that are marked as `private` or `protected` and ensures that they start with an underscore (`_`). This is a common convention in TypeScript to indicate that a member is intended for internal use only.

The following patterns are considered errors:

```js
// Private
class MyClass {
  private myMethod() {}
}

// Protected
class MyClass {
  protected myMethod() {}
}

// Public with underscore
class MyClass {
  public _myMethod() {}
}
```

These patterns would not be considered errors:

```js
// Private
class MyClass {
  private _myMethod() {}
}

// Protected
class MyClass {
  protected _myMethod() {}
}

// Public without underscore
class MyClass {
  public myMethod() {}
}
```

## When Not To Use It

- If you are not using TypeScript or do not have a need for private or protected members, you can disable this rule.
- If you prefer to use private or protected members without the underscore prefix, you can disable this rule.
