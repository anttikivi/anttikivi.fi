import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import type { Locales } from "astro";
import { defineConfig } from "astro/config";
import browserslist from "browserslist";
import type { Element, Root, RootContent } from "hast";
import { browserslistToTargets, Features } from "lightningcss";
import rehypeAttr from "rehype-attr";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRaw from "rehype-raw";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeRewrite from "rehype-rewrite";
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
  compressHTML: import.meta.env.PROD,

  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        include: Features.Colors | Features.Nesting,
        targets: browserslistToTargets(browserslist(">= 0.005% and not dead")),
      },
    },
    plugins: [tailwindcss()],
  },

  build: {
    format: "directory",
    assets: "_static",
  },

  markdown: {
    rehypePlugins: [
      [
        rehypeAttr,
        {
          properties: "attr",
        },
      ],
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          test(element: Element) {
            if ("data-skip" in element.properties) {
              return false;
            }

            return true;
          },
        },
      ],
      [
        rehypeRewrite,
        {
          rewrite(node: Root | RootContent) {
            if (node.type === "element" && "data-skip" in node.properties) {
              delete node.properties["data-skip"];
            }
          },
        },
      ],
      rehypeRaw,
      ...(import.meta.env.PROD
        ? [rehypeRemoveComments, rehypeMinifyWhitespace]
        : []),
    ],
  },

  i18n: {
    locales: locales as unknown as Locales,
    defaultLocale: defaultLocale as never,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  experimental: {
    svg: {
      mode: "inline",
    },
  },

  integrations: [sitemap()],
});
