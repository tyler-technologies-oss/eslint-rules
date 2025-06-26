import rules from './rules';
import createRecommendedConfig from './configs/recommended';
import createStrictConfig from './configs/strict';
import createTypeScriptRecommendedConfig from './configs/ts-recommended';
import createTypeScriptStylisticConfig from './configs/ts-stylisitic';
import createTypeScriptStrictConfig from './configs/ts-strict';
import { TSESLint } from '@typescript-eslint/utils';
import { name, version } from '../package.json';

// Base plugin with our custom rules
const plugin: TSESLint.FlatConfig.Plugin = {
  meta: { name, version },
  rules,
};

// Create the configs
const recommended = createRecommendedConfig(plugin);
const strict = createStrictConfig(plugin);
const tsRecommended = createTypeScriptRecommendedConfig(plugin);
const tsStylistic = createTypeScriptStylisticConfig(plugin);
const tsStrict = createTypeScriptStrictConfig(plugin);
const configs = {
  recommended,
  strict,
  tsRecommended,
  tsStylistic,
  tsStrict,
} satisfies Record<
  string,
  TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray
>;

// The plugin including the configs is the default export
export default {
  ...plugin,
  configs,
} satisfies TSESLint.FlatConfig.Plugin;

// For convenience, export each config as a named export
export { recommended, strict, tsRecommended, tsStylistic, tsStrict };
