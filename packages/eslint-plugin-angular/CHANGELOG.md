# @tylertech-eslint/eslint-plugin-angular

## 4.0.1

### Patch Changes

- 939271f: Fix `recommended` config: `@angular-eslint/directive-selector` now explicitly sets `prefix: []`, matching `@angular-eslint/component-selector`.

  Previously the rule had no `prefix` option, so it silently inherited whatever default `angular-eslint`'s own `directive-selector` rule shipped with. That default was `''` (no requirement) on `angular-eslint` v20, but changed to `'app'` on v21+. Since this plugin's `angular-eslint` peer dependency range includes v21/v22, consumers who upgraded picked up a new, unintended `directive-selector` error requiring an `app` prefix on every `@Directive` selector, even in codebases with no such naming convention (e.g. `angular.json`'s `prefix: ""`).

  This fix restores the intended behavior: the `recommended` config does not require any directive selector prefix unless a consumer opts in by overriding the rule. This is a bug fix, not a behavior tightening — it can only make previously-flagged directive selectors pass, never the reverse.

## 4.0.0

### Major Changes

- a71651e: Add support for ESLint 10 and drop support for ESLint 9.

  **Breaking changes:**

  - **ESLint 10 is now required.** The `eslint` peer dependency is now `^10.0.0` (previously `>=9`). ESLint 9 reaches end-of-life on 2026-08-06.
  - **Node.js floor raised** to `^20.19.0 || ^22.13.0 || >=24` to match ESLint 10's supported runtimes (Node 18, 21, and 23 are no longer supported).
  - **`@tylertech-eslint/eslint-plugin-angular`**: `angular-eslint` is now a **peer dependency** (`^21.4.0 || ^22.0.0`) instead of a bundled dependency.
    - **Why:** the plugin re-exports angular-eslint's own plugin/parser objects, and angular-eslint's version is tied to your Angular/CLI version. A peer means one shared, consumer-controlled copy — which lets a single release support both Angular 21 and 22 teams, avoids `Cannot redefine plugin '@angular-eslint'` errors when your app already configures angular-eslint, and decouples our release cadence from angular-eslint's ESLint-10 support.
    - **What you do — install only, no config changes.** Add angular-eslint to your devDependencies matching your Angular major: `npm i -D @tylertech-eslint/eslint-plugin-angular angular-eslint@22` (or `angular-eslint@21` for Angular 21). Your `eslint.config` is unchanged — keep extending `configs.recommended` / `configs.templateRecommended`; the plugin still wires up all angular-eslint plugins, the template parser, and rules for you.
    - **Note by package manager:** pnpm/yarn require the explicit install; npm 7+ auto-installs the missing peer but resolves the newest in-range version (22) regardless of your Angular major, so Angular 21 teams should pin `angular-eslint@21` explicitly.
  - **`@tylertech-eslint/eslint-plugin-angular`**: the `@angular-eslint/no-conflicting-lifecycle` rule is no longer enabled by the `recommended` config, because it was removed in angular-eslint v22. This keeps the config working on both angular-eslint v21 and v22.
  - The `recommended`/`strict`/`ts*` configs now inherit ESLint 10's updated `eslint:recommended` set, which newly enables `no-unassigned-vars`, `no-useless-assignment`, and `preserve-caught-error`. Existing code may surface new warnings/errors from these core rules.
  - **`@tylertech-eslint/eslint-plugin` (`invalid-relative-import-prefix`)**: fixed the autofix so it strips the redundant leading `./` (e.g. `./../x` → `../x`) instead of adding an extra parent segment (previously `./../x` → `../../x`, which could rewrite an import to a different file). The reported violation is unchanged; only the `--fix` output differs.

  Internal: bumped `typescript-eslint`, `@typescript-eslint/utils`, `@typescript-eslint/rule-tester` to `^8.63.0` (first 8.x line to declare ESLint 10 support) and `@eslint/js` to `^10.0.0`. Removed the now-unnecessary `@types/eslint` dev dependency (ESLint 10 ships its own type definitions). Moved `@typescript-eslint/rule-tester` to `devDependencies` (it is only used by this package's tests) so it is no longer installed into consumers of `@tylertech-eslint/eslint-plugin`.

## 3.0.1

### Patch Changes

- d3a3fd8: - Updated `angular-eslint` dependency to ^20.7.0
  - Improved TypeScript typings
  - Fixed security vulnerability in `tmp` transitive dependency

## 3.0.0

### Major Changes

- dcbe1dc: upgrade to support eslint v9 and flat config format
