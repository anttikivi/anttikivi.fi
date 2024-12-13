import { EleventyI18nPlugin } from "@11ty/eleventy";
import memoize from "memoize";
import crypto from "node:crypto";
import path from "node:path";
import compileTailwind from "./utils/compile-tailwind/index.js";

/**
 * @typedef {object} ProcessInput
 * @property {string} path
 * @property {string} contents
 */

/**
 * @typedef {object} ProcessResult
 * @property {string} text
 * @property {string} hash
 */

/**
 * @callback ProcessFunction
 * @param {string} inputPath
 *
 * @returns {Promise<ProcessResult>}
 */

/**
 * @type {ProcessFunction}
 */
async function processCSS(inputPath) {
  const code = await compileTailwind(
    inputPath,
    path.resolve(process.cwd(), "src"),
    undefined,
  );
  const hash = crypto.createHash("sha256").update(code).digest("hex");

  return { text: code, hash };
}

/**
 * @param {string} inputPath
 */
async function createFileHash(inputPath) {
  try {
    // const contents = fs.readFileSync(inputPath, "utf-8");
    /** @type {ProcessResult} */
    let processed = undefined;
    if (inputPath.endsWith(".css")) {
      processed = await processCSS(inputPath);
    } else {
      throw new Error("invalid file type passed to the hashing function");
    }
    return processed.hash;
  } catch (err) {
    console.error(err);
  }
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });

  eleventyConfig.addFilter(
    "hash",
    /** @param {string} filename */ memoize(async function (filename) {
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
      } else if (filename.endsWith(".js")) {
        if (process.env.NODE_ENV === "production") {
          return `/${hash}.js`;
        }
        return `${filename.substring(0, filename.lastIndexOf("."))}.${hash}.js`;
      } else {
        return filename;
      }
    }),
  );

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents, inputPath) {
      return async function () {
        return (await processCSS(inputPath)).text;
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
