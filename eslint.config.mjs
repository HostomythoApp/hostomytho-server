import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import jest from "eslint-plugin-jest";

export default defineConfig([
  globalIgnores(["**/coverage/*", "**/hostomythoenv/*"]),
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["tests/**/*.test.{js,mjs,cjs}"],
    plugins: { jest },
    extends: ["jest/recommended"],
    languageOptions: { globals: globals.jest },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);
