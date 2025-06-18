import type { Linter } from '@typescript-eslint/utils/ts-eslint';
import requirePrivateUnderscore, { RULE_NAME as requirePrivateUnderscoreRuleName } from './require-private-underscore';
import requirePrivateModifier, { RULE_NAME as requirePrivateModifierRuleName } from './require-private-modifier';
import invalidRelativeImportPrefix, {
  RULE_NAME as invalidRelativeImportPrefixRuleName,
} from './invalid-relative-import-prefix';

const rules = {
  [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
  [requirePrivateModifierRuleName]: requirePrivateModifier,
  [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix,
} satisfies Linter.PluginRules;

export default rules;
