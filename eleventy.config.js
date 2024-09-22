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
    /** @param {string} value */ function (value) {
      console.log("This is the filter:", this.page.lang);
      console.log("Translating a path:", paths[this.page.lang][value]);
      return `${paths[this.page.lang][value]}`;
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
