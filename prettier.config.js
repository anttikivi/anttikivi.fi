/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-packagejson",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  tailwindStylesheet: "./src/styles/global.css",
  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro",
      },
    },
    {
      files: ["*.md"],
      options: {
        proseWrap: "always",
      },
    },
  ],
};

export default config;
