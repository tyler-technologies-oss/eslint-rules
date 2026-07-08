---
"@tylertech-eslint/eslint-plugin": major
"@tylertech-eslint/eslint-plugin-angular": major
---

Add support for ESLint 10 and drop support for ESLint 9.

**Breaking changes:**

- **ESLint 10 is now required.** The `eslint` peer dependency is now `^10.0.0` (previously `>=9`). ESLint 9 reaches end-of-life on 2026-08-06.
- **Node.js floor raised** to `^20.19.0 || ^22.13.0 || >=24` to match ESLint 10's supported runtimes (Node 18, 21, and 23 are no longer supported).
- **`@tylertech-eslint/eslint-plugin-angular`**: `angular-eslint` is now a **peer dependency** (`^21.4.0 || ^22.0.0`) instead of a bundled dependency. Install the `angular-eslint` version matching your Angular major (Angular 21 → `angular-eslint@21`, Angular 22 → `angular-eslint@22`). This lets teams on different Angular versions use the plugin.
- **`@tylertech-eslint/eslint-plugin-angular`**: the `@angular-eslint/no-conflicting-lifecycle` rule is no longer enabled by the `recommended` config, because it was removed in angular-eslint v22. This keeps the config working on both angular-eslint v21 and v22.
- The `recommended`/`strict`/`ts*` configs now inherit ESLint 10's updated `eslint:recommended` set, which newly enables `no-unassigned-vars`, `no-useless-assignment`, and `preserve-caught-error`. Existing code may surface new warnings/errors from these core rules.

Internal: bumped `typescript-eslint`, `@typescript-eslint/utils`, `@typescript-eslint/rule-tester` to `^8.63.0` (first 8.x line to declare ESLint 10 support) and `@eslint/js` to `^10.0.0`. Removed the now-unnecessary `@types/eslint` dev dependency (ESLint 10 ships its own type definitions).
