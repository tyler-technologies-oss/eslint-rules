import { createRule } from '../utils/create-rule';
import { AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/utils';

type Options = string[];
type MessageIds = 'requireProtectedModifier';

const ALLOWED_MEMBERS = ['constructor'];
export const RULE_NAME = 'require-protected-modifier';

export default createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Requires properties or methods that start with an underscore to be marked with a protected or private modifier.',
    },
    schema: [],
    messages: {
      requireProtectedModifier:
        "'{{nodeInfo}}' must be marked as private or protected if it starts with an underscore",
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: function (context) {
    const sourceCode = context.sourceCode;

    function checkNode(
      node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition,
    ) {
      const hasAccessModifier =
        node.accessibility === 'private' || node.accessibility === 'protected';
      const propertyName = (node.key as TSESTree.Identifier).name;

      if (
        !hasAccessModifier &&
        propertyName.startsWith('_') &&
        !ALLOWED_MEMBERS.includes(propertyName)
      ) {
        context.report({
          data: { type: node.type, nodeInfo: propertyName },
          messageId: 'requireProtectedModifier',
          node: node,
          fix: function (fixer) {
            const tokens = sourceCode.getTokens(node);
            const publicToken = tokens.find(
              t => t.type === AST_TOKEN_TYPES.Keyword && t.value === 'public',
            );
            if (publicToken) {
              return fixer.replaceText(publicToken, 'protected');
            }
            return fixer.insertTextBefore(node, 'protected ');
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
