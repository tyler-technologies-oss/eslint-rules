import tsLint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules", 
      "**/dist", 
      "**/reference", 
      "**/typings",
      "**/coverage"
    ]
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { 
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.browser
      }
    }
  },
  ...tsLint.configs.recommended,
  { rules: { "@typescript-eslint/no-explicit-any": "off" } }
];