import EleventyI18nPlugin from "@11ty/eleventy";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: (inputContent) => async () =>
      (await postcss([tailwindcss, autoprefixer]).process(inputContent)).css,
  });

  return {
    dir: {
      input: "src",
    },
  };
}
