import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  () => 'https://github.com/tyler-technologies-oss/eslint-rules/tree/main/packages/eslint-plugin/src/rules'
);
