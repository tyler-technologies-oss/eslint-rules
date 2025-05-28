// Note: For ESM/Flat config, import the config in your ESLint flat config file directly.
// import recommended from './configs/recommended.config.js';
import invalidRelativeImportPrefix, { RULE_NAME as invalidRelativeImportPrefixRuleName } from './rules/invalid-relative-Import-prefix';
import requirePrivateUnderscore, { RULE_NAME as requirePrivateUnderscoreRuleName } from './rules/require-private-underscore';
import requirePrivateModifier, { RULE_NAME as requirePrivateModifierRuleName } from './rules/require-private-modifier';


export const rules = {
    [requirePrivateModifierRuleName]: requirePrivateModifier,
    [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
    [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix
};