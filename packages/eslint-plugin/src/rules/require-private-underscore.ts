import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/experimental-utils';

type Options = string[];
type MessageIds = 'requirePrivateUnderscore';
export const RULE_NAME = 'require-private-underscore';

export default createRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            category: 'Best Practices',
            description: 'Requires properties or methods that start with an underscore to be marked with a private modifier.',
            recommended: 'warn'
        },
        schema: {},
        messages: { requirePrivateUnderscore: 'Private ${type} must start with an underscore: ${nodeInfo}' },
        fixable: 'code'
    },
    defaultOptions: [],
    create: function (context) {
        function checkNode(node: TSESTree.ClassProperty | TSESTree.MethodDefinition) {
            const isPrivate = node.accessibility === 'private' || node.accessibility === 'protected';
            if (!isPrivate && (node.key as TSESTree.Identifier).name.startsWith('_')) {
                context.report({
                    messageId: 'requirePrivateUnderscore',
                    node: node,
                    fix: function (fixer) {
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
