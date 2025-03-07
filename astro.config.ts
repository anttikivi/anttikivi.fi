import tailwindcss from "@tailwindcss/vite";
import type { Locales } from "astro";
import { defineConfig } from "astro/config";
import locales, { defaultLocale } from "./src/locales";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: locales as unknown as Locales,
    defaultLocale: defaultLocale as never,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
