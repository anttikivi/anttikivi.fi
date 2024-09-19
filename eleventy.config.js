import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: (inputContent) => {
      return async () =>
        (await postcss([tailwindcss, autoprefixer]).process(inputContent)).css;
    },
  });

  return {
    dir: {
      input: "src",
    },
  };
}
