import { createRule } from '../utils/create-rule';
import { AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';

type Options = string[];
type MessageIds = 'requirePrivateUnderscore';
export const RULE_NAME = 'require-private-underscore';

export default createRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Requires properties or methods that start with an underscore to be marked with a private modifier.',
            recommended: 'warn'
        },
        schema: {},
        messages: { requirePrivateUnderscore: 'Private ${type} must start with an underscore: ${nodeInfo}' },
        fixable: 'code'
    },
    defaultOptions: [],
    create: function (context) {
        const sourceCode = context.getSourceCode();

        function checkNode(node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition) {
            const isPrivate = node.accessibility === 'private' || node.accessibility === 'protected';
            const propertyName = (node.key as TSESTree.Identifier).name;

            if (!isPrivate && (node.key as TSESTree.Identifier).name.startsWith('_')) {
                context.report({
                    data: { type: node.type, nodeInfo: `_${propertyName}` },
                    messageId: 'requirePrivateUnderscore',
                    node: node,
                    fix: function (fixer) {
                        const tokens = sourceCode.getTokens(node);
                        const publicToken = tokens.find(t => t.type === AST_TOKEN_TYPES.Keyword && t.value === 'public');
                        if (publicToken) {
                            return fixer.replaceText(publicToken, 'private');
                        }
                        
                        return fixer.insertTextBefore(node, 'private ');
                    }
                });
            }
        }

        return {
            ClassProperty(node) {
                checkNode(node);
            },
            MethodDefinition(node) {
                checkNode(node);
            }
        }
    }
});
