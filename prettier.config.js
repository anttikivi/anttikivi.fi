/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "./src/app/globals.css",
  overrides: [
    {
      files: ["*.md"],
      options: {
        proseWrap: "always",
      },
    },
  ],
};

export default config;
