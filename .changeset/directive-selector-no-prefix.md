---
"@tylertech-eslint/eslint-plugin-angular": patch
---

Fix `recommended` config: `@angular-eslint/directive-selector` now explicitly sets `prefix: []`, matching `@angular-eslint/component-selector`.

Previously the rule had no `prefix` option, so it silently inherited whatever default `angular-eslint`'s own `directive-selector` rule shipped with. That default was `''` (no requirement) on `angular-eslint` v20, but changed to `'app'` on v21+. Since this plugin's `angular-eslint` peer dependency range includes v21/v22, consumers who upgraded picked up a new, unintended `directive-selector` error requiring an `app` prefix on every `@Directive` selector, even in codebases with no such naming convention (e.g. `angular.json`'s `prefix: ""`).

This fix restores the intended behavior: the `recommended` config does not require any directive selector prefix unless a consumer opts in by overriding the rule. This is a bug fix, not a behavior tightening — it can only make previously-flagged directive selectors pass, never the reverse.
