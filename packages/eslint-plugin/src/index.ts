import rules from './rules';
import createBaseConfig from './configs/base';
import createRecommendedConfig from './configs/recommended';
import createStrictConfig from './configs/strict';
import createTestRecommendedConfig from './configs/test';
import createTypeScriptRecommendedConfig from './configs/typescript';
import { TSESLint } from '@typescript-eslint/utils';
import { name, version } from '../package.json';

const plugin = {
  meta: { name, version },
  rules,
} satisfies TSESLint.FlatConfig.Plugin;

const base = createBaseConfig();
const recommended = createRecommendedConfig(plugin);
const strict = createStrictConfig(plugin);
const tsRecommended = createTypeScriptRecommendedConfig(plugin);
const testRecommended = createTestRecommendedConfig(plugin);
const configs = {
  base,
  recommended,
  strict,
  testRecommended,
} satisfies Record<string, TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray>;

export default {
  ...plugin,
  configs,
} satisfies TSESLint.FlatConfig.Plugin;

export { base, recommended, strict, tsRecommended, testRecommended };
