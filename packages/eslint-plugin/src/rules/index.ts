import invalidRelativeImportPrefix, { RULE_NAME as invalidRelativeImportPrefixRuleName } from './invalid-relative-Import-prefix';
import requirePrivateUnderscore, { RULE_NAME as requirePrivateUnderscoreRuleName } from './require-private-underscore';
import requirePrivateModifier, { RULE_NAME as requirePrivateModifierRuleName } from './require-private-modifier';

export const rules = {
    [requirePrivateModifierRuleName]: requirePrivateModifier,
    [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
    [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix
};
