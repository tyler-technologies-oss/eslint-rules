import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/utils';

type Options = string[];
type MessageIds = 'requirePrivateModifier';
export const RULE_NAME = 'require-private-modifier';

export default createRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Requires properties or methods that start with an underscore to be marked with a private modifier.',
            recommended: 'recommended'
        },
        schema: [],
        messages: { requirePrivateModifier: '{{type}} starting with an underscore must be marked as private: {{nodeInfo}}' },
        fixable: 'code'
    },
    defaultOptions: [],
    create: function (context) {
        function checkNode(node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition) {
            const isPrivate = node.accessibility === 'private' || node.accessibility === 'protected';
            const propertyName = (node.key as TSESTree.Identifier).name;

            if (isPrivate && !propertyName.startsWith('_')) {
                context.report({
                    data: { type: node.type, nodeInfo: `_${propertyName}` },
                    messageId: 'requirePrivateModifier',
                    node: node,
                    fix: function (fixer) {
                        return fixer.insertTextBefore(node.key, '_');
                    }
                });
            }
        }

        return {
            PropertyDefinition(node) {
                checkNode(node);
            },
            MethodDefinition(node) {
                checkNode(node);
            }
        }
    }
});
