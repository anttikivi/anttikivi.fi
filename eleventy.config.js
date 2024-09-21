import { EleventyI18nPlugin } from "@11ty/eleventy";
import autoprefixer from "autoprefixer";
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

  eleventyConfig.addWatchTarget("./tailwind.config.js");

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents, inputPath) {
      return async function () {
        return (
          await postcss([tailwindcss, autoprefixer]).process(contents, {
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
