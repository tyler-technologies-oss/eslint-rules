import { Linter } from 'eslint';
import plugin from '../../index';

/**
 * These tests guard that every exported config is well-formed and loads without
 * throwing (a missing/renamed rule id makes ESLint throw at config resolution).
 * They complement the per-rule RuleTester suites, which cover rule behavior.
 */
describe('exported configs', () => {
  const configs = plugin.configs as Record<string, unknown>;

  it('exposes the documented config names', () => {
    expect(Object.keys(configs).sort()).toEqual(
      [
        'recommended',
        'strict',
        'tsRecommended',
        'tsStrict',
        'tsStylistic',
      ].sort(),
    );
  });

  // JavaScript configs use the default parser, so they can be exercised directly
  // against an in-memory source without a TypeScript program.
  describe.each(['recommended', 'strict'] as const)('%s (JavaScript)', name => {
    it('loads and lints a fixture without a config error', () => {
      const linter = new Linter();
      const messages = linter.verify(
        'var x = 1;\n',
        configs[name] as Linter.Config[],
        'sample.js',
      );
      // verify() returns lint messages (and throws on an invalid config), so a
      // returned array proves the config resolved.
      expect(Array.isArray(messages)).toBe(true);
      // `no-var` is enabled by the recommended config (and inherited by strict).
      expect(messages.some(m => m.ruleId === 'no-var')).toBe(true);
    });
  });

  it('tsRecommended enables the plugin custom rules as errors', () => {
    const customRules = [
      '@tylertech-eslint/require-private-underscore',
      '@tylertech-eslint/require-private-modifier',
      '@tylertech-eslint/invalid-relative-import-prefix',
    ];
    const tsRecommended = configs.tsRecommended as Array<{
      rules?: Record<string, unknown>;
    }>;
    const enabled = tsRecommended.find(
      c => c.rules && customRules.every(r => r in (c.rules as object)),
    );
    expect(enabled).toBeDefined();
    for (const rule of customRules) {
      expect(enabled!.rules![rule]).toBe('error');
    }
  });
});
