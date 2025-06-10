import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/tyler-technologies/eslint-rules/packages/eslint-plugin'
);
