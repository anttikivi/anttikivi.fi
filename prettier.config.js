/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
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
