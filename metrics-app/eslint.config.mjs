import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {files: ["**/*.{js}"]},
  {settings: { react: { version: "detect" } }},
  {languageOptions: { ...pluginReactConfig.languageOptions, globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier
];