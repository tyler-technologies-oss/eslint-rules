// import { Rule } from 'eslint';
// import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils/create-rule';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

type Options = string[];

type MessageIds = 'invalid';

export default createRule<Options, MessageIds>({
    name: 'invalid-relative-import-prefix',
    meta: {
        type: 'suggestion',
        docs: {
            category: 'Best Practices',
            description: 'Avoids inconsistent import paths.',
            recommended: 'error'
        },
        schema: {},
        messages: { invalid: 'Relative import statements cannot start with "./../' }
    },
    create: function (context) {
        function reportIfInvalidRelativeImport(node: any) {
            const importSource = node.source.value as string;
            const invalidRelativeImportStart = importSource.substr(0, 5);

            if (typeof invalidRelativeImportStart === 'string' && invalidRelativeImportStart === './../') {
                context.report({ messageId: 'invalid', node: node });
            }
        }

        return {
            ImportDeclaration(node) {
                reportIfInvalidRelativeImport(node);
            }
        }
    },
    defaultOptions: []
})

// export default {
//     meta: {
//         type: 'suggestion',
//         docs: {
//             url: '',
//         }
//     },
//     create: function (context) {
//         function reportIfAbsolute(node: any) {
//             const importSource = node.source.value as string;
//             const invalidRelativeImportStart = importSource.substr(0, 5);
//             console.log(invalidRelativeImportStart);

//             if (typeof invalidRelativeImportStart === 'string' && invalidRelativeImportStart === './../') {
//                 context.report({ message: 'wtf', node: node });
//             }
//         }

//         return {
//             ImportDeclaration(node) {
//                 reportIfAbsolute(node);
//             }
//         }
//     }
// } as Rule.RuleModule;
