// ESLint v9 compatible index file
import { rules } from './rules/index';

// @ts-ignore - Import JS file in TypeScript
import recommended from './configs/recommended.js';

// Export all components for ESLint v9 compatibility
export { rules, recommended };
