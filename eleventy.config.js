import { EleventyI18nPlugin } from "@11ty/eleventy";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import htmlmin from "html-minifier-terser";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import siteConfig from "./src/_data/config.js";
import paths from "./src/_data/paths.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  console.log("The NODE_ENV is set to", process.env.NODE_ENV);

  for (const locale of siteConfig.disabledLocales) {
    eleventyConfig.ignores.add(`src/${locale}/**/*`);
  }

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });

  eleventyConfig.addFilter(
    "tUrl",
    /** @param {string} value, @param {string?} lang */ function (value, lang) {
      console.log(
        "The translation was called with the value",
        value,
        "and language",
        lang,
      );
      if (lang === this.page.lang) {
        return value;
      }
      const locale = lang ? lang : this.page.lang;
      console.log("The language was set to", locale);
      if (value in paths[locale]) {
        return `${paths[locale][value]}`;
      }
      throw new ReferenceError(
        `Trying to translate the path ${value} to the locale ${locale} but no valid translation was found.`,
      );
    },
  );
  eleventyConfig.addFilter(
    "makePath",
    /** @param {string} value, @param {string} lang  */ function (value, lang) {
      return `${paths[lang][value]}index.html`;
    },
  );

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (
      process.env.NODE_ENV === "production" &&
      (this.page.outputPath || "").endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "/" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addWatchTarget("./tailwind.config.js");

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents, inputPath) {
      return async function () {
        return (
          await postcss([
            tailwindcss,
            autoprefixer,
            ...(process.env.NODE_ENV === "production" ? [cssnano] : []),
          ]).process(contents, {
            from: inputPath,
          })
        ).css;
      };
    },
    compileOptions: {
      permalink: function (_, inputPath) {
        return inputPath.substring(inputPath.lastIndexOf("/") + 1);
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
