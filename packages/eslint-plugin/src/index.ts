import recommended from './configs/recommended.json';
import invalidRelativeImportPrefix, { RULE_NAME as invalidRelativeImportPrefixRuleName } from './rules/invalid-relative-Import-prefix';
import requirePrivateUnderscore, { RULE_NAME as requirePrivateUnderscoreRuleName } from './rules/require-private-underscore';
import requirePrivateModifier, { RULE_NAME as requirePrivateModifierRuleName } from './rules/require-private-modifier';


export default {
    configs: {
        recommended
    },
    rules: {
        [requirePrivateModifierRuleName]: requirePrivateModifier,
        [requirePrivateUnderscoreRuleName]: requirePrivateUnderscore,
        [invalidRelativeImportPrefixRuleName]: invalidRelativeImportPrefix
    }
}