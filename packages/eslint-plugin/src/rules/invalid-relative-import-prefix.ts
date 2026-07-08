import { createRule } from '../utils/create-rule';
import { TSESTree } from '@typescript-eslint/utils';

type Options = string[];
type MessageIds = 'invalidRelativeImportPrefix';
export const RULE_NAME = 'invalid-relative-import-prefix';

export default createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Avoids inconsistent import paths.',
    },
    schema: [],
    messages: {
      invalidRelativeImportPrefix:
        'Relative import statements cannot start with "./../',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: function (context) {
    function reportIfInvalidRelativeImport(
      node: TSESTree.ImportDeclaration & TSESTree.Node,
    ) {
      const importSource = (node.source.value as string).trim();
      const invalidRelativeImportStart = importSource.substring(0, 5);
      if (
        typeof invalidRelativeImportStart === 'string' &&
        invalidRelativeImportStart === './../'
      ) {
        context.report({
          messageId: 'invalidRelativeImportPrefix',
          node: node.source,
          fix: function (fixer) {
            // Strip the redundant leading `./`; `./../x` is equivalent to `../x`.
            // (The two characters removed are the `.` and `/` immediately after
            // the opening quote at `range[0]`.)
            return fixer.removeRange([
              node.source.range[0] + 1,
              node.source.range[0] + 3,
            ]);
          },
        });
      }
    }

    return {
      ImportDeclaration(node) {
        reportIfInvalidRelativeImport(node);
      },
    };
  },
});
