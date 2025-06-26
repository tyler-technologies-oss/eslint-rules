import { createRule } from '../utils/create-rule';
import { AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/utils';

type Options = string[];
type MessageIds = 'requirePrivateUnderscore';

const ALLOWED_MEMBERS = ['constructor'];
export const RULE_NAME = 'require-private-underscore';

export default createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Requires private properties or methods to start with an underscore.',
    },
    schema: [],
    messages: {
      requirePrivateUnderscore: "'{{nodeInfo}}' must start with an underscore",
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: function (context) {
    const sourceCode = context.sourceCode;

    function checkNode(
      node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition,
    ) {
      const isPrivate =
        node.accessibility === 'private' || node.accessibility === 'protected';
      const propertyName = (node.key as TSESTree.Identifier).name;

      if (
        !isPrivate &&
        (node.key as TSESTree.Identifier).name.startsWith('_') &&
        !ALLOWED_MEMBERS.includes(propertyName)
      ) {
        context.report({
          data: { type: node.type, nodeInfo: `_${propertyName}` },
          messageId: 'requirePrivateUnderscore',
          node: node,
          fix: function (fixer) {
            const tokens = sourceCode.getTokens(node);
            const publicToken = tokens.find(
              t => t.type === AST_TOKEN_TYPES.Keyword && t.value === 'public',
            );
            if (publicToken) {
              return fixer.replaceText(publicToken, 'private');
            }
            return fixer.insertTextBefore(node, 'private ');
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
