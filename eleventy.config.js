import { EleventyI18nPlugin } from "@11ty/eleventy";
import memoize from "memoize";
import path from "node:path";
import { processCSS, processCSSFile } from "./utils/process-css.js";

/**
 * @param {string} inputPath
 *
 * @returns {Promise<string>}
 */
async function _createFileHash(inputPath) {
  try {
    /** @type {Awaited<ReturnType<typeof _processCSS>>} */
    let result = undefined;
    if (inputPath.endsWith(".css")) {
      result = await processCSSFile(inputPath);
    } else {
      throw new Error("invalid file type passed to the hashing function");
    }
    return result.hash;
  } catch (err) {
    console.error(err);
  }
}

/** @type {typeof _createFileHash} */
const createFileHash = memoize(_createFileHash);

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
