import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/experimental-utils';

type Options = string[];
type MessageIds = 'invalidRelativeImportPrefix';
export const RULE_NAME = 'invalid-relative-import-prefix'
    ;
export default createRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Avoids inconsistent import paths.',
            recommended: 'warn'
        },
        schema: {},
        messages: { invalidRelativeImportPrefix: 'Relative import statements cannot start with "./../' },
        fixable: 'code'
    },
    defaultOptions: [],
    create: function (context) {
        function reportIfInvalidRelativeImport(node: TSESTree.ImportDeclaration & TSESTree.Node) {
            const importSource = (node.source.value as string).trim();
            
            const invalidRelativeImportStart = importSource.substr(0, 5);
            if (typeof invalidRelativeImportStart === 'string' && invalidRelativeImportStart === './../') {
                context.report({
                    messageId: 'invalidRelativeImportPrefix',
                    node: node.source,
                    fix: function (fixer) {
                        return fixer.replaceTextRange([node.source.range[0], node.source.range[0] + 3], `${node.source.raw[0]}../`)
                    }
                });
            }
        }

        return {
            ImportDeclaration(node) {
                reportIfInvalidRelativeImport(node);
            }
        }
    }
});
