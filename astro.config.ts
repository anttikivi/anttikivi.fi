import tailwindcss from "@tailwindcss/vite";
import type { Locales } from "astro";
import { defineConfig } from "astro/config";
import locales, { defaultLocale } from "./src/locales";

function getSiteURL() {
  // https://docs.astro.build/en/guides/environment-variables/
  if (import.meta.env.PROD) {
    return "https://www.anttikivi.fi";
  }

  return "http://localhost:4321";
}

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  trailingSlash: "always",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "directory",
    assets: "_static",
  },
  i18n: {
    locales: locales as unknown as Locales,
    defaultLocale: defaultLocale as never,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
