import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import recommended from './configs/recommended';
import templateRecommended from './configs/template-recommended';

const plugin: {
  configs: {
    recommended: FlatConfig.ConfigArray;
    templateRecommended: FlatConfig.ConfigArray;
  };
} = {
  configs: {
    recommended,
    templateRecommended,
  },
};

export default plugin;

export { recommended, templateRecommended };
