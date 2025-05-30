import invalidRelativeImportPrefix, { RULE_NAME as invalidRelativeImportPrefixRuleName } from './invalid-relative-import-prefix.js';
import requirePrivateUnderscore, { RULE_NAME as requirePrivateUnderscoreRuleName } from './require-private-underscore.js';
import requirePrivateModifier, { RULE_NAME as requirePrivateModifierRuleName } from './require-private-modifier.js';

export default {
  rules: {
    [requirePrivateModifierRuleName]: requirePrivateModifier,
    [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
    [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix
  }
};
