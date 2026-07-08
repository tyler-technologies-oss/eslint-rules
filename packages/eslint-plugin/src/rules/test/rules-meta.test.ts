import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import rules from '../index';

/**
 * Meta tests that iterate the rule registry and assert each rule carries the
 * metadata ESLint expects and has an accompanying doc file. Mirrors the meta
 * checks shipped by eslint-plugin-unicorn / typescript-eslint.
 */
const VALID_RULE_TYPES = ['problem', 'suggestion', 'layout'];
const DOCS_DIR = resolve(__dirname, '../../../docs/rules');

const ruleEntries = Object.entries(rules) as Array<[string, any]>;

describe('rule registry metadata', () => {
  it('registers at least one rule', () => {
    expect(ruleEntries.length).toBeGreaterThan(0);
  });

  describe.each(ruleEntries)('%s', (name, rule) => {
    const meta = rule.meta ?? {};

    it('has a non-empty meta.docs.description', () => {
      expect(typeof meta.docs?.description).toBe('string');
      expect(meta.docs.description.length).toBeGreaterThan(0);
    });

    it('has a valid meta.type', () => {
      expect(VALID_RULE_TYPES).toContain(meta.type);
    });

    it('declares at least one message', () => {
      expect(meta.messages).toBeDefined();
      expect(Object.keys(meta.messages).length).toBeGreaterThan(0);
    });

    it('defines meta.schema', () => {
      expect(meta.schema).toBeDefined();
    });

    it('has a matching docs/rules markdown file', () => {
      expect(existsSync(resolve(DOCS_DIR, `${name}.md`))).toBe(true);
    });
  });
});
