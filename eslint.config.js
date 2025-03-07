import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [".astro/"],
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
];
