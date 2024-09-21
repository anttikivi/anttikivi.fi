import { EleventyI18nPlugin } from "@11ty/eleventy";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import htmlmin from "html-minifier-terser";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

/** @param {string} path */
function basename(path) {
  return path.substring(path.lastIndexOf("/") + 1);
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  console.log("The NODE_ENV is set to", process.env.NODE_ENV);

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });

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
        return basename(inputPath);
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
