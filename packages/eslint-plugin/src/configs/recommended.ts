import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import globalIgnores from './ignores';
import tsRecommended from './typescript';

export default (plugin: FlatConfig.Plugin): FlatConfig.ConfigArray => [globalIgnores, ...tsRecommended(plugin)];
