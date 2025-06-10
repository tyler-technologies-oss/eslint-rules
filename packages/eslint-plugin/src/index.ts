import customRules from './rules';
import recommended from './configs/recommended';

const plugin = {
  meta: {
    name: '@tylertech-eslint/eslint-plugin',
    version: '2.0.0'
  },
  rules: customRules.rules,
  configs: {
    recommended
  }
};

export default plugin;
