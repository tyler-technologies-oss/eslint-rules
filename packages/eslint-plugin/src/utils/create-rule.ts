import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  ruleName =>
    `https://github.com/tyler-technologies-oss/eslint-rules/tree/main/packages/eslint-plugin/docs/rules/${ruleName}.md`,
);
