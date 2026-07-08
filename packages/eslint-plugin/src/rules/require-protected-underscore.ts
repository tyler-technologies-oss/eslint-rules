import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/utils';

type Options = string[];
type MessageIds = 'requireProtectedUnderscore';

const ALLOWED_MEMBERS = ['constructor'];
export const RULE_NAME = 'require-protected-underscore';

export default createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Requires protected properties or methods to start with an underscore.',
    },
    schema: [],
    messages: {
      requireProtectedUnderscore:
        "Protected member '{{nodeInfo}}' must start with an underscore",
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: function (context) {
    function checkNode(
      node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition,
    ) {
      const isProtected = node.accessibility === 'protected';
      const propertyName = (node.key as TSESTree.Identifier).name;

      if (
        isProtected &&
        !propertyName.startsWith('_') &&
        !ALLOWED_MEMBERS.includes(propertyName)
      ) {
        context.report({
          data: { type: node.type, nodeInfo: propertyName },
          messageId: 'requireProtectedUnderscore',
          node: node,
          fix: function (fixer) {
            return fixer.replaceText(node.key, `_${propertyName}`);
          },
        });
      }
    }

    return {
      PropertyDefinition(node) {
        checkNode(node);
      },
      MethodDefinition(node) {
        checkNode(node);
      },
    };
  },
});
