import { Linter } from 'eslint';
import recommended from '../recommended';
import templateRecommended from '../template-recommended';

/**
 * This package ships only configs (no custom rules), so its tests verify that
 * each config loads and applies the underlying angular-eslint rules. A config
 * that references a rule which no longer exists in the installed angular-eslint
 * version makes ESLint throw at config resolution, so these tests guard against
 * that class of breakage across supported angular-eslint versions.
 */
describe('recommended (TypeScript) config', () => {
  it('loads and flags an Angular rule on a component fixture', () => {
    const linter = new Linter();
    const component = [
      "import { Component } from '@angular/core';",
      '@Component({ selector: "app-foo", template: "" })',
      'export class Foo {}',
    ].join('\n');

    // Mirror real consumer usage: the config is applied under a `files` scope
    // (e.g. `{ files: ['**/*.ts'], extends: [recommended] }`).
    const config = [{ files: ['**/*.ts'] }, ...recommended] as Linter.Config[];
    const messages = linter.verify(component, config, 'foo.component.ts');

    expect(messages.some(m => m.fatal)).toBe(false);
    // Class name without a `Component` suffix violates a recommended rule.
    expect(
      messages.some(m => m.ruleId === '@angular-eslint/component-class-suffix'),
    ).toBe(true);
  });

  it('does not require an "app" prefix on directive selectors', () => {
    const linter = new Linter();
    const directive = [
      "import { Directive } from '@angular/core';",
      '@Directive({ selector: "[tylFoo]" })',
      'export class FooDirective {}',
    ].join('\n');

    const config = [{ files: ['**/*.ts'] }, ...recommended] as Linter.Config[];
    const messages = linter.verify(directive, config, 'foo.directive.ts');

    expect(messages.some(m => m.fatal)).toBe(false);
    // Regression guard: `directive-selector` must explicitly set `prefix: []`
    // so it doesn't silently inherit angular-eslint's own default prefix
    // (which changed from '' to 'app' between angular-eslint v20 and v21).
    expect(
      messages.some(m => m.ruleId === '@angular-eslint/directive-selector'),
    ).toBe(false);
  });
});

describe('templateRecommended (HTML) config', () => {
  it('loads and flags a template accessibility rule on a template fixture', () => {
    const linter = new Linter();
    const template = '<img src="logo.png" />\n';

    const config = [
      { files: ['**/*.html'] },
      ...templateRecommended,
    ] as Linter.Config[];
    const messages = linter.verify(template, config, 'foo.component.html');

    expect(messages.some(m => m.fatal)).toBe(false);
    // <img> without a text alternative violates the accessibility rules.
    expect(
      messages.some(m => m.ruleId === '@angular-eslint/template/alt-text'),
    ).toBe(true);
  });
});
