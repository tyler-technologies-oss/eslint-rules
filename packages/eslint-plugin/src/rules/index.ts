import type { Linter } from '@typescript-eslint/utils/ts-eslint';
import requirePrivateUnderscore, {
  RULE_NAME as requirePrivateUnderscoreRuleName,
} from './require-private-underscore';
import requireProtectedUnderscore, {
  RULE_NAME as requireProtectedUnderscoreRuleName,
} from './require-protected-underscore';
import requirePrivateModifier, {
  RULE_NAME as requirePrivateModifierRuleName,
} from './require-private-modifier';
import requireProtectedModifier, {
  RULE_NAME as requireProtectedModifierRuleName,
} from './require-protected-modifier';
import invalidRelativeImportPrefix, {
  RULE_NAME as invalidRelativeImportPrefixRuleName,
} from './invalid-relative-import-prefix';

const rules = {
  [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
  [requireProtectedUnderscoreRuleName]: requireProtectedUnderscore,
  [requirePrivateModifierRuleName]: requirePrivateModifier,
  [requireProtectedModifierRuleName]: requireProtectedModifier,
  [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix,
} satisfies Linter.PluginRules;

export default rules;
