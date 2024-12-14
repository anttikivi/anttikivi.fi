import { EleventyI18nPlugin, type UserConfig } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import path from "node:path";
import paths from "./src/_data/paths.js";
import { processCSS } from "./utils/css.js";
import { createFileHash } from "./utils/hash.js";

export default function (eleventyConfig: UserConfig) {
  /*
   * Filters
   */
  eleventyConfig.addFilter("hash", async function (filename: string) {
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
  });
  eleventyConfig.addFilter("makePath", function (value: string, lang: string) {
    return `${paths[lang][value]}index.html`;
  });
  eleventyConfig.addFilter("tURL", function (value: string, lang?: string) {
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
  });

  /*
   * Plugins
   */
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  /**
   * Pass-through copies
   */
  eleventyConfig.addPassthroughCopy({ "src/assets": "/" });

  /*
   * Template Formats
   */
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents: string) {
      return async function () {
        return (await processCSS(contents)).code;
      };
    },
    compileOptions: {
      permalink: async function (_: unknown, inputPath: string) {
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
