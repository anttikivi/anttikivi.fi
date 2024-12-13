import { EleventyI18nPlugin } from "@11ty/eleventy";
import path from "node:path";
import paths from "./src/_data/paths.js";
import { processCSS } from "./utils/css.js";
import { createFileHash } from "./utils/hash.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });

  eleventyConfig.addFilter(
    "hash",
    /** @param {string} filename */ async function (filename) {
      if (process.env.NODE_ENV === "development") {
        return filename;
      }
      const inputFile = path.join("src", filename);
      const hash = await createFileHash(inputFile);
      if (filename.endsWith(".css")) {
        if (process.env.NODE_ENV === "production") {
          return `/${hash}.css`;
        }
        return `${filename.substring(0, filename.lastIndexOf("."))}.${hash}.css`;
      } else {
        return filename;
      }
    },
  );
  eleventyConfig.addFilter(
    "makePath",
    /** @type {(value: string, lang: string) => void} */ function (
      value,
      lang,
    ) {
      return `${paths[lang][value]}index.html`;
    },
  );
  eleventyConfig.addFilter(
    "tUrl",
    /** @type {(value: string, lang?: string) => void} */ function (
      value,
      lang,
    ) {
      if (lang === this.page.lang) {
        return value;
      }
      const locale = lang ? lang : this.page.lang;
      if (value in paths[locale]) {
        return `${paths[locale][value]}`;
      }
      throw new ReferenceError(
        `Trying to translate the path ${value} to the locale ${locale} but no valid translation was found.`,
      );
    },
  );

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents) {
      return async function () {
        return (await processCSS(contents)).code;
      };
    },
    compileOptions: {
      permalink: async function (_, inputPath) {
        const filename = inputPath.substring(
          inputPath.lastIndexOf("/") + 1,
          inputPath.lastIndexOf("."),
        );
        if (process.env.NODE_ENV === "development") {
          return `${filename}.css`;
        }
        const hash = await createFileHash(inputPath);
        if (process.env.NODE_ENV === "production") {
          return `${hash}.css`;
        }
        return `${filename}.${hash}.css`;
      },
    },
  });
}

export const config = {
  dir: {
    input: "src",
  },
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
