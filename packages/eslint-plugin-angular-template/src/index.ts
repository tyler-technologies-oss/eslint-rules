// @ts-expect-error - Import JS file in TypeScript
import recommended from './configs/recommended.js';

const plugin = {
	configs: { recommended },
	rules: {},
	processors: {},
};

export default plugin;